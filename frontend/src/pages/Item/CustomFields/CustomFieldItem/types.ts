import { CollectionItemCustomField } from '@models/interfaces';

type CustomFieldItemProps = {
  updateCustomFieldHandle: (fieldId: number, value: string) => void;
  item: CollectionItemCustomField;
};

export default CustomFieldItemProps;
