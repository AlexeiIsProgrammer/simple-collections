import { Collection } from '@models/interfaces';

type CollectionListItemProps = {
  item: Collection;
  deleteCollectionHandle: (id: string) => void;
  updateCollectionHandle: (id: string, field: string, value: string) => void;
};

export default CollectionListItemProps;
