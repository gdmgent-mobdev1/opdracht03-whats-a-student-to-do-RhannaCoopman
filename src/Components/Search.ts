/* eslint-disable import/no-cycle */

import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";

import {
  db
} from '../Lib/firebase-init';

export default class SearchMember {
  nameElement!: HTMLHeadingElement;

  name !: string;

  descriptionElement !: HTMLParagraphElement;

  description !: string;

  dueDateElement !: HTMLParagraphElement;

  dueDate !: string;

  allMembersDiv !: HTMLDivElement;

  memberDiv !: HTMLDivElement;

  member !: string;

  aDiv !: HTMLDivElement;

  NewMemberForm !: HTMLFormElement;

  NewMemberInput !: HTMLInputElement;

  NewMemberButton !: HTMLInputElement;

  memberName !: string;

  Input ! : HTMLInputElement;

  memberInfoDiv !: HTMLDivElement;

  card ! : HTMLDivElement;

  place: HTMLElement;

  id:string;

  div !: HTMLFormElement;

  constructor(place: HTMLElement, id : string) {
    this.place = place;
    this.id = id;

    this.getAllUsers();
  }

  render () {

      //add new member
      this.NewMemberForm = document.createElement('form');
      this.NewMemberForm.classList.add("memberDiv");
      this.NewMemberForm.classList.add("unknown");

      this.NewMemberInput = document.createElement('input');
      this.NewMemberInput.setAttribute('type', 'text');
      this.NewMemberInput.classList.add("addMember");


      this.NewMemberButton = document.createElement('input');
      this.NewMemberButton.setAttribute('type', 'submit');
      this.NewMemberButton.setAttribute('value', '+');
      this.NewMemberButton.classList.add("addMember");

      this.aDiv = document.createElement('div');
      this.aDiv.innerText = 'A';

      this.NewMemberForm.append(this.NewMemberInput);
      this.NewMemberForm.append(this.NewMemberButton);
      this.NewMemberForm.append(this.aDiv);

      this.place.append(this.NewMemberForm);
  }

  getAllUsers() {
    const filterFunction = () => {
      const input = document.getElementById("myInput");
      // console.log(input);
      const filter = input!.value.toUpperCase();
      // console.log(filter);
      const div = document.getElementById("searchDiv");
      let a = div!.getElementsByTagName("a");
      for (let i = 0; i < a.length; i++) {
        

        // let valid = 0;
        let txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
          
        } else {
          a[i].style.display = "none";

        }
        // console.log(valid);
        // if(valid > 1) {
        //   this.NewMemberButton.setAttribute('value', 'geen overeenkomsten');
        //   this.NewMemberButton.setAttribute('isDisabled', 'true');

        // }
        // else {
        //   this.NewMemberButton.setAttribute('value', '');
        //   this.NewMemberButton.setAttribute('isDisabled', 'false');
        // }
      }
    }

    this.div = document.createElement('form');
    this.div.classList.add("card");
    this.div.classList.add("unknown");
    this.div.setAttribute('id', 'searchDiv');

    this.place.append(this.div);
    const id = this.place.id;

    this.NewMemberButton = document.createElement('input');
    this.NewMemberButton.setAttribute('type', 'submit');
    this.NewMemberButton.setAttribute('value', '');
    this.NewMemberButton.classList.add("addMember");
    this.NewMemberButton.setAttribute('isDisabled', 'true');
    this.div.append(this.NewMemberButton);

    this.NewMemberButton.addEventListener('click', (e) => {
      e.preventDefault();
      let memberId = this.NewMemberButton.id;
      let memberName = this.NewMemberButton.name;
        async function database() {
          const projectRef = await doc(db, "projects", id);

          updateDoc(projectRef, {
            invitedMembers: arrayUnion(memberId),

            taskMembers: arrayUnion({id: memberId, status: "Invited", name: memberName}),
          });
    }
    database();
    });

    this.Input = document.createElement('input');
    this.Input.setAttribute('type', 'text');
    this.Input.setAttribute('name', 'input');
    this.Input.setAttribute('placeholder', 'search...');
    this.Input.setAttribute('id', 'myInput');
    this.Input.classList.add("addMember");
    this.div.append(this.Input);

    this.Input.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.memberInfoDiv.classList.remove('hidden');
      filterFunction();
    })


    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((docc) => {
        const memberInfo = `${docc.data().naam}  -  ${docc.data().email}  -  ${docc.data().id}`;
        const memberName = docc.data().naam;
        const memberId = docc.data().id;


        this.memberInfoDiv = document.createElement('a')
        this.memberInfoDiv.innerText = memberInfo;
        // this.memberInfoDiv.style.display = 'none';
        this.div.append(this.memberInfoDiv);

        this.memberInfoDiv.addEventListener('click', () => {
          this.NewMemberButton.setAttribute('value', `Add ${memberName} to the project`);
          this.NewMemberButton.setAttribute('id', memberId);
          this.NewMemberButton.setAttribute('name', memberName);

          this.NewMemberButton.setAttribute('isDisabled', 'false');
        })

      })
    }
    getUsers();


  }
}