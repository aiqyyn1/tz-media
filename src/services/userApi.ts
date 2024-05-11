import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street?: string;
    suite?: string;
    city: string;
    zipcode?: string;
  };
  phone: { label: number; value: string }[];
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    createUser: builder.mutation<User, User>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body:user
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
} = userApi;
