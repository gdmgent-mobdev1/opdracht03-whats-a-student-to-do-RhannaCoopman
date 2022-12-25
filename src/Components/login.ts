// import {auth, firebaseConfig} from "../Lib/auth";
// import {signInWithEmailAndPassword} from "../Lib/auth";

// import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, getAuth } from "firebase/auth";
import { auth } from "../Lib/auth";

import Card from "./Card";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, getAuth } from "firebase/auth";

export default class Login {
  //Velden
  // email : string;
  // password : string;
  // auth : any;

  place : HTMLElement;

  //Constructor
  constructor(
    place : HTMLElement

    ) {
    this.place = place
    this.render();
  }

  //Functions
    //Render (make the thing)
  render() {

    const loginContainer = document.createElement('div');


    loginContainer.innerHTML = `
    <h1>Welkom</h1>
    <p>Welcome to this page</p>
    <form id="loginForm">
    <label>Email<input id="loginInputEmail" type="text" value="email@email.com" name="email"></label>
    <label>Wachtwoord<input id="loginInputPassword" type="password" value="password" name="password"></label>
   
    <input type="submit" id="loginButton" value="Login button!">
    </form>
    `;

    this.place.append(loginContainer);

    loginContainer.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const formdata = new FormData(e.target);
      let email = formdata.get('email');
      let password = formdata.get('password');

      console.log(email);
      signInWithEmailAndPassword(auth, email, password).then((cred) => {
        //Whatever you wants to happen after user has logged in
  
          // Console log users information
            console.log("user logged in:", cred.user);
            console.log()
            const card = new Card(document.querySelector("#root")!);

  
          // Empty form
            // loginForm.reset();
  
          // Show next page and hide current
            // document.querySelector('NEXTPAGE').classList.remove('hidden');
            // document.querySelector('CURRENTPAGE').classList.add('hidden');
      })
      .catch((err) => {
        console.log(err.message);
      });;
    })
    return loginContainer;
  }

}