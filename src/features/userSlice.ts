import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../services/userApi';

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
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    createUser(state, action:any) {
      state.users = [...state.users, action.payload]
    },
    setIsPhoneArray(state, action){
       state.isPhoneArray = action.payload
    }
  },
});

export const { setUsers, deleteUser, createUser, setIsPhoneArray } = userSlice.actions;
export default userSlice.reducer;
