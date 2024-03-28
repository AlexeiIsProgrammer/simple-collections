import { SearchCollectionType } from '@services/search';

type CollectionResultProps = {
  collection: SearchCollectionType;
  onClose: () => void;
};

export default CollectionResultProps;
