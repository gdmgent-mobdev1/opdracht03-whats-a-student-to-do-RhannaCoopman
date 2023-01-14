// eslint-disable-next-line max-len
import {
  signInWithEmailAndPassword,
}
  from 'firebase/auth';

import { onSnapshot, collection, doc } from 'firebase/firestore';

import {
  auth, 
} from '../Lib/firebase-init';

import Card from './Card2';

export default class Login {
  // Velden
  // email : string;
  // password : string;
  // auth : any;

  place : HTMLElement;

  // Constructor
  constructor(
    place : HTMLElement,

  ) {
    this.place = place;
    this.render();
  }

  // Functions
  // Render (make the thing)
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

    loginContainer.addEventListener('submit', (e : Event) => {
      e.preventDefault();
      const formdata = new FormData(e.target);
      const email = formdata.get('email');
      const password = formdata.get('password');

      signInWithEmailAndPassword(auth, email, password).then((cred) => {
        // Whatever you wants to happen after user has logged in

        // Console log users information
        console.log('user logged in:', cred.user);
        const user_id = cred.user.uid;
        sessionStorage.setItem("user_id", user_id);
        sessionStorage.setItem("user_id", user_id);

        // const card = new Card(document.querySelector('#root')!);
        // card.render();

        // const user_id = cred.user.uid;

        // Empty form
        // loginForm.reset();

        // Show next page and hide current
        // document.querySelector('NEXTPAGE').classList.remove('hidden');
        // document.querySelector('CURRENTPAGE').classList.add('hidden');

      })
        .catch((err) => {
          console.log(err.message);
        });
    });
    return loginContainer;
  }

  
}
