import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Modal, Button, Input, Space, Form } from 'antd';
import { useAppDispatch } from '../hooks';
import { UserAddOutlined } from '@ant-design/icons';
import { createUser, updateUser } from '../features/userSlice';
import { useCreateUserMutation, useChangeByIdMutation } from '../services/userApi';
import { User } from '../types/User';
interface AddUserFormProps {
  user?: User;
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ user, onClose }) => {
  const dispatch = useAppDispatch();
  const [postUser] = useCreateUserMutation();
  const [updateUserById] = useChangeByIdMutation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<User>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      skills: [''],
    },
  });

  const { fields, append, remove } = useFieldArray<User>({
    control,
    name: 'skills',
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('surname', user.surname);
      setValue('email', user.email);
      setValue('skills', user.skills || ['']);
      setVisible(true);
    }
  }, [user, setValue]);

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      if (user && user._id) {
        const response = await updateUserById({ id: user._id, user: data }).unwrap();
        dispatch(updateUser(response));
      } else {
        const response = await postUser(data).unwrap();
        dispatch(createUser(response));
      }
      reset();
      setVisible(false);
      onClose();
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    append('');
  };

  return (
    <>
      <div className="flex justify-end mr-5">
        {!user && (
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => setVisible(true)}>
            Add User
          </Button>
        )}
      </div>
      <Modal
        title={user ? 'Edit User' : 'Add User'}
        open={visible}
        onCancel={() => {
          setVisible(false);
          onClose();
        }}
        footer={null}
      >
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserForm;
