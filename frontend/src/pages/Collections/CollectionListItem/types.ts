import { Collection } from '@models/interfaces';

type CollectionListItemProps = {
  item: Collection;
  deleteCollectionHandle: (id: number) => void;
  updateCollectionHandle: (id: number, field: string, value: string) => void;
};

export default CollectionListItemProps;
