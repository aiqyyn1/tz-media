import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../services/userApi';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, deleteUser } = userSlice.actions;
export default userSlice.reducer;
