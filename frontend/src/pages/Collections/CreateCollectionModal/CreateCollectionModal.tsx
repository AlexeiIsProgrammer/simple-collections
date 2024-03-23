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
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import CustomFieldsPicker from '@components/CustomFieldsPicker';
import { CustomFieldModal } from '@components/CustomFieldsPicker/types';
import MarkdownTextarea from '@components/MarkdownTextarea';
import toBase64File from '@utils/toBase64File';
import { DEFAULT_IMAGE } from '@constants/index';
import CreateCollectionModalProps, { ModalFormData } from './types';

function CreateCollectionModal({
  disclosure: { isOpen, onClose },
}: CreateCollectionModalProps) {
  const [preview, setPreview] = useState('');
  const [customFields, setCustomFields] = useState<CustomFieldModal[]>([]);
  const toast = useToast();
  const categories = useMemo(
    () => [
      'Books',
      'Magazines',
      'Games',
      'Money',
      'Cars',
      'Animals',
      'Signs',
      'Silverware',
    ],
    []
  );

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
        user_id: userId || '',
        description,
        category,
        image_url: base64File,
        customFields,
      }).unwrap();

      toast({
        title: 'Successfully created!',
        status: 'success',
        position: 'top',
      });

      onClose();
    } catch {
      toast({
        title: 'Collection creating failed',
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
          <ModalHeader>Create new collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Collection name"
                {...register('name', { required: true })}
              />
              <FormErrorMessage>
                {errors.name?.message || 'Name is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <MarkdownTextarea
                isEdit
                placeholder="Description"
                {...register('description', { required: true })}
              />

              <FormErrorMessage>
                {errors.description?.message || 'Description is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <ImageUploader
                preview={preview}
                setPreview={setPreview}
                {...register('file')}
              />

              <FormErrorMessage>
                {errors.file?.message || 'Image is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Category"
                {...register('category', { required: true })}
              >
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.category?.message || 'Category is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Custom fields</FormLabel>
              <CustomFieldsPicker
                customFields={customFields}
                setCustomFields={setCustomFields}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateCollectionModal;
