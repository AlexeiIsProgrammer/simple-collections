import { COLLECTION_STATE, COLLECTION_TYPE, ROLE, STATUS } from '@models/enums';

export interface User {
  id: string;
  name: string;
  email: string;
  status: STATUS;
  role: ROLE;
}

export interface Tag {
  id: string;
  name: string;
}

export interface CustomField {
  id: string;
  collection_id: string;
  type: COLLECTION_TYPE;
  name: string;
  state: COLLECTION_STATE;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image_url: string;
  user_id: string;
  category: string;
  customFields: Omit<CustomField, 'collection_id'>[];
}

export type CollectionWithoutId = Omit<Collection, 'customFields' | 'id'> & {
  customFields: Omit<CustomField, 'collection_id' | 'id'>[];
};

export interface CollectionItem {
  id: string;
  collection_id: string;
  name: string;
}

export interface CollectionItemCustomField
  extends Omit<CustomField, 'collection_id'> {
  custom_field_id: string;
  value: string;
}

export interface CollectionItemWithCustomFields extends CollectionItem {
  customFields: CollectionItemCustomField[];
}
