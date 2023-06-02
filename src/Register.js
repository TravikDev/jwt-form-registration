import { useState, useRef, useEffect } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { axiosBase } from "./api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
const REGISTER_URL = '/users'

const abortController = new AbortController()

export const Register = () => {

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [userValid, setUserValid] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [pwdValid, setPwdValid] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [matchPwdValid, setMatchPwdValid] = useState(false)
  const [matchPwdFocus, setMatchPwdFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)

    setUserValid(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setPwdValid(result)
    const match = pwd === matchPwd
    setMatchPwdValid(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }

    fetch(`http://localhost:3333/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username: user, password: pwd }),
      signal: abortController.signal
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSuccess(true)
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response.status === 409) {
          setErrMsg('Username Taken')
        } else {
          setErrMsg('Registration Failed')
        }
        errRef.current.focus()
      })

  //   try {
  //     const response = await axiosBase.post(
  //       REGISTER_URL,
  //       JSON.stringify({ username: user, password: pwd }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true
  //       })
  //     // clear input fields
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg('No Server Response')
  //     } else if (err.response.status === 409) {
  //       setErrMsg('Username Taken')
  //     } else {
  //       setErrMsg('Registration Failed')
  //     }
  //     errRef.current.focus()
  //   }
  }

  return (
    <>
      {success
        ? (
          <p>Success!</p>)
        : (
          < section >
            <p ref={errRef} style={errMsg ? style.errmsg : style.offscreen}>{errMsg}</p>
            <h1> Register </h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <span style={userValid ? style.valid : style.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span style={userValid || !user ? style.hide : style.unvalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={userValid ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id='uidnote' style={userFocus && user && !userValid ? style.note : style.offscreen}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <br />
              <label htmlFor="password">
                Password:
                <span style={pwdValid ? style.valid : style.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span style={pwdValid || !pwd ? style.hide : style.unvalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={pwdValid ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p id='pwdnote' style={pwdFocus && pwd && !pwdValid ? style.note : style.offscreen}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
              <br />
              <label htmlFor="matchPwd">
                Confirm password:
                <span style={matchPwdValid && matchPwd ? style.valid : style.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span style={matchPwdValid || !matchPwd ? style.hide : style.unvalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={matchPwdValid ? "false" : "true"}
                aria-describedby="matchpwdnote"
                onFocus={() => setMatchPwdFocus(true)}
                onBlur={() => setMatchPwdFocus(false)}
              />
              <p id='matchpwdnote' style={matchPwdFocus && matchPwd && !matchPwdValid ? style.note : style.offscreen}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <br />
              <button disabled={!userValid || !pwdValid || !matchPwdValid ? true : false}>Sign up</button>

              <p>
                Already registered? <br />
                <span>
                  <a href="#">Log in</a>
                </span>
              </p>

            </form>
          </section >
        )}
    </>
  )
}

const style = {
  errmsg: {
    background: '#fff',
    borderRadius: 1,
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
