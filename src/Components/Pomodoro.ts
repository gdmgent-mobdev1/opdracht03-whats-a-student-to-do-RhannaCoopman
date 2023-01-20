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
  timeLeftDiv?: HTMLDivElement;
  minutesLeft: string | number;


  constructor(workTime: number = 25, pauseTime: number = 5, place : HTMLDivElement) {
    this.workTime = workTime;
    this.pauseTime = pauseTime;
    this.place = place;
    this.timeLeft = this.workTime;
    this.isPaused = true;
    this.render();
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
    this.workTimeInput.value = this.workTime;
    this.workTimeDiv.appendChild(this.workTimeLabel);
    this.workTimeDiv.appendChild(this.workTimeInput);

    this.pauseTimeDiv = document.createElement('div');
    this.pauseTimeLabel = document.createElement('label');
    this.pauseTimeLabel.innerText = 'Pause Time:';
    this.pauseTimeInput = document.createElement('input');
    this.pauseTimeInput.id = 'pause-time-input';
    this.pauseTimeInput.type = 'number';
    this.pauseTimeInput.value = this.pauseTime;
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
    this.minutesLeft = this.timeLeft / 60;
    this.timeLeftDiv.innerText = `${this.minutesLeft} seconds left`;

    // append elements to main div
    this.div.appendChild(this.workTimeDiv);
    this.div.appendChild(this.pauseTimeDiv);
    this.div.appendChild(this.buttonsDiv);
    this.div.appendChild(this.timeLeftDiv);

    // // add event listeners
    this.workTimeInput.addEventListener("change", (e) => {
      this.workTime = this.workTimeInput!.value * 60;
      console.log(this.workTime);
      // console.log(this.timeLeft * 60);
    });
    // this.pauseTimeInput.addEventListener("change", (e) => {
    //   this.pauseTime(e.target.value);
    // });
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
        this.timeLeftDiv!.innerHTML = `${this.timeLeft} seconds left`;
        if (this.timeLeft === 0) {
          this.stop();
          console.log('Work time ended, take a break!');
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
  }

  pause() {
    this.isPaused = true;
    this.pauseButton!.setAttribute("disabled", "true");
    this.resumeButton!.removeAttribute("disabled");
  }

  resume() {
    this.isPaused = false;
    this.pauseButton!.removeAttribute("disabled");
    this.resumeButton!.setAttribute("disabled", "true");
  }
}
