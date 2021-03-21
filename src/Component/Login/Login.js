import React, { useContext, useState } from 'react';
import './Login.css';
import fb from '../Images/facebook.png';
import google from '../Images/google.png';
import './Login.css';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
 }

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn:false,
        name:'',
        email:'',
        photo:'',
        password:''
    });

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, photoURL, email} = res.user;
            const signedInUser ={
                isSignedIn:true,
                name:displayName,
                email:email,
                photo:photoURL
            }
            setUser(signedInUser);

            setLoggedInUser(signedInUser);

            history.replace(from);

            console.log(displayName,photoURL,email);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
    }

    const handleSignOut = () =>{
        firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn:false,
                name: '',
                photo:'',
                email:'',
                error:'',
                success:false
            }
            setUser(signedOutUser)
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const handleBlur = (e) => {

        let isFieldValid = true;

        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid  = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
                
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: name
            })
            .then(function() {
            
            }).catch(function(error) {
            
            });
    }
    
    return (
    <div className="container ">
    
        <div className="d-flex justify-content-center ">   

            {
                user.success ? <h2 style={{color:'green'}}>{user.error}User {newUser ? 'created' : 'Logged in' } successfully</h2> : <h2 style={{color:'red'}}>{user.error}</h2>
            }
            
            <form onSubmit={handleSubmit} className="col-md-4 loginForm">
                <h3>Create an account</h3>

                <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser"/>

                <label htmlFor="newUser">Already have an account?</label> <br/>

                {
                    newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Name"/> 
                }
                <br/> 

                <input type="text" name="email" onBlur={handleBlur} placeholder="Username or Email" required/> 
                
                <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/> 
                <br/> <br/>
                
                {
                    newUser && <input className="createBtn" type="submit" value="Create an account"/> 
                }
                {
                    newUser || <input className="createBtn" type="submit" value="Login"/>
                }
                 <br/> <br/>
        
               

            {/* <button onClick={handleSignIn} className="loginBtn"><img src={fb} alt="" /> Continue with Facebook</button> */}

            {
                user.isSignedIn ? <button onClick={handleSignOut} className="loginBtn"> Sign out</button> : <button onClick={handleSignIn} className="loginBtn"><img src={google} alt=""/> Continue with Google</button>
            }
            {
                user.isSignedIn && <div>
                    <p>Welcome,{user.name}</p>
                    <p>Email,{user.email}</p>
                    <img src={user.photo} alt=""/>
                </div>
            }
            
            </form>

           
        </div>   
    </div>    
    );
};

export default Login;