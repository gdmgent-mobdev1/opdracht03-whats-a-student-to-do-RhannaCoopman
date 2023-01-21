/* eslint-disable import/no-cycle */
import { State } from '../Lib';
import { dragstartHandler } from '../Lib/dragAndDrop';
// import { updateTodoFirebase } from '../Lib/firebase-init';
import Comment from './Comment';
import EditableText from './EditableText';
import TodoList from './TodoList';
import {deleteTodoListFirebase} from "../Lib/firebase-init";
import {CheckTodo} from "../Lib/firebase-init";


export default class Card {
  place: HTMLElement;

  todoList ?: TodoList;

  state: State;

  menuContainer?: HTMLElement;

  card?: HTMLDivElement ;

  deleteButton?: HTMLButtonElement ;

  p?: HTMLParagraphElement ;

  menu?: HTMLDivElement ;

  menuTitle?: HTMLDivElement ;

  menuDescription?: HTMLDivElement ;

  commentsInput?: HTMLInputElement ;

  commentsButton?: HTMLButtonElement ;

  menuComments?: HTMLDivElement ;

  checkbox?: HTMLInputElement

  editableDescription?: EditableText ;

  editableTitle?: EditableText;

  parentId: string;

  finished: boolean;

  id: string;

  constructor(text: string, finished: boolean, place: HTMLElement, id: string, cardId: string) {
    this.id = cardId;
    this.parentId = id;
    this.place = place;
    this.finished = finished;

    // this.todoList = todoList;
    this.state = {
      text,
      description: 'Click to write a description...',
      comments: [],
    };
    this.render();
  }

  render(): void {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.setAttribute('draggable', 'true');
    this.card.id = this.id;
    this.card.addEventListener('click', (e) => {
      if (e.target !== this.deleteButton) {
        this.showMenu.call(this);
      }
    });
    this.card.addEventListener('dragstart', dragstartHandler);

    this.p = document.createElement('p');
    this.p.innerText = this.state.text;

    this.deleteButton = document.createElement('button');
    this.deleteButton.innerText = 'X';
    this.deleteButton.addEventListener('click', () => {
      this.deleteCard.call(this);
    });



    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.addEventListener('change', () => {
      CheckTodo(this.parentId, this.state.text);
    });

    if(this.finished === true) {
      this.card?.classList.add('green');
      this.checkbox?.classList.add('hidden');
    } 

    this.card.append(this.p);
    this.card.append(this.deleteButton);
    this.card.append(this.checkbox);

    this.place.append(this.card);
  }

  deleteCard(): void {
    this.card?.remove();
    // const i = this.todoList!.cardArray.indexOf(this);
    // console.log(i);
    // this.todoList!.cardArray.splice(i, 1);
    deleteTodoListFirebase(this.parentId, this.state.text);
  }
  
  showMenu(): void {
    // Create elements
    this.menu = document.createElement('div');
    this.menuContainer = document.createElement('div');
    this.menuTitle = document.createElement('div');
    this.menuDescription = document.createElement('div');
    this.commentsInput = document.createElement('input');
    this.commentsButton = document.createElement('button');
    this.menuComments = document.createElement('div');

    // Add class names
    this.menu.className = 'menu';
    this.menuContainer.className = 'menuContainer';
    this.menuTitle.className = 'menuTitle';
    this.menuDescription.className = 'menuDescription';
    this.menuComments.className = 'menuComments';
    this.commentsInput.className = 'commentsInput comment';
    this.commentsButton.className = 'commentsButton btn-save';

    // Add inner Text
    this.commentsButton.innerText = 'Add';
    this.commentsInput.placeholder = 'Write a comment...';

    // Event listeners
    this.menuContainer.addEventListener('click', (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('menuContainer') && (this.menuContainer != null)) {
        this.menuContainer?.remove();
      }
    });

    this.commentsButton.addEventListener('click', () => {
      if (this.commentsInput?.value !== '' && (this.commentsInput != null)) {
        this.state.comments?.push(this.commentsInput.value);
        this.renderComments();
        this.commentsInput.value = '';
      }
    });

    // Append
    this.menu.append(this.menuTitle);
    this.menu.append(this.menuDescription);
    this.menu.append(this.commentsInput);
    this.menu.append(this.commentsButton);
    this.menu.append(this.menuComments);
    this.menuContainer.append(this.menu);
    (document.querySelector(".projectsContainer")!).append(this.menuContainer);

    this.editableDescription = new EditableText(this.state.description, this.menuDescription, this, "description", 'textarea', "123", this.id);
    this.editableTitle = new EditableText(this.state.text, this.menuTitle, this, 'text', 'input', "234", this.id);

    this.renderComments();
  }

  renderComments(): void {
    if (this.menuComments instanceof HTMLElement && this.menuComments != null) {
      const currentCommentsDOM = Array.from(this.menuComments.childNodes);
      currentCommentsDOM.forEach((commentDOM) => {
        commentDOM.remove();
      });

      this.state.comments?.forEach((comment) => {
        if (this.menuComments instanceof HTMLElement) {
          // eslint-disable-next-line no-new
          new Comment(comment, this.menuComments, this);
        }
      });
    }
  }
}
