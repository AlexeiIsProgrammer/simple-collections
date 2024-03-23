import { CustomField } from '@models/interfaces';

type ItemsTableProps = {
  customFields: Omit<CustomField, 'collection_id'>[];
};

export default ItemsTableProps;
