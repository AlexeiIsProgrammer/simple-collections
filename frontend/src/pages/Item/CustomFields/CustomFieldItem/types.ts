import { CollectionItemCustomField } from '@models/interfaces';

type CustomFieldItemProps = {
  updateCustomFieldHandle: (fieldId: number, value: string) => void;
  item: CollectionItemCustomField;
  readonly: boolean;
};

export default CustomFieldItemProps;
