import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UserState {
  users: User[];
  isPhoneArray:boolean
}

const initialState: UserState = {
  users: [],
  isPhoneArray:false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    deleteUser(state, action: PayloadAction<string | undefined>) {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    createUser(state, action) {
      state.users = [...state.users, action.payload]
    },
    setIsPhoneArray(state, action){
       state.isPhoneArray = action.payload
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { setUsers, deleteUser, createUser, setIsPhoneArray, updateUser } = userSlice.actions;
export default userSlice.reducer;
