


import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  
  const LogIn = () => {

    const [loggedInUser, setLoggedInUser] =  useContext(UserContext)

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();



    const handleSignUp = (provider) => {

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const { displayName, email } = user
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser)
                history.replace(from);
                console.log(signedInUser)
               
            }).catch((error) => {
                const errorMessage = error.message;
                console.log('error from google', errorMessage);
            });
    }
    return (
        <div>
            this is log in part
            <button  onClick={() => handleSignUp(googleProvider)}  className="btn btn-success px-3">LOG IN </button>
        </div>
    );
};

export default LogIn;