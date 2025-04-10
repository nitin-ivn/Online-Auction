import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../main'
import './Login.css'

function Login() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        console.log(data.user)
        localStorage.setItem("authToken", data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user))
        navigate('/')
        alert("Login successfully")
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
  }

  return (
    <div className='loginPage d-flex align-items-center my-auto justify-content-center'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="title">
            <h1 className='regTitle'>Welcome!</h1>
            <p>Sign Up to Continue</p>
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="login-with">
            <div className="button-log"></div>

            <div className="button-log">
              {/* Google icon */}
              <svg
                className="icon2"
                height="56.6934px"
                viewBox="0 0 56.6934 56.6934"
                width="56.6934px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372c-5.9992,1.9535-11.1066,6.4391-13.9384,12.1086c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836c-0.766,5.5321,0.557,11.2296,2.8468,16.0967c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z"></path>
              </svg>
            </div>
            <div className="button-log">
              {/* Facebook icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width="56.693px"
                viewBox="0 0 56.693 56.693"
                height="56.693px"
                className="icon"
              >
                 <path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77L40.43,21.739z"></path>
              </svg>
            </div>
          </div>
          <div className='mt-3'>
            <p className='m-0 forgot'>Forgot Password?</p>
            <button type="submit" className="button-confirm mt-2">Let`s go →</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
