import {
  CollectionItem,
  CollectionItemWithCustomFields,
} from '@models/interfaces';
import api from '@redux/api';

type ChangeCollectionItemName = {
  id: string;
  body: {
    name: string;
  };
};

type ChangeCollectionItemCustomField = {
  id: string;
  fieldId: string;
  body: {
    value: string;
  };
};

const collectionItemApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCollectionItem: build.mutation<void, Omit<CollectionItem, 'id'>>({
      query: (body) => ({
        url: `collection-item`,
        method: 'POST',
        body,
      }),
    }),
    updateCollectionItem: build.mutation<void, ChangeCollectionItemName>({
      query: ({ id, body }) => ({
        url: `collection-item/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    updateCollectionItemCustomField: build.mutation<
      void,
      ChangeCollectionItemCustomField
    >({
      query: ({ id, fieldId, body }) => ({
        url: `collection-item/${id}/${fieldId}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteCollectionItem: build.mutation<void, string>({
      query: (id) => ({
        url: `collection-item/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllCollectionItems: build.query<CollectionItem[], void>({
      query: () => ({
        url: `collection-item`,
      }),
    }),
    getCollectionItems: build.query<CollectionItem[], string>({
      query: (collectionId) => ({
        url: `collection-item/${collectionId}`,
      }),
    }),
    getCollectionItemsByTagName: build.query<CollectionItem[], string>({
      query: (collectionId) => ({
        url: `collection-item/${collectionId}/tag`,
      }),
    }),
    getCollectionItem: build.query<
      CollectionItemWithCustomFields,
      { collectionId: string; id: string }
    >({
      query: ({ collectionId, id }) => ({
        url: `collection-item/${collectionId}/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCollectionItemMutation,
  useUpdateCollectionItemCustomFieldMutation,
  useUpdateCollectionItemMutation,
  useGetCollectionItemQuery,
  useGetCollectionItemsQuery,
  useGetCollectionItemsByTagNameQuery,
} = collectionItemApi;
