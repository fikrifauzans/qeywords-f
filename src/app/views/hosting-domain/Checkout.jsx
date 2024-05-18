// src/components/Checkout.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain, needsRegistration } = location.state || {};
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCheckout = () => {
    if (needsRegistration) {
      // Perform registration logic
      console.log('Registering user and checking out...');
    } else {
      // Perform checkout logic
      console.log('Checking out...');
    }
    navigate('/invoice');
  };

  return (
    <div>
      <h1>Checkout</h1>
      {needsRegistration && (
        <div>
          <h2>Register</h2>
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
        </div>
      )}
      <button onClick={handleCheckout}>Complete Order</button>
    </div>
  );
}

export default Checkout;
