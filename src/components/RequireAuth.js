import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const RequireAuth = ({ assignedRoles }) => {

  const { auth } = useAuth()
  const location = useLocation()

  console.log(auth.roles)

  return (
    auth?.roles === assignedRoles
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}
