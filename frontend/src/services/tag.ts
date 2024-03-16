import { Tag } from '@models/interfaces';
import api from '@redux/api';

enum TagActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

type ActionType = {
  type: TagActionType;
  id?: number;
  value?: string;
};

export type UpdateTagsType = {
  id: number;
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
    }),
    getTags: build.query<Tag[], void>({
      query: () => ({
        url: 'tag',
      }),
    }),
    getTagsByCollectionItem: build.query<Tag[], void>({
      query: (id) => ({
        url: `tag/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTagsByCollectionItemQuery,
  useGetTagsQuery,
  useUpdateTagsMutation,
} = tagApi;
