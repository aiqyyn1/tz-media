
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../services/userApi';
import AddUserForm from './AddUserForm';

const UserEdit: React.FC = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(String(id));

  if (isLoading) return <div>Loading...</div>;

  return user ? <AddUserForm user={user} onClose={() => {}} /> : <div>User not found</div>;
};

export default UserEdit;
