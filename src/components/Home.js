import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from './Login'

export const Home = () => {
  return (
    <section>
      <h2>Home</h2>
      <ul>
        <li><Link to='/editor'>Go to the Editor page</Link></li>
        <li><Link to='/admin'>Go to the Admin page</Link></li>
        <li><Link to='/lounge'>Go to the Lounge</Link></li>
        <li><Link to='/linkpage'>Go to the link page</Link></li>
      </ul>
    </section>
  )
}
