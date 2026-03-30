import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/users',
        formData,
      );

      localStorage.setItem('user_id', response.data.id);
      localStorage.setItem('user_name', response.data.name);
      localStorage.setItem('user_email', response.data.email);

      setSuccessMessage('Kayıt başarılı. Ana sayfaya yönlendiriliyorsun...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Kayıt hatası:', error);
      setError('Kayıt oluşturulamadı. Email zaten kayıtlı olabilir.');
    }
  };

  return (
    <div className="card">
      <h2>Kayıt Ol</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Ad Soyad</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Kayıt Ol
        </button>
      </form>

      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      <p style={{ marginTop: '16px' }}>
        Zaten hesabın var mı? <Link to="/giris">Giriş Yap</Link>
      </p>
    </div>
  );
}

export default Register;
