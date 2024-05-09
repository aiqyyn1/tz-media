import React from 'react';
import { Table, Button, Spin, Space, Checkbox } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetUsersQuery, User } from '../services/userApi';
import { useNavigate } from 'react-router-dom';

const UserTable: React.FC = () => {
  let navigate = useNavigate();
  const { data: users, error, isLoading } = useGetUsersQuery();

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
    { title: 'Навыки', dataIndex: 'phone', key: 'phone' },
    { title: 'Дата регистрации', dataIndex: 'website', key: 'website' },
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

  const handleDelete = (id: number) => {
    console.log('Delete user with ID:', id);
  };

  return (
    <div className="h-screen mr-40 mt-20 flex justify-center">
      <Table dataSource={users} columns={columns} className="w-1/2" rowKey="id" />
    </div>
  );
};

export default UserTable;
