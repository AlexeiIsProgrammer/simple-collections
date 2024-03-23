import { UseDisclosureReturn } from '@chakra-ui/react';

type CreateCollectionModalProps = {
  disclosure: UseDisclosureReturn;
};

export interface ModalFormData {
  name: string;
  description: string;
  file: FileList;
  category: string;
}

export default CreateCollectionModalProps;
