export enum ROLE {
  ANON = 'anonymous',
  ADMIN = 'admin',
  USER = 'user',
}

export enum STATUS {
  BLOCKED = 'blocked',
  ACTIVE = 'active',
}

export enum COLLECTION_TYPE {
  BOOLEAN = 'boolean',
  STRING = 'string',
  NUMBER = 'number',
  TEXT = 'text',
  DATE = 'date',
}

export enum COLLECTION_STATE {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  HIDDEN = 'hidden',
}

export enum SORT_ENUM {
  'asc' = 'asc',
  'desc' = 'desc',
  'default' = '',
}
