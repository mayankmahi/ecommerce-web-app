import React, { useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { getAuth, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const { SubMenu, Item } = Menu

const Header = () => {
  const [current, setCurrent] = useState('home')
  const dispatch = useDispatch()
  let history = useHistory()
  let { user } = useSelector(state => ({ ...state }))

  const handleClick = e => {
    // console.log(e.key)
    setCurrent(e.key)
  }
  const auth = getAuth()
  const logout = () => {
    signOut(auth)
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
    history.push('/login')
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      {!user && (
        <Item key='register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='register'>Register</Link>
        </Item>
      )}

      {!user && (
        <Item key='login' icon={<UserOutlined />} className='float-right'>
          <Link to='login'>Login</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className='float-right'
        >
          <Item key='setting:1'>Option 1</Item>
          <Item key='setting:2'>Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  )
}

export default Header
