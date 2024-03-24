import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCreateCollectionItemMutation } from '@services/collection-item';
import { useRef } from 'react';
import AddCollectionItemProps from './types';
import { useTranslation } from 'react-i18next';

function AddCollectionItem({ collectionId, alert }: AddCollectionItemProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  const [createCollectionItem, { isLoading }] =
    useCreateCollectionItemMutation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const createItemHandle = async () => {
    if (!isOpen || !collectionId || !inputRef.current) return;

    if (inputRef.current.value === '') {
      onToggle();
    } else {
      try {
        await createCollectionItem({
          name: inputRef.current.value,
          collection_id: collectionId,
        }).unwrap();

        onToggle();

        toast({
          title: `${inputRef.current.value} ${t('addCollectionItem.has been successfully added')}!`,
          status: 'success',
          position: 'top',
        });
      } catch {
        toast({
          title: `${t('addCollectionItem.Adding went wrong')}...`,
          status: 'error',
          position: 'top',
        });
      }
    }
  };

  return isOpen ? (
    <InputGroup ml={2} w={300} size="md">
      <Input
        ref={inputRef}
        placeholder={t('addCollectionItem.Write item name here')}
      />

      <InputRightElement w="auto">
        <IconButton
          isLoading={isLoading}
          title={t('addCollectionItem.Save changes')}
          onClick={createItemHandle}
          variant="outline"
          colorScheme="blue"
          aria-label={t('addCollectionItem.Save changes')}
          icon={<CheckIcon />}
        />
      </InputRightElement>
    </InputGroup>
  ) : (
    <>
      {alert}
      <Button onClick={onToggle} ml={2} colorScheme="blue">
        {alert
          ? `${t('addCollectionItem.Wanna add')}?`
          : t('addCollectionItem.Add new one')}
      </Button>
    </>
  );
}

export default AddCollectionItem;
