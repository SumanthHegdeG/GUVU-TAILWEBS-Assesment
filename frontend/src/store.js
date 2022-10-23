import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import studentReducer from './features/studentSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
  },
})
