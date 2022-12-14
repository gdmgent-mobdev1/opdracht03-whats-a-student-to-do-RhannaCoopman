import {auth, db} from "../Lib/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


export default class Register {
  //Velden
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
      const registerContainer = document.createElement('div');
  
      registerContainer.innerHTML = `
      <h1>Register</h1>

      <form id="registerForm">
      <label>Naam<input id="registerInputNaam" type="text" value="Naam" name="name"></label>
      <label>Email<input id="registerInputNaam" type="email" value="email@email.com" name="email"></label>
      <label>Password<input id="registerInputPassword" type="password" value="password" name="password"></label>

      <input type="submit" id="registerButton" value="Registeer button!">
      </form>
      `;

  
      this.place.append(registerContainer);
  
      registerContainer.addEventListener("submit", (e: Event) => {
        e.preventDefault();
      
        //Email and password for logging in
        const formdata = new FormData(e.target);
        let email = formdata.get('email');
        let password = formdata.get('password');
      
        // Additional info
        let name = formdata.get('name');
      
        console.log('email: ' + email + ', password: ' + password);

        createUserWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            //Whatever you wants to happen after user is created
        
              // Empty form
                // registerContainer.reset();
      
              // Console log users information
                console.log("user created:", cred.user.uid);
      
              // Add user to database
                setDoc(doc(db, "users", cred.user.uid), {
                  email: email,
                  id: cred.user.uid,
                  naam: name,
                })
      
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
      return registerContainer;
    }
}