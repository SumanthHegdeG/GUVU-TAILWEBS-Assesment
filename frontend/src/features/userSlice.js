import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  error: null,
  isLoading: false,
}

export const login = createAsyncThunk(
  'user/login',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        'http://localhost:5000/api/user/login',
        { email: obj.email, password: obj.password },
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const register = createAsyncThunk(
  'user/register',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        'http://localhost:5000/api/user/',
        { email: obj.email, password: obj.password, name: obj.name },
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo')
      state.user = null
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true
    },
    [login.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.isLoading = false
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [register.pending]: (state) => {
      state.isLoading = true
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})
export const { logout } = userSlice.actions

export default userSlice.reducer
