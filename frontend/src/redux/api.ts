import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: [
    'Users',
    'Collections',
    'Tags',
    'Items',
    'CustomFields',
    'CollectionItems',
    'Comments',
  ],
  endpoints: () => ({}),
});

export default api;
