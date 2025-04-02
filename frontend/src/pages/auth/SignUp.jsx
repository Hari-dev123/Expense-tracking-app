import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link  , useNavigate} from 'react-router-dom';
import axios from 'axios';
const validEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate(); // Use inside the component
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/auth/register', { fullName,email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // ✅ Correct usage of navigate
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d060c]">
      <div className="w-full max-w-md p-6 bg-[#812b71] text-[#f4ebf2] rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        {error && <p className="text-[#d79ccc] text-sm text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              className={`absolute left-3 transition-all duration-300 ${fullNameFocused || fullName ? 'text-base  text-[#d79ccc]' : 'top-3 text-gray-300'}`}
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#d79ccc] bg-[#0d060c] text-[#f4ebf2] pt-5"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setFullNameFocused(true)}
              onBlur={() => setFullNameFocused(fullName.length > 0)}
              required
            />
          </div>
          <div className="relative">
            <label
              className={`absolute left-3 transition-all duration-300 ${emailFocused || email ? 'text-base text-[#d79ccc]' : 'top-3 text-gray-300'}`}
            >
              Email
            </label>
            <input
              type="email"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#d79ccc] bg-[#0d060c] text-[#f4ebf2] pt-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(email.length > 0)}
              required
            />
          </div>
          <div className="relative">
           
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-300 ${passwordFocused || password ? 'text-base  text-[#d79ccc]' : 'top-3 text-gray-300'}`}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#d79ccc] bg-[#0d060c] text-[#f4ebf2] pt-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(password.length > 0)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-[#f4ebf2]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#d055b9] text-[#f4ebf2] p-2 rounded hover:bg-[#d79ccc]"
          >
            Sign Up
          </button>
          <p className="text-center text-sm mt-4 text-[#f4ebf2]">Already have an account? <Link to="/login" className="text-[#d79ccc] hover:underline">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;