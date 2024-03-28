import { Tag } from '@models/interfaces';
import api from '@redux/api';

export type TagActionType = 'create' | 'update' | 'delete';

export type ActionType = {
  type?: TagActionType;
  id?: number;
  name?: string;
};

export type UpdateTagsType = {
  id: string;
  actions: ActionType[];
};

const tagApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateTags: build.mutation<void, UpdateTagsType>({
      query: (body) => ({
        url: `tag`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Tags'],
    }),
    getTags: build.query<Tag[], void>({
      query: () => ({
        url: 'tag',
      }),
      providesTags: ['Tags'],
    }),
    getTag: build.query<Tag, string>({
      query: (id) => ({
        url: `tag/${id}/info`,
      }),
    }),
    getTagsByCollectionItem: build.query<Tag[], number>({
      query: (id) => ({
        url: `tag/${id}`,
      }),
      providesTags: ['Tags'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTagsByCollectionItemQuery,
  useGetTagsQuery,
  useGetTagQuery,
  useUpdateTagsMutation,
} = tagApi;
