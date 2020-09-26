import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../../firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useState({
        newUser: true,
        firstName: '',
        email: '',
        password:'',
        confirmPassword: '',
        passwordMatch: false,
        error: '',
    })
    // input field update
    const handleInputField = (e) =>{
        if(e.target.name === 'email'){
            const isEmailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/.test(e.target.value)
            if(isEmailValid){
                const newUser = {...user};
                newUser.email = e.target.value;
                setUser(newUser);
            } else {
                const newUser = {...user}
                newUser.error = 'Please input a valid email';
                setUser(newUser);
            }
        }
        if(e.target.name === 'firstName' || e.target.name === 'lastName'){
            const newUser = {...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
            const userInfo = {...loggedInUser};
            userInfo[e.target.name] = e.target.value;
            setLoggedInUser(userInfo);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length >= 6;
            if(isPasswordValid){
                const newUser = {...user};
                newUser.password = e.target.value;
                setUser(newUser);
            } else {
                const newUser = {...user}
                newUser.error = 'Password must be 6 character long';
                setUser(newUser);
            }
        }
        if(e.target.name === 'confirmPassword'){
            if(user.password === e.target.value){
                const newUser = {...user};
                newUser.passwordMatch = true;
                newUser.error = '';
                setUser(newUser)
            }else{
                const newUser = {...user};
                newUser.error = "Password didn't match";
                setUser(newUser);
            }            
        }
    }
    // sign In with email and password
    const signIn = (e) => {
       if(user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                const userInfo = {...loggedInUser};
                userInfo.isLogged = true;
                setLoggedInUser(userInfo);
                history.replace(from);
            })
            .catch(error =>{
                const newUser = {...user}
                newUser.error = error.message;
                setUser(newUser);
            })
       }

        e.preventDefault() ;
    }
    //sign up with email and password
    const signUp = (e) => {
        if(user.email && user.password && user.passwordMatch && user.firstName && user.lastName){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                const userInfo = {...loggedInUser};
                userInfo.isLogged = true;
                setLoggedInUser(userInfo);
                history.replace(from);
            })
            .catch(error =>{
                const newUser = {...user}
                newUser.error = error.message;
                setUser(newUser);
            })
        }
        e.preventDefault();
    }
    
    const toggleCondition = (e) => {
        if(user.newUser){
            const userInfo = {...user};
            userInfo.newUser = false;
            setUser(userInfo);
        } else {
            const userInfo = {...user};
            userInfo.newUser = true;
            setUser(userInfo);
        }
        e.preventDefault();
    }
    // sign in with google
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleSignIn = () =>{
        firebase.auth().signInWithPopup(googleProvider)
        .then(res =>{
            const userInfo = {...loggedInUser};
            userInfo.isLogged = true;
            setLoggedInUser(userInfo);
            history.replace(from);
        })
        .catch(error =>{
            const newUser = {...user}
            newUser.error = error.message;
            setUser(newUser);
        })
    }

    //sign in with facebook
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    const facebookSignIn = () =>{
        firebase.auth().signInWithPopup(facebookProvider)
        .then(res =>{
            const userInfo = {...loggedInUser};
            userInfo.isLogged = true;
            setLoggedInUser(userInfo);
            history.replace(from);
        })
        .catch(error =>{
            const newUser = {...user}
                newUser.error = error.message;
                setUser(newUser);
        })
    }
    return (
        <div className="travel-form-control">
            <form className = 'travel-form'>
               {
                   user.newUser ?  
                   <h4 className = 'text-center'>Create New Account</h4> :
                   <h4 className = 'text-center'>Log In</h4> 
               }
                {
                    user.newUser && <div>
                        <input type="text" name="firstName" onBlur = {handleInputField} placeholder= 'first name' required/>
                        <input type="text" name="lastName" onBlur = {handleInputField} placeholder= 'last name' required/>
                    </div>
                }
                <input type="text" name="email" placeholder= 'username or email' onBlur = {handleInputField} required/>
                <input type="password" name="password" placeholder= 'password' onBlur = {handleInputField} required/>
                {
                   user.newUser && <input type="password" name="confirmPassword" onBlur = {handleInputField} placeholder= 'confirm password' required/>
                }
                <br/>
                <br/>
                {
                   user.newUser ? 
                   <Button type = 'submit' onClick = {signUp} variant = 'warning' >Sign Up</Button> :
                   <Button type = 'submit' onClick = {signIn} variant = 'warning' >Sign In</Button>
               }
                <div className = 'text-center'>
              
               <p className="text-center text-danger"> {user.error} </p>
               <p className = 'text-center text-danger'>Please fill out all the field Correctly</p>
               
                </div>
            </form>
                    <div className = 'd-flex justify-content-center align-items-center '>
                        <div  onClick = {googleSignIn} className = 'd-flex justify-content-center align-items-center googleSignIn'>
                            <img src="https://i.imgur.com/Aphbf8t.png" alt=""/>
                            <p>Sign In With Google</p>
                        </div>
                    </div>
                    <div className = 'd-flex justify-content-center align-items-center '>
                        <div onClick = {facebookSignIn} className = 'd-flex justify-content-center align-items-center googleSignIn'>
                            <img src="https://i.imgur.com/4gTdNMl.png" alt=""/>
                            <p>Sign In With facebook</p>
                        </div>
                    </div>
        </div>
    );
};

export default Login;