import React, { useEffect } from 'react';
import { Table, Button, Spin, Space, Checkbox } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetUsersQuery, useDeleteUserMutation } from '../services/userApi';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setUsers, deleteUser as deleteUserAction } from '../features/userSlice';
import AddUserForm from './AddUserForm';

const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const { data, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Ошибка загрузки данных</div>;

  const columns: ColumnsType<User> = [
    {
      title: '',
      key: 'checkbox',
      render: () => <Checkbox />,
    },
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Фамилия', dataIndex: 'surname', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'День Регистрации', dataIndex: 'registrationDate', key: 'registrationDate' },
    {
      title: 'Навыки',
      dataIndex: 'skills',
      key: 'skills',
      render: (phone) => (
        <div className="flex flex-col">
          {Array.isArray(phone) ? (
            phone.map((number, index) => (
              <span key={index}>
                {index + 1}. {number}
              </span>
            ))
          ) : (
            <span>{phone}</span>
          )}
        </div>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, user) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(user._id)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(user._id)} />
        </Space>
      ),
    },
  ];

  const handleEdit = (id: string | undefined) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      await deleteUser(id).unwrap();
      dispatch(deleteUserAction(id));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <span className="font-bold text-xl">Here you can see UserList</span>
      </div>
      <AddUserForm   onClose={() => {}}/>
      <Table dataSource={users} columns={columns} className="mt-10" rowKey="id" />
    </div>
  );
};

export default UserTable;
