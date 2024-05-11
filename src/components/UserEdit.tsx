import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../services/userApi';

const UserEdit: React.FC = () => {
  const {id} = useParams()
  const {data} = useGetUserByIdQuery(String(id))

  return <div></div>;
};

export default UserEdit;
