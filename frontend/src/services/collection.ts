import { Collection, CollectionWithoutId } from '@models/interfaces';
import api from '@redux/api';

type ChangeCollectionField = {
  id: string;
  body: {
    field: string;
    value: string;
  };
};

export type BiggestCollection = {
  id: string;
  name: string;
  image_url: string;
  user_id: string;
  items_count: number;
};

const collectionApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCollection: build.mutation<void, CollectionWithoutId>({
      query: (body) => ({
        url: `collection`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Collections'],
    }),
    updateCollection: build.mutation<void, ChangeCollectionField>({
      query: ({ id, body }) => ({
        url: `collection/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Collections'],
    }),
    deleteCollection: build.mutation<void, string>({
      query: (id) => ({
        url: `collection/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collections'],
    }),
    getCollections: build.query<Collection[], void>({
      query: () => ({
        url: `collection`,
      }),
    }),
    getBiggestCollections: build.query<BiggestCollection[], void>({
      query: () => ({
        url: `collection/biggest`,
      }),
      providesTags: ['Collections'],
    }),
    getCollection: build.query<
      Collection,
      { userId: string; collectionId: string }
    >({
      query: ({ userId, collectionId }) => ({
        url: `collection/${userId}/${collectionId}`,
      }),
    }),
    getUserCollections: build.query<
      Collection[],
      { userId: string; category: string }
    >({
      query: ({ userId, category }) => ({
        url: `collection/user/${userId}?category=${category}`,
      }),
      providesTags: ['Collections'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useGetUserCollectionsQuery,
  useGetCollectionsQuery,
  useGetBiggestCollectionsQuery,
} = collectionApi;
