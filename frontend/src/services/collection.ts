import { Collection } from '@models/interfaces';
import api from '@redux/api';

type ChangeCollectionField = {
  id: string;
  body: {
    field: string;
    value: string;
  };
};

const collectionApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCollection: build.mutation<void, Omit<Collection, 'id'>>({
      query: (body) => ({
        url: `collection`,
        method: 'POST',
        body,
      }),
    }),
    updateCollection: build.mutation<void, ChangeCollectionField>({
      query: ({ id, body }) => ({
        url: `collection/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteCollection: build.mutation<void, string>({
      query: (id) => ({
        url: `collection/${id}`,
        method: 'DELETE',
      }),
    }),
    getCollections: build.query<Collection[], void>({
      query: () => ({
        url: `collection`,
      }),
    }),
    getCollection: build.query<Collection, void>({
      query: (id) => ({
        url: `collection/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useGetCollectionsQuery,
} = collectionApi;
