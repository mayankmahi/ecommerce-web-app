import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Register = ({ history }) => {
  const [email, setEmail] = useState('')

  const { user } = useSelector(state => ({ ...state }))
  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user])

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('ENV', process.env.REACT_APP_REGISTER_REDIRECT_URL)
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }
    await sendSignInLinkToEmail(auth, email, config)
    toast.success(`Email is sent to ${email}.`)
    // Save users email in local storage
    window.localStorage.setItem('emailForRegistration', email)

    // Clear State
    setEmail('')
  }

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Your Email'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Submit
      </button>
    </form>
  )

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  )
}

export default Register
