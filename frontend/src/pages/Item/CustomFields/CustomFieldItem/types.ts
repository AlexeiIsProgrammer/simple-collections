import { CollectionItemCustomField } from '@models/interfaces';

type CustomFieldItemProps = {
  updateCustomFieldHandle: (fieldId: string, value: string) => void;
  item: CollectionItemCustomField;
};

export default CustomFieldItemProps;
