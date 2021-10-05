import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firbase.initialize';

initializeAuthentication();

const Googleprovider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, Googleprovider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loginUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loginUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const { displayName, email, photoURL } = result.user;
      const loginUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loginUser);
    });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };

  return (
    <div className='App'>
      {!user.name ? (
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign in</button>
          <button onClick={handleGithubSignIn}>Github Sign in</button>
        </div>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
      <br />
      {user.name && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt='' />
        </div>
      )}
    </div>
  );
}

export default App;
