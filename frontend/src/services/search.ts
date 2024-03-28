import { Comment, CustomField, Tag } from '@models/interfaces';
import api from '@redux/api';

export type SearchCollectionType = {
  id: number;
  name: string;
  description: string;
  category: string;
  image_url: string;
  user_id: number;
  custom_fields: Omit<CustomField, 'collection_id'>[];
};

export type SearchItemType = {
  id: number;
  name: string;
  collection_id: string;
  user_id: number;
  tags: Tag[];
  comments: Comment[];
};

export interface SearchResults {
  collections: SearchCollectionType[];
  items: SearchItemType[];
}

const searchApi = api.injectEndpoints({
  endpoints: (build) => ({
    getResults: build.query<SearchResults, string>({
      query: (q) => ({
        url: `search?q=${q}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetResultsQuery } = searchApi;
