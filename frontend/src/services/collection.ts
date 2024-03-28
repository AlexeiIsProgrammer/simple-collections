import {
  Collection,
  CollectionItem,
  CollectionWithoutId,
} from '@models/interfaces';
import api from '@redux/api';

type ChangeCollectionField = {
  id: number;
  body: {
    field: string;
    value: string;
  };
};

export type BiggestCollection = {
  id: number;
  name: string;
  image_url: string;
  username: string;
  user_id: number;
  items_count: number;
};

export interface ExportCollection extends Collection {
  collectionItems: CollectionItem[];
}

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
    deleteCollection: build.mutation<void, number>({
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
      { userId: number; collectionId: number }
    >({
      query: ({ userId, collectionId }) => ({
        url: `collection/${userId}/${collectionId}`,
      }),
    }),
    getExportCollections: build.query<ExportCollection[], number>({
      query: (userId: number) => ({
        url: `collection/${userId}/export`,
      }),
    }),
    getUserCollections: build.query<
      Collection[],
      { userId: number; category: string }
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
  useLazyGetExportCollectionsQuery,
  useGetCollectionsQuery,
  useGetBiggestCollectionsQuery,
} = collectionApi;
