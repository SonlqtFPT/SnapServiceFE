import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { UserLoginType } from '@/types/user/UserType'

export const useAuthListener = () => {
  const [user, setUser] = useState<UserLoginType>({
    UserId: '',
    FullName: '',
    Role: ''
  })

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          setUser(decoded as UserLoginType)
        } catch (error) {
          console.error("Invalid token:", error)
          setUser({ UserId: '', FullName: '', Role: '' })
        }
      } else {
        setUser({ UserId: '', FullName: '', Role: '' })
      }
    }

    handleAuthChange()
    window.addEventListener('login', handleAuthChange)
    window.addEventListener('logout', handleAuthChange)

    return () => {
      window.removeEventListener('login', handleAuthChange)
      window.removeEventListener('logout', handleAuthChange)
    }
  }, [])

  return user
}
