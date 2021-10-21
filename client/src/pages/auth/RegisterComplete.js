import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import {
  signInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from 'firebase/auth'
import { toast } from 'react-toastify'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
    console.log(window.location.href)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    //   Validation
    if (!email || !password) {
      toast.error('Email and Password is required')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be 6 Charactcter long')
      return
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      )
      //   console.log('Result', result)
      if (result.user.emailVerified) {
        // remove useremail from localStorage
        window.localStorage.removeItem('emailForRegistration')
        // Get UserId Token
        let user = auth.currentUser
        console.log(user)

        await updatePassword(password)
        const idTokenResult = await getIdTokenResult()
        //   Redux Store
        console.log(user, idTokenResult)
        //   Redirect
        history.push('/')
      }
    } catch (error) {
      //   console.log(error)
      toast.error(error.message)
    }
  }

  const registerCompleteForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />
      <input
        type='password'
        className='form-control'
        value={password}
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Complete Registration
      </button>
    </form>
  )

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          {registerCompleteForm()}
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete
