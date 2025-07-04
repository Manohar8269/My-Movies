import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedInUser')) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert('Invalid credentials');
      return;
    }

    localStorage.setItem('loggedInUser', user.name);
    localStorage.setItem('loggedInEmail', user.email);

    if (onLogin) onLogin();

    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
        />
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ ...styles.input, paddingRight: '40px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={styles.toggleBtn}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '2rem',
    backgroundColor: '#1f1f1f',
    color: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,255,255,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2a2a2a',
    color: 'white',
  },
  passwordContainer: {
    position: 'relative',
  },
  toggleBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default LoginPage;
