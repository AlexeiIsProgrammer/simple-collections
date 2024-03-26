import { User } from '@models/interfaces';
import { LoginFormData } from '@pages/Login/types';
import { RegisterFormData } from '@pages/Register/types';
import api from '@redux/api';

export type ActionType = {
  id: number;
  field: keyof User;
  value: string;
};

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<User, RegisterFormData>({
      query: (body) => ({
        url: 'user/',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<User, LoginFormData>({
      query: (body) => ({
        url: 'user/login/',
        method: 'POST',
        body,
      }),
    }),
    changeUsersState: build.mutation<void, ActionType[]>({
      query: (actions) => ({
        url: `user/`,
        method: 'PATCH',
        body: { actions },
      }),

      invalidatesTags: ['Users'],
    }),
    deleteUsers: build.mutation<void, number[]>({
      query: (ids) => ({
        url: `user/`,
        method: 'DELETE',
        body: { ids },
      }),

      invalidatesTags: ['Users'],
    }),
    getUsers: build.query<User[], void>({
      query: () => ({
        url: 'user/',
        method: 'GET',
      }),

      providesTags: ['Users'],
    }),
    getUser: build.query<User, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),

      providesTags: ['Users'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useChangeUsersStateMutation,
} = userApi;
