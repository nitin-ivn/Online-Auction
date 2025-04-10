import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/register', {
        firstName: form.first,
        lastName: form.last,
        email: form.email,
        password: form.password
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='loginPage d-flex align-items-center my-auto justify-content-center'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="title">
            <h1 className='regTitle'>Hello !</h1>
            <p>Create an account to continue</p>
          </div>

          {error && <p className="text-danger mb-2">{error}</p>}

          <div className='d-flex gap-3'>
            <input
              type="text"
              placeholder="First Name"
              name="first"
              className="custominput"
              value={form.first}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last"
              className="custominput"
              value={form.last}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="input"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="login-with">
            <div className="button-log"></div>

            <div className="button-log">
              {/* Google Icon */}
              <svg className="icon2" height="56.6934px" viewBox="0 0 56.6934 56.6934">
              <path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372c-5.9992,1.9535-11.1066,6.4391-13.9384,12.1086c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836c-0.766,5.5321,0.557,11.2296,2.8468,16.0967c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z"></path>
              </svg>
            </div>
            <div className="button-log">
              {/* Facebook Icon */}
              <svg width="56.693px" height="56.693px" viewBox="0 0 56.693 56.693" className="icon">
              <path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77L40.43,21.739z"></path>
              </svg>
            </div>
          </div>

          <button type="submit" className="button-confirm">Let`s go →</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
