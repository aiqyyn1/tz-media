import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Modal, Button, Input, Space, Form } from 'antd';
import { useAppDispatch } from '../hooks';
import {  UserAddOutlined } from '@ant-design/icons';
import { createUser} from '../features/deleteSlice';
import { User } from '../services/userApi';

const AddUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<User>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      skills: [{ value: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = (data: User) => {
    dispatch(createUser(data));
    reset();
    setVisible(false);
  };

  return (
    <>
      {/* <Button type="primary" icon={<UserAddOutlined />} onClick={() => setVisible(true)}>
        Add User
      </Button>
      <Modal
        title="Add User"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Name" validateStatus={errors.name ? 'error' : ''} help={errors.name ? errors.name.message : ''}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Surname" validateStatus={errors.username ? 'error' : ''} help={errors.username ? errors.username.message : ''}>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Surname is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email ? errors.email.message : ''}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Skills">
            {fields.map((field, index) => (
              <Space key={field.id} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Controller
                  name={`skills.${index}.value`}
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <Button type="dashed" onClick={() => remove(index)}>
                  Remove
                </Button>
              </Space>
            ))}
            <Button type="dashed" onClick={() => append({ value: '' })}>
              Add Skill
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};

export default AddUserForm;
