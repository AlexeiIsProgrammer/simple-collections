import { AddIcon, CheckIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import HashIcon from '@icons/HashIcon';
import {
  ActionType,
  TagActionType,
  useGetTagsByCollectionItemQuery,
  useGetTagsQuery,
  useUpdateTagsMutation,
} from '@services/tag';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './Tags.module.scss';

type ActionTypeWithPrev = ActionType & { prevType?: TagActionType };

function Tags() {
  const { t } = useTranslation();
  const [tagNewValue, setTagNewValue] = useState('');
  const [isEditTags, setIsEditTags] = useState<boolean>(false);

  const { itemId: id } = useParams();

  const [updateTags] = useUpdateTagsMutation();

  const {
    data: tags,
    isFetching,
    isError,
  } = useGetTagsByCollectionItemQuery(id || '', { skip: !id });

  const { data: allTags } = useGetTagsQuery();

  const [localTags, setLocalTags] = useState<ActionTypeWithPrev[]>([]);

  const closeTagHandler = (tag: ActionTypeWithPrev) => {
    switch (tag.type) {
      case 'delete':
        setLocalTags(
          localTags.map((localTag) =>
            localTag.id === tag.id
              ? { ...localTag, type: localTag.prevType }
              : localTag
          )
        );
        break;

      case 'update':
      case 'create':
      default:
        setLocalTags(
          localTags.map((localTag) =>
            localTag.id === tag.id
              ? { ...localTag, type: 'delete', prevType: tag.type }
              : localTag
          )
        );
        break;
    }
  };

  const saveChangesHandler = () => {
    if (!id) return;

    if (localTags.some((localTag) => localTag.type)) {
      updateTags({
        id,
        actions: localTags.map((localTag) => ({
          ...localTag,
          prev: undefined,
        })),
      });
    }
    setTagNewValue('');
    setIsEditTags(false);
  };

  const updateTagHandler = (
    e: ChangeEvent<HTMLInputElement>,
    tag: ActionTypeWithPrev
  ) =>
    setLocalTags(
      localTags.map((localTag) =>
        localTag.id === tag.id
          ? {
              ...localTag,
              name: e.target.value,
              type: localTag.type === 'create' ? 'create' : 'update',
            }
          : localTag
      )
    );

  const addTagHandler = () => {
    setLocalTags([
      ...localTags,
      {
        type: 'create',
        name: tagNewValue,
        id: Date.now().toString(), // Good client id generation kostyl :D
      },
    ]);

    setTagNewValue('');
  };

  const isValueExists = useMemo(
    () => localTags.some((localTag) => localTag.name === tagNewValue),
    [localTags, tagNewValue]
  );

  useEffect(() => {
    if (tags) setLocalTags(tags);
  }, [tags]);

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error on getting item tags
      </Alert>
    );
  }

  return (
    <HStack flexWrap="wrap" mt={2} spacing={4} alignItems="center">
      <Text>
        {t('tag.some')}{' '}
        {`${isFetching ? t('tag.someFetching') : t('tag.someHere')} →`}
      </Text>
      {!tags || isFetching ? (
        <CustomSpinner />
      ) : (
        localTags.map((tag) => (
          <Tag
            size="lg"
            key={tag.id}
            variant="subtle"
            colorScheme={
              tag.type === 'delete'
                ? 'red'
                : tag.type === 'create'
                  ? 'green'
                  : tag.type === 'update'
                    ? 'blue'
                    : 'cyan'
            }
          >
            <TagLeftIcon boxSize="12px" as={HashIcon} />
            <TagLabel lineHeight={1.5}>
              {isEditTags && tag.type !== 'delete' ? (
                <Editable defaultValue={tag.name}>
                  <EditablePreview />
                  <EditableInput
                    w={`${tag.name?.length || 1}ch`}
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                      if (
                        !localTags.some(
                          (localTag) => localTag.name === e.target.value
                        )
                      ) {
                        updateTagHandler(e, tag);
                      } else {
                        setLocalTags(
                          localTags.map((localTag) =>
                            localTag.id === tag.id
                              ? {
                                  ...localTag,
                                  name: tag.name,
                                }
                              : localTag
                          )
                        );
                      }
                    }}
                  />
                </Editable>
              ) : (
                tag.name
              )}
            </TagLabel>
            {isEditTags && (
              <TagCloseButton
                cursor="pointer"
                title={`${tag.type === 'delete' ? t('tag.return') : t('item.delete')} ${tag.name} tag`}
                as={tag.type === 'delete' ? RepeatIcon : undefined}
                onClick={() => closeTagHandler(tag)}
              />
            )}
          </Tag>
        ))
      )}
      {isEditTags ? (
        <InputGroup w={200} size="md">
          <Input
            isInvalid={isValueExists}
            className={styles.input}
            value={tagNewValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTagNewValue(e.target.value)
            }
            pr={tagNewValue.length > 0 ? '6rem' : '3rem'}
            list="tags"
            placeholder={t('tag.add')}
          />

          <datalist id="tags">
            {allTags
              ?.filter(
                (allTag) =>
                  !localTags.some((localTag) => localTag.id === allTag.id)
              )
              .map((allTag) => <option key={allTag.id} value={allTag.name} />)}
          </datalist>
          <InputRightElement w="auto">
            <HStack>
              {tagNewValue.length > 0 && (
                <IconButton
                  isDisabled={isValueExists}
                  onClick={addTagHandler}
                  title={t('tag.addTag')}
                  variant="outline"
                  colorScheme="green"
                  aria-label={t('tag.addTag')}
                  icon={<AddIcon />}
                />
              )}
              <IconButton
                title={t('tag.save')}
                onClick={saveChangesHandler}
                variant="outline"
                colorScheme="teal"
                aria-label={t('tag.save')}
                icon={<CheckIcon />}
              />
            </HStack>
          </InputRightElement>
        </InputGroup>
      ) : (
        <IconButton
          title={t('tag.edit')}
          onClick={() => setIsEditTags(true)}
          variant="outline"
          colorScheme="teal"
          aria-label={t('tag.edit')}
          icon={<EditIcon />}
        />
      )}
    </HStack>
  );
}

export default Tags;
