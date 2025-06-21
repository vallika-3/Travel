import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <div className="flex items-center justify-center space-x-2">
        <span className="text-gray-500">Or continue with</span>
        <button className="p-2 rounded-full border hover:bg-gray-100">
          <FaGoogle className="text-xl" />
        </button>
      </div>
      <p className="text-sm text-center text-gray-600">
        {type === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <a href={type === 'login' ? '/signup' : '/login'} className="text-blue-600 font-medium">
          {type === 'login' ? 'Sign Up' : 'Login'}
        </a>
      </p>
    </motion.div>
  );
};

export default AuthForm;
