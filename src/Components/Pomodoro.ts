export default class PomodoroTimer {
  workTime: number;
  pauseTime: number;
  timeLeft: number;
  div?: HTMLDivElement;
  place: HTMLElement;
  workTimeInput?: HTMLInputElement;
  pauseTimeInput?: HTMLInputElement;
  isPaused : boolean;
  intervalId?: any;
  startButton?: HTMLButtonElement;
  pauseButton?: HTMLButtonElement;
  resumeButton?: HTMLButtonElement;
  stopButton?: HTMLButtonElement;
  workTimeDiv?: HTMLDivElement;
  workTimeLabel?: HTMLLabelElement;
  pauseTimeDiv?: HTMLDivElement;
  pauseTimeLabel?: HTMLLabelElement;
  buttonsDiv?: HTMLDivElement;
  feedbackDiv? : HTMLDivElement;
  feedback? : string;
  timeLeftDiv?: HTMLDivElement;

  openButton!: HTMLButtonElement;
  buttonPlace: HTMLElement;



  constructor(workTime: number, pauseTime: number, buttonPlace: HTMLElement, place : HTMLDivElement) {
    this.workTime = workTime * 60;
    this.pauseTime = pauseTime * 60;
    this.buttonPlace = buttonPlace;
    this.place = place;
    this.timeLeft = this.workTime;
    this.feedback = "Set a timer";
    this.isPaused = true;
    this.renderButton();
  }

  renderButton():void {
    this.openButton = document.createElement('button');
    this.openButton.innerHTML = `Open Pomodoro timer`;


    this.openButton.addEventListener('click', () => {
      let detailContainer : HTMLDivElement = document.querySelector(".detailContainer")!;
      detailContainer.innerHTML = ``;
      this.render();
    })

    this.buttonPlace.appendChild(this.openButton);
  }

  render(): void {
    this.div = document.createElement('div');
    this.place.appendChild(this.div);

    // create time input elements
    this.workTimeDiv = document.createElement('div');
    this.workTimeLabel = document.createElement('label');
    this.workTimeLabel.innerText = 'Work Time:';
    this.workTimeInput = document.createElement('input');
    this.workTimeInput.id = 'work-time-input';
    this.workTimeInput.type = 'number';
    this.workTimeInput.value = this.workTime/60;
    this.workTimeDiv.appendChild(this.workTimeLabel);
    this.workTimeDiv.appendChild(this.workTimeInput);

    this.pauseTimeDiv = document.createElement('div');
    this.pauseTimeLabel = document.createElement('label');
    this.pauseTimeLabel.innerText = 'Pause Time:';
    this.pauseTimeInput = document.createElement('input');
    this.pauseTimeInput.id = 'pause-time-input';
    this.pauseTimeInput.type = 'number';
    this.pauseTimeInput.value = this.pauseTime/60;
    this.pauseTimeDiv.appendChild(this.pauseTimeLabel);
    this.pauseTimeDiv.appendChild(this.pauseTimeInput);

    // create buttons
    this.buttonsDiv = document.createElement('div');
    this.startButton = document.createElement('button');
    this.startButton.id = 'start-button';
    this.startButton.innerText = 'Start';
    this.pauseButton = document.createElement('button');
    this.pauseButton.id = 'pause-button';
    this.pauseButton.innerText = 'Pause';
    this.pauseButton.disabled = true;
    this.resumeButton = document.createElement('button');
    this.resumeButton.id = 'resume-button';
    this.resumeButton.innerText = 'Resume';
    this.resumeButton.disabled = true;
    this.stopButton = document.createElement('button');
    this.stopButton.innerText = 'Stop';
    this.stopButton.disabled = true;
    this.buttonsDiv.appendChild(this.startButton);
    this.buttonsDiv.appendChild(this.pauseButton);
    this.buttonsDiv.appendChild(this.resumeButton);
    this.buttonsDiv.appendChild(this.stopButton);

    // create time left element
    this.timeLeftDiv = document.createElement('div');
    this.timeLeftDiv.id = 'time-left';
    // this.minutesLeft = this.timeLeft/60;
    this.timeLeftDiv.innerText = `${Math.floor(this.timeLeft/60)} minutes left`;

    //create feedbackDiv (Time strted, finished, break, work)
    this.feedbackDiv = document.createElement('div');
    this.feedbackDiv.innerText = "Choose your work and breaktime and press start to start the timer!";
    // append elements to main div
    this.div.appendChild(this.workTimeDiv);
    this.div.appendChild(this.pauseTimeDiv);
    this.div.appendChild(this.buttonsDiv);
    this.div.appendChild(this.timeLeftDiv);
    this.div.appendChild(this.feedbackDiv);

    // // add event listeners
    this.workTimeInput.addEventListener("change", (e) => {
      this.workTime = this.workTimeInput!.value * 60;
    });
    this.pauseTimeInput.addEventListener("change", (e) => {
      this.pauseTime = this.pauseTimeInput!.value * 60;

    });

    this.startButton.addEventListener("click", () => {
      this.start();
    });
    this.pauseButton.addEventListener("click", () => {
      this.pause();
    });
    this.resumeButton.addEventListener("click", () => {
      this.resume();
    });
    this.stopButton.addEventListener("click", () => {
      this.stop();
    });
  }

  start() {
    this.isPaused = false;
    this.startButton?.setAttribute("disabled", "true");
    this.pauseButton?.removeAttribute("disabled");
    this.stopButton?.removeAttribute("disabled");
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.timeLeft--;
        this.timeLeftDiv!.innerHTML = `${Math.floor(this.timeLeft/60)} minutes and ${this.timeLeft%60} seconds left on worktime!`;
        this.feedbackDiv!.innerHTML = `You can do this!`;

        if (this.timeLeft === 0) {
          clearInterval(this.intervalId);
          this.startPause();
        }
      }
    }, 1000);
  }

  startPause() {
    this.timeLeft = this.pauseTime;
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.timeLeft--;
        this.timeLeftDiv!.innerHTML = `${Math.floor(this.timeLeft/60)} minutes and ${this.timeLeft%60} seconds left on breaktime!`;
        this.feedbackDiv!.innerHTML = `Time for a break!`;

        if (this.timeLeft === 0) {
          this.stop();
          this.feedbackDiv!.innerHTML = `Set a new timer to get back to work!`;

        }
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isPaused = true;
    this.timeLeft = this.workTime;
    this.timeLeftDiv!.innerHTML = `${this.timeLeft} seconds left`;
    this.startButton!.removeAttribute("disabled");
    this.pauseButton!.setAttribute("disabled", "true");
    this.resumeButton!.setAttribute("disabled", "true");
    this.stopButton!.setAttribute("disabled", "true");
    this.feedbackDiv!.innerHTML = `You stopped the timer, set a new timer to get back to work!`;

  }

  pause() {
    this.isPaused = true;
    this.pauseButton!.setAttribute("disabled", "true");
    this.resumeButton!.removeAttribute("disabled");
    this.feedbackDiv!.innerHTML = `Press resume to continue!`;

  }

  resume() {
    this.isPaused = false;
    this.pauseButton!.removeAttribute("disabled");
    this.resumeButton!.setAttribute("disabled", "true");
    this.feedbackDiv!.innerHTML = `Keep going!`;

  }
}
