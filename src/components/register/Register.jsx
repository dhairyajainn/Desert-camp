import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/authSlice';
import './Register.css'; // Import custom CSS

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        const user = { name, email, password };
        dispatch(signUp(user));
        alert('Sign up successfully');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h3 className="register-title">Sign Up</h3>
                <form onSubmit={handleSignUp}>
                    <label htmlFor="name" className="register-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className="register-input"
                        placeholder="Enter your full name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email" className="register-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="register-input"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="register-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="register-input"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="register-input"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className="register-button">Sign Up</button>
                </form>
                <p className="register-footer">
                    Already have an account? <Link to="/login" className="register-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
