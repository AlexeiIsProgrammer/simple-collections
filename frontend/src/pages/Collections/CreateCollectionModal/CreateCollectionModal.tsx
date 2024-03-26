import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react';
import ImageUploader from '@components/ImageUploader';
import { useCreateCollectionMutation } from '@services/collection';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import CustomFieldsPicker from '@components/CustomFieldsPicker';
import { CustomFieldModal } from '@components/CustomFieldsPicker/types';
import MarkdownTextarea from '@components/MarkdownTextarea';
import { CATEGORIES, DEFAULT_IMAGE } from '@constants/index';
import toBase64File from '@utils/toBase64File';
import { useTranslation } from 'react-i18next';
import CreateCollectionModalProps, { ModalFormData } from './types';

function CreateCollectionModal({
  disclosure: { isOpen, onClose },
}: CreateCollectionModalProps) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState('');
  const [customFields, setCustomFields] = useState<CustomFieldModal[]>([]);
  const toast = useToast();

  const [createCollection] = useCreateCollectionMutation();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalFormData>({
    defaultValues: {
      name: '',
      description: '',
      category: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async ({
    name,
    description,
    category,
    file,
  }: ModalFormData) => {
    try {
      let base64File;
      if (preview) {
        base64File = preview;
      } else if (file && file[0]) {
        base64File = await toBase64File(file[0]);
      } else {
        base64File = DEFAULT_IMAGE;
      }

      await createCollection({
        name,
        user_id: Number(userId || 0),
        description,
        category,
        image_url: base64File,
        customFields,
      }).unwrap();

      toast({
        title: t('create.created'),
        status: 'success',
        position: 'top',
      });

      onClose();
    } catch {
      toast({
        title: t('create.createdFailed'),
        status: 'error',
        position: 'top',
      });
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{t('create.creating')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>{t('create.Name')}</FormLabel>
              <Input
                placeholder={t('create.Collection name')}
                {...register('name', { required: true })}
              />
              <FormErrorMessage>
                {errors.name?.message || t('create.Name is required')}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>{t('create.Description')}</FormLabel>
              <MarkdownTextarea
                isEdit
                placeholder={t('create.Description')}
                {...register('description', { required: true })}
              />

              <FormErrorMessage>
                {errors.description?.message ||
                  t('create.Description is required')}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{t('create.Image')}</FormLabel>
              <ImageUploader
                preview={preview}
                setPreview={setPreview}
                {...register('file')}
              />

              <FormErrorMessage>
                {errors.file?.message || t('create.Image is required')}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>{t('create.Category')}</FormLabel>
              <Select
                placeholder={t('create.Category')}
                {...register('category', { required: true })}
              >
                {CATEGORIES.map((category) => (
                  <option value={category} key={category}>
                    {t(`category.${category}`)}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.category?.message || t('create.Category is required')}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>{t('create.Custom fields')}</FormLabel>
              <CustomFieldsPicker
                customFields={customFields}
                setCustomFields={setCustomFields}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              {t('create.Save')}
            </Button>
            <Button onClick={onClose}>{t('create.Cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateCollectionModal;
