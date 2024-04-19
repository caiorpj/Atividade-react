import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // alterado aqui
import 'firebase/compat/auth'; // alterado aqui
import './css/style.css';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRCv9IREFsQ72DXXyIiNASuNnT62RTMGA",
  authDomain: "etec-caio.firebaseapp.com",
  // adicione outras configurações do Firebase aqui
};

// Initialize Firebase app (if not already done)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const handleMenuHomeClick = () => {
    setShowLoginForm(true);
  };

  const handleReturnHome = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="container">
      {!showLoginForm ? (
        <div className="form-container">
          <h1>Faça o login</h1>
          {user ? (
            <>
              <p>Salve {user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={handleLogin}>Fazer Login</button>
              {error && <p className="error">{error}</p>}
            </>
          )}
          <button onClick={handleMenuHomeClick}>Menu Home</button>
        </div>
      ) : (
        <div className="form-container">
          <h1>Menu Home</h1>
          <button onClick={handleReturnHome}>Voltar</button>
        </div>
      )}
    </div>
  );
}

export default App;
