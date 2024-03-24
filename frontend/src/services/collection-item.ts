import { SORT_ENUM } from '@models/enums';
import {
  CollectionItem,
  CollectionItemWithCustomFields,
  Comment,
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
  body: {
    fieldId: string;
    value: string;
  }[];
};

type CollectionItemByTag = CollectionItem & {
  user_id: string;
  collection_name: string;
};

type Sort = {
  collectionId: string;
  name: SORT_ENUM;
};

export type LastAddedItem = {
  id: string;
  name: string;
  collection_name: string;
  username: string;
  created_at: string;
  user_id: string;
  collection_id: string;
};

const collectionItemApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCollectionItem: build.mutation<void, Omit<CollectionItem, 'id'>>({
      query: (body) => ({
        url: `collection-item`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CollectionItems'],
    }),
    updateCollectionItem: build.mutation<void, ChangeCollectionItemName>({
      query: ({ id, body }) => ({
        url: `collection-item/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CollectionItems'],
    }),
    updateCollectionItemCustomField: build.mutation<
      void,
      ChangeCollectionItemCustomField
    >({
      query: ({ id, body }) => ({
        url: `collection-item/${id}/custom`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CustomFields', 'CollectionItems'],
    }),
    deleteCollectionItem: build.mutation<void, string>({
      query: (id) => ({
        url: `collection-item/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CollectionItems'],
    }),
    getAllCollectionItems: build.query<CollectionItem[], void>({
      query: () => ({
        url: `collection-item`,
      }),
    }),
    getCollectionItems: build.query<CollectionItemWithCustomFields[], Sort>({
      query: ({ collectionId, name }) => ({
        url: `collection-item/${collectionId}?name=${name}`,
      }),
      providesTags: ['CollectionItems'],
    }),
    getCollectionItemsByTagName: build.query<CollectionItemByTag[], string>({
      query: (tagId) => ({
        url: `collection-item/${tagId}/tag`,
      }),
    }),
    getCollectionItem: build.query<
      CollectionItemWithCustomFields,
      { collectionId: string; id: string }
    >({
      query: ({ collectionId, id }) => ({
        url: `collection-item/${collectionId}/${id}`,
      }),
      providesTags: ['Items', 'CustomFields'],
    }),
    getLastItems: build.query<LastAddedItem[], void>({
      query: () => ({
        url: `collection-item/last`,
      }),
    }),
    addComment: build.mutation<
      void,
      { name: string; text: string; itemId: string; role: string }
    >({
      query: ({ text, name, itemId, role }) => ({
        url: `comment/${itemId}`,
        method: 'POST',
        body: {
          name,
          text,
          role,
        },
      }),
      invalidatesTags: ['Comments'],
    }),
    getComments: build.query<Comment[], string>({
      query: (itemId) => ({
        url: `comment/${itemId}/all`,
      }),
      providesTags: ['Comments'],
    }),
    setLike: build.mutation<void, { itemId: string; userId: string }>({
      query: ({ itemId, userId }) => ({
        url: `collection-item/${itemId}/${userId}/like`,
        method: 'PUT',
      }),
      invalidatesTags: ['Items', 'CollectionItems'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useDeleteCollectionItemMutation,
  useSetLikeMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useCreateCollectionItemMutation,
  useUpdateCollectionItemCustomFieldMutation,
  useUpdateCollectionItemMutation,
  useGetCollectionItemQuery,
  useGetCollectionItemsQuery,
  useGetCollectionItemsByTagNameQuery,
  useGetLastItemsQuery,
} = collectionItemApi;
