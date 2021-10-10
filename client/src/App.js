import React, { Suspense, lazy } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

// Components
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Header = lazy(() => import('./pages/Components/nav/Header'))
function App () {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Suspense>
    </>
  )
}

export default App
