import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Modal, Button, Input, Space, Form } from 'antd';
import { useAppDispatch } from '../hooks';
import { UserAddOutlined } from '@ant-design/icons';
import { createUser, setIsPhoneArray } from '../features/userSlice';
import { User, useCreateUserMutation } from '../services/userApi';

const AddUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [postUser] = useCreateUserMutation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      skills: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = async (data: User) => {
 
    try {
      const response = await postUser(data).unwrap();
      dispatch(createUser(response)); 
      reset();
      setVisible(false);
    } catch (error) {
      console.error('Failed to create user:', error);
    } 
  };

  const handleAddSkill = () => {
    append('');
  };

  return (
    <>
      <div className="flex justify-end mr-5">
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setVisible(true)}>
          Add User
        </Button>
      </div>
      <Modal title="Add User" open={visible} onCancel={() => setVisible(false)} footer={null}>
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
            validateStatus={errors.surname ? 'error' : ''}
            help={errors.surname ? errors.surname.message : ''}
          >
            <Controller
              name="surname"
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
          <Form.Item label="Skills">
            {fields.map((field, index) => (
              <Space key={field.id} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Input
                  readOnly
                  value={index + 1}
                  style={{ width: 30, marginRight: 8, textAlign: 'center' }}
                />
                <Controller
                  name={`skills.${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onPressEnter={(e) => {
                        e.preventDefault();
                      }}
                    />
                  )}
                />
                {fields.length > 1 && (
                  <Button type="dashed" onClick={() => remove(index)}>
                    Remove
                  </Button>
                )}
              </Space>
            ))}
            <Button type="dashed" onClick={handleAddSkill}>
              Add Skill
            </Button>
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
