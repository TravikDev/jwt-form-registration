import React from 'react'
import { Link } from 'react-router-dom'

export const LinkPage = () => {
  return (
    <section>
      <h2>User</h2>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
      <h2>User</h2>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/editor'>Editor</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
        <li><Link to='/lounge'>Lounge</Link></li>
      </ul>
    </section>
  )
}
