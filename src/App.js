import { useState } from 'react';
import './App.css';
import initialzAuthentication from './firebase/firebase.initialize';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,sendEmailVerification  } from "firebase/auth";

initialzAuthentication();

function App() {
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handelRegister = e => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    if (!/(?=.*[>>!#$%&? "<<])[0-9 >>!#$%&?<< ]/.test(password)) {
      setError('At least one special character');
      return;
    }

    isLogin ? UserLongin(email, password) : createNewUser(email, password);
  }

  const loginToggol = e => {
    setIsLogin(e.target.checked);
  }

  const handelEmailchange = e => {
    setEmail(e.target.value);
  }
  const handelPasswordChange = e => {
    setPassword(e.target.value)

  }

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        sendEmailVerification (auth.currentUser)
        .then(result =>{
          console.log(result)
          setError('plese verify your email');
        }).catch(error=>{
          setError(error.message);
        })
        const user = result.user;
        setError('');
        console.log(user);
      }).catch(error => {
        setError('email already in use');
      });
  }

  const UserLongin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user)
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })

  }
  const hendelRestPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setError(" Password reset email sent!")
        // ..
      })
      .catch((error) => {
       setError(error.message)
        // ..
      });
  }
  return (
    <div className="container my-5">
      <h3 className="text-primary">Please {isLogin ? "Login" : "Register"}</h3>
      <form onSubmit={handelRegister}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onBlur={handelEmailchange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onBlur={handelPasswordChange} type="password" className="form-control" id="exampleInputPassword1" required />
        </div>
        <div className="mb-3 form-check">
          <input onChange={loginToggol} type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Already registered</label>
        </div>
        <div className="mb-3">{error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? "Login" : "Register"}</button>
        {
          isLogin && <button onClick = {hendelRestPassword} className="btn btn-primary mx-3 btn-sm">Forget Password</button>
        }
      </form>
    </div>
  );
}

export default App;
