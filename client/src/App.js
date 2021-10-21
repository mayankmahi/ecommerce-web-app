import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'

// Components
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Header = lazy(() => import('./pages/Components/nav/Header'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))

function App () {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user)

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    // cleanup
    return () => unsubscribe()
  }, [dispatch])
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <ToastContainer />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/complete' component={RegisterComplete} />
        </Switch>
      </Suspense>
    </>
  )
}

export default App
