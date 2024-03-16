import { COLLECTION_STATE, COLLECTION_TYPE, ROLE, STATUS } from '@models/enums';

export interface User {
  id: number;
  name: string;
  email: string;
  status: STATUS;
  role: ROLE;
}

export interface Tag {
  id: number;
  name: string;
}

export interface CustomField {
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

export interface CollectionItem {
  id: number;
  collection_id: number;
  name: string;
}

export interface CollectionItemCustomField
  extends Omit<CustomField, 'collection_id'> {
  custom_field_id: number;
  value: string;
}

export interface CollectionItemWithCustomFields {
  customFields: CollectionItemCustomField[];
}
