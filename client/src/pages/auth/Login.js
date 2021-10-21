import React, { useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

const Login = ({ history }) => {
  const [email, setEmail] = useState('mkmahi1198@gmail.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const auth = getAuth()
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    // console.table(email, password)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      // console.log(result)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token
        }
      })
      history.push('/')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async result => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
        history.push('/')
      })
      .catch(err => {
        console.log(err)
        toast.error(err.message)
      })
  }

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Your Email'
          autoFocus
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type='primary'
        className='mb-3'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  )

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {LoginForm()}
          <Button
            onClick={googleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
