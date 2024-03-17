import { CustomField } from '@models/interfaces';

export type CustomFieldModal = Omit<CustomField, 'id' | 'collection_id'>;

type CustomFieldsPickerProps = {
  customFields: CustomFieldModal[];
  setCustomFields: React.Dispatch<React.SetStateAction<CustomFieldModal[]>>;
};

export default CustomFieldsPickerProps;
