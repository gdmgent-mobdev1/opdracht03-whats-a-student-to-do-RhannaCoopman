// eslint-disable-next-line max-len
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  GithubAuthProvider,
}
from 'firebase/auth';

import {
  auth,
} from '../Lib/firebase-init';

import {
  renderTodos
} from '../app';

import Card from './Card2';

export default class Login {
  place: HTMLElement;

  // Constructor
  constructor(
    place: HTMLElement,

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

    <button class="toRegistration">Registeer</button>

    `;

    this.place.append(loginContainer);

    loginContainer.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const formdata = new FormData(e.target);
      const email = formdata.get('email');
      const password = formdata.get('password');

      signInWithEmailAndPassword(auth, email, password).then((cred) => {

          // Console log users information
          const user_id = cred.user.uid;
          sessionStorage.setItem("user_id", user_id);

          // Empty form
          loginForm.reset();

          // Show next page and hide current

        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    // Go from login-screen to registration-screen
    let toRegistration = document.querySelector('.toRegistration');
    let registrationContainer = document.querySelector('.registerContainer');
    toRegistration!.addEventListener('click', (event => {
      event.preventDefault();
      loginContainer.classList.add('hidden');
      registrationContainer!.classList.remove('hidden');
    }))

    //Login github
    const githubProvider = new GithubAuthProvider();
    const githubButton = document.querySelector('#login_github');
    githubButton?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('github');
      signInWithPopup(auth, githubProvider).then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);

    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;

    sessionStorage.setItem("user_id", user.uid);
    console.log(sessionStorage.getItem("user_id"));
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
    })


    return loginContainer;
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    // console.log('google login');
  }


}

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector('.projectsContainer') !.classList.remove('hidden');
    document.querySelector('.loginContainer') !.classList.add('hidden');
    document.querySelector('#logout') !.classList.remove('hidden');
    renderTodos();

  } else {
    document.querySelector('.projectsContainer') !.classList.add('hidden');
    document.querySelector('.loginContainer') !.classList.remove('hidden');
    document.querySelector('#logout') !.classList.add('hidden');
    sessionStorage.setItem("user_id", "");
  }
});