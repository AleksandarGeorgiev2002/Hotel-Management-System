import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from '../AuthForm.module.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log('Signup successful:', response.data);
      setErrorMessage(''); // Clear error message on success
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Signup failed:', error.response.data);
        setErrorMessage(error.response.data.password || 'Signup failed.'); // Set error message
      } else if (error.request) {
        console.error('No response from server:', error.request);
        setErrorMessage('No response from server. Please try again later.');
      } else {
        console.error('Error:', error.message);
        setErrorMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
      <div className={styles.authContainer}>
        <div className={styles.formCard}>
          <div className={styles.hotelBranding}>HOTEL 101</div>
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.inputField}
                />
                <button
                    type="button"
                    className={styles.togglePasswordButton}
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles.passwordWrapper}>
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.inputField}
                />
                <button
                    type="button"
                    className={styles.togglePasswordButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {errorMessage && ( // Conditionally render error message
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>
          <p className={styles.formLink}>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
  );
}

export default Signup;