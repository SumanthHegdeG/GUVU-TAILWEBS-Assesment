import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  students: [],
  error: null,
  isLoading: false,
}

export const getAllStudents = createAsyncThunk(
  'student/getAllStudents',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    try {
      const { user } = getState((state) => state.user)

      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      }

      const { data } = await axios.get(
        'http://localhost:5000/api/student',
        config
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addStudent = createAsyncThunk(
  'student/addStudent',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    try {
      const { user } = getState((state) => state.user)

      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      }

      const { data } = await axios.post(
        'http://localhost:5000/api/student',
        { ...obj },
        config
      )
      dispatch(getAllStudents())

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    try {
      const { user } = getState((state) => state.user)

      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      }

      const { data } = await axios.delete(
        `http://localhost:5000/api/student/${obj}`,

        config
      )
      dispatch(getAllStudents())

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async (
    { id, ...obj },
    { rejectWithValue, fulfillWithValue, getState, dispatch }
  ) => {
    try {
      const { user } = getState((state) => state.user)

      const config = {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      }

      const { data } = await axios.put(
        `http://localhost:5000/api/student/${id}`,
        { ...obj },
        config
      )
      dispatch(getAllStudents())

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const studentSlice = createSlice({
  name: 'student',
  initialState,

  extraReducers: {
    [getAllStudents.pending]: (state) => {
      state.isLoading = true
    },
    [getAllStudents.fulfilled]: (state, action) => {
      state.isLoading = false
      state.students = action.payload.items
    },
    [getAllStudents.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default studentSlice.reducer
