// eslint-disable-next-line max-len
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup
}
  from 'firebase/auth';

import {
  auth, 
} from '../Lib/firebase-init';

import {renderTodos} from '../app';

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
    loginContainer.classList.add('loginContainer');

    loginContainer.innerHTML = `
    <h1>Welkom</h1>
    <p>Welcome to this page</p>
    <form id="loginForm">
    <label>Email<input id="loginInputEmail" type="text" value="email@email.com" name="email"></label>
    <label>Wachtwoord<input id="loginInputPassword" type="password" value="password" name="password"></label>
   
    <input type="submit" id="loginButton" value="Login button!">
    </form>

    <button id="login_github">Login met github</button>

    <button class="toRegistration">Make an account</button>

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
        console.log('user logged in:', cred.user.uid);
        const user_id = cred.user.uid;
        sessionStorage.setItem("user_id", user_id);
        console.log(sessionStorage.getItem('user_id'));


        // const user_id = cred.user.uid;

        // Empty form
        // loginForm.reset();

        // Show next page and hide current

        
      })
        .catch((err) => {
          console.log(err.message);
        });
    });

    // Go from login-screen to registration-screen
    let toRegistration = document.querySelector('.toRegistration');
    // console.log(toRegistration);

    let registrationContainer = document.querySelector('.registerContainer');
    console.log("container: " + registrationContainer);
    toRegistration!.addEventListener('click', (event => {
      event.preventDefault();
      loginContainer.classList.add('hidden');
      registrationContainer!.classList.remove('hidden');
    }))

  //   //login met github
  //   let login_github = document.querySelector('#login_github')!;
  //   const provider = new GithubAuthProvider();

  //   login_github.addEventListener('click', (e) => {
  //     signInWithPopup(auth, provider).then((result) => {
  //   let credential = GithubAuthProvider.credentialFromResult(result);
  //   let token = credential.accessToken;
  //   let user = result.user;

  // }).catch((error) => {
  //   console.log('Er ging iets mis:' + error)
  // })
  //   })

    return loginContainer;
  }

  
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log("user logged in");
    document.querySelector('.projectsContainer')!.classList.remove('hidden');
    document.querySelector('.loginContainer')!.classList.add('hidden');
    document.querySelector('#logout')!.classList.remove('hidden');
    // console.log(sessionStorage.getItem("user_id"));
    renderTodos();

} else {
    // console.log("user logged out");

    document.querySelector('.projectsContainer')!.classList.add('hidden');
    document.querySelector('.loginContainer')!.classList.remove('hidden');
    document.querySelector('#logout')!.classList.add('hidden');
    sessionStorage.setItem("user_id", "");
    // console.log(sessionStorage.getItem("user_id"));
}
});
