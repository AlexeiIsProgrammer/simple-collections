import { CollectionItemCustomField } from '@models/interfaces';

type CustomFieldsProps = {
  itemId: number;
  customFields: CollectionItemCustomField[];
  canEdit: boolean;
};

export default CustomFieldsProps;
