import { RepeatIcon } from '@chakra-ui/icons';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import HashIcon from '@icons/HashIcon';
import { FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LocalTagProps from './types';

function LocalTag({
  localTag,
  isEditTags,
  onBlur,
  closeTagHandler,
}: LocalTagProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/results/${localTag.id}`}>
      <Tag
        size="lg"
        variant="subtle"
        colorScheme={
          localTag.type === 'delete'
            ? 'red'
            : localTag.type === 'create'
              ? 'green'
              : localTag.type === 'update'
                ? 'blue'
                : 'cyan'
        }
      >
        <TagLeftIcon boxSize="12px" as={HashIcon} />
        <TagLabel lineHeight={1.5}>
          {isEditTags && localTag.type !== 'delete' ? (
            <Editable defaultValue={localTag.name}>
              <EditablePreview />
              <EditableInput
                w={`${localTag.name?.length || 1}ch`}
                onBlur={(e: FocusEvent<HTMLInputElement, Element>) =>
                  onBlur(e, localTag)
                }
              />
            </Editable>
          ) : (
            localTag.name
          )}
        </TagLabel>
        {isEditTags && (
          <TagCloseButton
            cursor="pointer"
            title={`${localTag.type === 'delete' ? t('tag.return') : t('item.delete')} ${localTag.name} tag`}
            as={localTag.type === 'delete' ? RepeatIcon : undefined}
            onClick={() => closeTagHandler(localTag)}
          />
        )}
      </Tag>
    </Link>
  );
}

export default LocalTag;
