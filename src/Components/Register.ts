import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../Lib/auth';

export default class Register {
  // Velden
  place : HTMLElement;

  // Constructor
  constructor(
    place : HTMLElement,

  ) {
    this.place = place;
    this.render();
  }

  // Functions
  render() {
    const registerContainer = document.createElement('div');
    registerContainer.classList.add('registerContainer');
    registerContainer.classList.add('hidden');

    registerContainer.innerHTML = `
      <h1>Register</h1>

      <form id="registerForm">
      <label>Naam<input id="registerInputNaam" type="text" value="Naam" name="name"></label>
      <label>Email<input id="registerInputNaam" type="email" value="email@email.com" name="email"></label>
      <label>Password<input id="registerInputPassword" type="password" value="password" name="password"></label>

      <input type="submit" id="registerButton" value="Registeer button!">
      </form>

      <button class="toLogin">Login in</button>
      `;

    this.place.append(registerContainer);

    // Go from login-screen to registration-screen
    let toLogin = document.querySelector('.toLogin');
    let loginContainer = document.querySelector('.loginContainer');

    toLogin!.addEventListener('click', (event => {
      event.preventDefault();
      loginContainer!.classList.add('hidden');
      registerContainer!.classList.remove('hidden');
    }))

    registerContainer.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      // Email and password for logging in
      const formdata = new FormData(e.target);
      const email = formdata.get('email');
      const password = formdata.get('password');

      // Additional info
      const name = formdata.get('name');

      console.log(`email: ${email}, password: ${password}`);

      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {

          // Empty form
          registerContainer.reset();
          let user_id = cred.user.uid;
          sessionStorage.setItem("user_id", user_id);


          // Console log users information
          console.log('user created:', cred.user.uid);

          // Add user to database
          setDoc(doc(db, 'users', cred.user.uid), {
            email,
            id: cred.user.uid,
            naam: name,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    return registerContainer;
  }
}
