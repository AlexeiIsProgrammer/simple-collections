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
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionTableItemProps from './types';

function CollectionTableItem({ item }: CollectionTableItemProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { userId } = useParams();
  const { id, name, collection_id, customFields } = item;

  const navigate = useNavigate();

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const stringRef = useRef<HTMLInputElement | null>(null);

  const dateField = useMemo(
    () => customFields.find((field) => field.type === COLLECTION_TYPE.DATE),
    [customFields]
  );

  const stringField = useMemo(
    () => customFields.find((field) => field.type === COLLECTION_TYPE.STRING),
    [customFields]
  );

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

        toast({
          title: t('collectionTableItem.change', { name }),
          status: 'success',
          position: 'top',
        });
      }

      const actions = [];

      if (
        dateRef.current &&
        dateField &&
        dateRef.current.value !== '' &&
        dateField.value !== dateRef.current.value
      ) {
        actions.push({ value: dateRef.current.value, fieldId: dateField.id });
      }

      if (
        stringRef.current &&
        stringField &&
        stringRef.current.value !== '' &&
        stringField.value !== stringRef.current.value
      ) {
        actions.push({
          value: stringRef.current.value,
          fieldId: stringField.id,
        });
      }

      if (actions.length > 0)
        await updateCustomField({
          id,
          body: actions,
        }).unwrap();

      onToggle();
    } catch {
      toast({
        title: t('collectionTableItem.errorChange'),
        status: 'error',
        position: 'top',
      });
    }
  };

  return (
    <Tr pos="relative">
      <Td textAlign="center">{id}</Td>
      <Td w={300} textAlign="center">
        {isOpen ? <Input defaultValue={name} ref={inputRef} /> : name}
      </Td>
      {dateField && (
        <Td w={300} textAlign="center">
          {isOpen ? (
            <Input type="date" defaultValue={dateField.value} ref={dateRef} />
          ) : (
            dateField.value
          )}
        </Td>
      )}
      {stringField && (
        <Td w={300} textAlign="center">
          {isOpen ? (
            <Input
              type="text"
              defaultValue={stringField.value}
              ref={stringRef}
            />
          ) : (
            stringField.value
          )}
        </Td>
      )}
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
    </Tr>
  );
}

export default CollectionTableItem;
