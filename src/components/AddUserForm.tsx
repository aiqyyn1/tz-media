import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Modal, Button, Input, Space, Form } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { UserAddOutlined } from '@ant-design/icons';
import { createUser, setIsPhoneArray } from '../features/userSlice';
import { User } from '../services/userApi';

const AddUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: [''],
      address: { city: '' },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phone',
  });

  const onSubmit = (data: User) => {
    dispatch(createUser(data));
    reset();
    setVisible(false);
    dispatch(setIsPhoneArray(true));
  };

  const handleAddPhone = () => {
    append('');
  };

  return (
    <>
      <div className="flex justify-end mr-5">
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setVisible(true)}>
          Add User
        </Button>
      </div>
      <Modal title="Add User" visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Name"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name ? errors.name.message : ''}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Surname"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username ? errors.username.message : ''}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Surname is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? errors.email.message : ''}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Phone">
            {fields.map((field, index) => (
              <Space key={field.id} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Input
                  readOnly
                  value={index + 1}
                  style={{ width: 30, marginRight: 8, textAlign: 'center' }}
                />
                <Controller
                  name={`phone.${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onPressEnter={(e) => {
                        e.preventDefault(); // Prevent form submission
                        if (index === fields.length - 1) {
                          handleAddPhone();
                        }
                      }}
                    />
                  )}
                />
                {fields.length >= 1 && (
                  <Button type="dashed" onClick={() => remove(index)}>
                    Remove
                  </Button>
                )}
              </Space>
            ))}
            <Button type="dashed" onClick={handleAddPhone}>
              Add Phone
            </Button>
          </Form.Item>
          <Form.Item
            label="City"
            validateStatus={errors.address?.city ? 'error' : ''}
            help={errors.address?.city ? errors.address.city.message : ''}
          >
            <Controller
              name="address.city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserForm;
