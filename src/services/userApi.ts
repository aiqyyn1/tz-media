import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    deleteUser: builder.mutation<void, string | undefined>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    createUser: builder.mutation<User, User>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    changeById: builder.mutation({
      query: ({ user, id }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useChangeByIdMutation,
} = userApi;
