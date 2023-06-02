import { useRef, useState, useEffect, useContext } from "react"
import { AuthContext } from "./context/AuthProvider"

export const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUser('')
    setPwd('')
    const response = await fetch(
      'http://localhost:3333/auth/login',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pwd }),
        credentials: "include"
      })
      .then(response => response.json())
      .then(data => {
        if (data?.access_token) {
          setSuccess(true)
          console.log(data?.access_token)
        }
        if (data.statusCode === 401) throw new Error('Wrong username or password')
      })
      .catch(err => {
        setErrMsg(err.message)
        errRef.current.focus()
      })
  }

  return (
    <>
      {
        success ? (
          <p>You are logged in!</p>
        ) : (
          <section>
            <p ref={errRef} style={errMsg ? style.note : style.offscreen} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label htmlFor="password">Username:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button>Sign In</button>
            </form>
          </section>
        )}
    </>
  )
}

const style = {
  errmsg: {
    background: '#fff',
    borderRadius: 1,
    height: '100px',
    borderColor: '#000',
    display: 1
  },
  note: {
    background: '#f44343',
    borderRadius: 1,
    textColor: '#fff',
    borderColor: '#000',
  },
  offscreen: {
    background: '#f44343',
    borderRadius: 1,
    textColor: '#fff',
    borderColor: '#000',
    display: 'none'
  },
  valid: {
    color: '#0f0'
  },
  unvalid: {
    color: '#f00'
  },
  hide: {
    display: 'none'
  }
}