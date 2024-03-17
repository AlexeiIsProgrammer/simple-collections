import { UseDisclosureReturn } from '@chakra-ui/react';

type CreateCollectionModalProps = {
  disclosure: UseDisclosureReturn;
};

export interface ModalFormData {
  name: string;
  description: string;
  image_url: FileList;
  category: string;
}

export default CreateCollectionModalProps;
