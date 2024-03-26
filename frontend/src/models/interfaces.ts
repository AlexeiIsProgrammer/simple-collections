import { COLLECTION_STATE, COLLECTION_TYPE, ROLE, STATUS } from '@models/enums';

export interface User {
  id: number;
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
  id: number;
  collection_id: number;
  type: COLLECTION_TYPE;
  name: string;
  state: COLLECTION_STATE;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image_url: string;
  user_id: number;
  category: string;
  customFields: Omit<CustomField, 'collection_id'>[];
}

export type CollectionWithoutId = Omit<Collection, 'customFields' | 'id'> & {
  customFields: Omit<CustomField, 'collection_id' | 'id'>[];
};

export interface CollectionItem {
  id: number;
  collection_id: number;
  name: string;
}

export interface Comment {
  id: number;
  name: string;
  role: ROLE;
  text: string;
  item_id: number;
}

export interface Like {
  id: number;
  user_id: number;
  item_id: number;
}

export interface CollectionItemCustomField
  extends Omit<CustomField, 'collection_id'> {
  custom_field_id: number;
  value: string;
}

export interface CollectionItemWithCustomFields extends CollectionItem {
  customFields: CollectionItemCustomField[];
  likes: Like[];
}
