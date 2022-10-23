import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/userSlice'
const LoginScreen = () => {
  const [input, setInput] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(input))
  }

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='col-11 col-md-6 col-lg-4 border p-5 rounded-3'>
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={onChange}
              value={input.email}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              onChange={onChange}
              value={input.password}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        <p className='text-center'>
          New User ? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
