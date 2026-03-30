import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/login',
        formData,
      );

      localStorage.setItem('user_id', response.data.id);
      localStorage.setItem('user_name', response.data.name);
      localStorage.setItem('user_email', response.data.email);

      window.location.href = '/';
    } catch (error) {
      console.error('Login hatası:', error);
      setError('Email veya şifre hatalı.');
    }
  };

  return (
    <div className="card">
      <h2>Giriş Yap</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Şifre</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="primary-button" type="submit">
          Giriş Yap
        </button>
      </form>

      {error && <p>{error}</p>}

      <p style={{ marginTop: '16px' }}>
        Hesabın yok mu? <Link to="/kayit-ol">Kayıt Ol</Link>
      </p>
    </div>
  );
}

export default Login;
