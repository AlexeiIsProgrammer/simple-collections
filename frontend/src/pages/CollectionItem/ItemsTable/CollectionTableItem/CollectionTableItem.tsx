import { CheckIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  Td,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LikeHeart from '@components/LikeHeart';
import { COLLECTION_TYPE } from '@models/enums';
import {
  useDeleteCollectionItemMutation,
  useUpdateCollectionItemCustomFieldMutation,
  useUpdateCollectionItemMutation,
} from '@services/collection-item';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionTableItemProps from './types';

function CollectionTableItem({ item, canEdit }: CollectionTableItemProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { userId } = useParams();
  const { id, name, collection_id, customFields } = item;
  const navigate = useNavigate();

  const [localCustomFields, setLocalCustomFields] = useState(customFields);

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [updateCollectionItem] = useUpdateCollectionItemMutation();
  const [updateCustomField] = useUpdateCollectionItemCustomFieldMutation();
  const [deleteCollectionItem] = useDeleteCollectionItemMutation();

  const deleteCollectionItemHandle = async () => {
    try {
      await deleteCollectionItem(id).unwrap();

      toast({
        title: t('collectionTableItem.delete', { name }),
        status: 'success',
        position: 'top',
      });
    } catch {
      toast({
        title: t('collectionTableItem.errorDelete'),
        status: 'error',
        position: 'top',
      });
    }
  };

  const updateItemHandle = async () => {
    if (!isOpen) {
      onToggle();

      return;
    }

    if (!id || !inputRef.current) return;

    try {
      if (inputRef.current.value !== '' && name !== inputRef.current.value) {
        await updateCollectionItem({
          id,
          body: { name: inputRef.current.value },
        }).unwrap();
      }

      const actions = localCustomFields
        .filter(
          (setLocalCustomField, ind) =>
            setLocalCustomField.value !== '' &&
            setLocalCustomField.value !== customFields[ind].value
        )
        .map((customField) => ({
          value: customField.value,
          fieldId: customField.id,
        }));

      if (actions.length === 0) {
        onToggle();
        return;
      }

      await updateCustomField({
        id,
        body: actions,
      }).unwrap();

      toast({
        title: t('collectionTableItem.change', { name }),
        status: 'success',
        position: 'top',
      });

      onToggle();
    } catch {
      toast({
        title: t('collectionTableItem.errorChange'),
        status: 'error',
        position: 'top',
      });
    }
  };

  const onChangeCustomField = useCallback(
    (e: ChangeEvent<HTMLInputElement>, localCustomFieldId: number) => {
      setLocalCustomFields(
        localCustomFields.map((localCustomField) =>
          localCustomField.id === localCustomFieldId
            ? { ...localCustomField, value: e.target.value }
            : localCustomField
        )
      );
    },
    [localCustomFields]
  );

  return (
    <Tr pos="relative">
      <Td textAlign="center">{id}</Td>
      <Td w={300} textAlign="center">
        {isOpen ? <Input defaultValue={name} ref={inputRef} /> : name}
      </Td>
      {localCustomFields.length > 0 &&
        localCustomFields.map(({ id: localCustomFieldId, type, value }) => (
          <Td key={localCustomFieldId} w={300} textAlign="center">
            {isOpen ? (
              type === COLLECTION_TYPE.DATE ? (
                <Input
                  type="date"
                  onChange={(e) => onChangeCustomField(e, localCustomFieldId)}
                  defaultValue={value}
                />
              ) : (
                <Input
                  type="text"
                  onChange={(e) => onChangeCustomField(e, localCustomFieldId)}
                  defaultValue={value}
                />
              )
            ) : (
              value
            )}
          </Td>
        ))}
      <Td textAlign="center">
        <LikeHeart likesCount={item.likes.length} />
      </Td>
      <Td textAlign="center">
        <IconButton
          onClick={() =>
            navigate(`/collections/${userId}/${collection_id}/${id}`)
          }
          aria-label="See item"
          icon={<ViewIcon />}
          title={t('collectionTableItem.name', { name })}
          colorScheme="green"
        />
      </Td>
      {canEdit && (
        <>
          <Td textAlign="center">
            <IconButton
              onClick={updateItemHandle}
              aria-label="Edit item"
              icon={isOpen ? <CheckIcon /> : <EditIcon />}
              title={t('collectionTableItem.edit', { name })}
              colorScheme={isOpen ? 'green' : 'blue'}
            />
          </Td>
          <Td textAlign="center">
            <IconButton
              onClick={deleteCollectionItemHandle}
              aria-label="Delete item"
              icon={<DeleteIcon />}
              title={t('collectionTableItem.remove', { name })}
              colorScheme="red"
            />
          </Td>
        </>
      )}
    </Tr>
  );
}

export default CollectionTableItem;
