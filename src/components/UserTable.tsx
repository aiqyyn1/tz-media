import React, { useEffect } from 'react';
import { Table, Button, Spin, Space, Checkbox } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetUsersQuery, User, useDeleteUserMutation } from '../services/userApi';
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
      render: (_, user) => <Checkbox />,
    },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Фамилия', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
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
    { title: 'Город', dataIndex: ['address', 'city'], key: 'address.city' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, user) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(user.id)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(user.id)} />
        </Space>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id: number) => {
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
      <AddUserForm />
      <Table dataSource={users} columns={columns} className="mt-10" rowKey="id" />
  
    </div>
  );
};

export default UserTable;
