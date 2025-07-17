import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">SIGN IN</h2>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="w-20 h-20 rounded-full" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 text-black"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 text-black"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="mr-2"
              />
              <label htmlFor="remember-me" className="text-sm">Remember me</label>
            </div>
            <a href="#" className="text-sm text-cyan-500 hover:text-cyan-600">Forgot your password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm">
          New user?{' '}
          <a href="/register" className="text-cyan-500 hover:text-cyan-600">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
