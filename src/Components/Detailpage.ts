import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import {
  db
} from '../Lib/firebase-init';

import { v4 as uuidv4 } from 'uuid';

import {TaskMember} from '../Lib/todoInterface';
import Card from './Card';
import SearchMember from './Search';
import {deleteCardFromFirebase} from "../Lib/firebase-init";


export default class Detailpage {
  place: HTMLElement;

  title?: string;

  description?: string;

  cardArray?: Card[];

  todos?: Array<object>;

  todosDiv!: HTMLDivElement;

  input?: HTMLInputElement ;

  allMembersDiv!: HTMLDivElement;

  memberDiv?: HTMLDivElement;

  todoDiv?: HTMLDivElement;

  members?: Array<object>;

  div?: HTMLDivElement ;

  h1?: HTMLHeadingElement ;

  p?: HTMLParagraphElement ;

  search?: SearchMember;

  button?: HTMLButtonElement ;

  deleteButton?: HTMLButtonElement;

  todoListElement?: HTMLElement ;

  id: string;

  leaderboardDiv?: HTMLDivElement;

  leaderBoardTitle?: HTMLHeadingElement


  constructor(id: string, place: HTMLDivElement) {
    this.id = id;
    this.place = place;
    this.info();

  }

  async addToDo(id: string) {
    if (this.input instanceof HTMLInputElement && this.div instanceof HTMLDivElement) {
      const text = this.input.value;
      const cardId = "todo" + id;
      const newCard = new Card(text, false, this.div, this.id, cardId)
      this.cardArray!.push(newCard); 
      const projectRef = doc(db, "projects", id);

      await updateDoc(projectRef, {
        todos: arrayUnion({todo: text, finished: false, finishedBy: ""})
    });
    }
  }

  createToDoListElement(name : string, description : string): void {
    // Create elements
    this.h1 = document.createElement('h1');
    this.h1.innerText = name;
    this.p = document.createElement('p');
    this.p.innerText = description;
    this.input = document.createElement('input');
    this.input.classList.add('comment');
    this.button = document.createElement('button');
    this.button.innerText = 'Add';
    this.button.classList.add('btn-save');
    this.button.id = 'to-do-list-button';
    this.div = document.createElement('div');
    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-btn')
    this.todoListElement = document.createElement('div');
    this.todoListElement.id = this.id;

    this.leaderboardDiv = document.createElement('div');
    this.leaderBoardTitle = document.createElement('h3');
    this.leaderBoardTitle.innerHTML = "Leaderboard";
    this.leaderboardDiv.append(this.leaderBoardTitle);

    this.search = new SearchMember(this.todoListElement, this.id);

    // Add Event listeners
    this.button.addEventListener('click', () => {
      if ((this.input !== null) && this.input?.value !== '') {
        this.addToDo.call(this, this.id);
        this.input!.value = '';

      }
    });
    this.deleteButton.addEventListener('click', () => {

      deleteCardFromFirebase(this.id);

    });

        // Append elements to the to-do list element
        this.todoListElement.append(this.h1);
        this.todoListElement.append(this.p);
        this.todoListElement.append(this.input);
        this.todoListElement.append(this.button);
        this.todoListElement.append(this.div);
        this.todoListElement.append(this.deleteButton);
        this.todoListElement.append(this.leaderboardDiv);

        this.todoListElement.classList.add('detailpage');
        this.todoListElement.classList.add('popuppage');

        this.todoListElement.append(this.allMembersDiv);
        this.todoListElement.append(this.todosDiv);

        this.place.append(this.todoListElement);


      }

      createTodos(todos : Array<object>): void {
        this.todosDiv = document.createElement('div');
        this.todosDiv.classList.add('todosDiv');
        console.log(todos);
        todos.forEach(element => {
          new Card((element["todo"]), (element["finished"]), this.todosDiv, this.id, uuidv4())

        });
      }
        
      createMembers(members : Array<TaskMember>): void {
        this.allMembersDiv = document.createElement('div');
        members.forEach(member => {
          let memberName:string = member.name;
          let memberStatus:string = member.status;
          
            this.memberDiv = document.createElement('div');
            this.memberDiv.classList.add("memberDiv");
            this.memberDiv.innerHTML = memberName;
      
            switch (memberStatus) {
              case "Done":
                this.memberDiv.classList.add("green");
                break;
              
              case "Started":
                this.memberDiv.classList.add("blue");
                break;
      
              case "Not started":
                this.memberDiv.classList.add("red");
                break;
      
              case "Invited":
                this.memberDiv.classList.add("yellow");
                break;
            
              default:
                this.memberDiv.classList.add("unknown");
                break;
            }
            
            this.allMembersDiv.append(this.memberDiv);
    
        });
      }

  info(): void {
    const q = query(collection(db, "projects"), where("projectId", "==", this.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projects : Object[] = [];
      
      querySnapshot.forEach((doc) => {
          projects.push(doc.data());
          console.log(doc.data().taskMembers);
          let Projectname = doc.data().name;
          let projectDescription = doc.data().description;
          let dueDate = doc.data().dueDate;
          let projectId = doc.data().projectId
          let members = doc.data().taskMembers;
          let todos = doc.data().todos;
          
          this.createToDoListElement(Projectname, projectDescription);
          this.createMembers(members);
          this.createTodos(todos);
    });
  });
};
};