export class CAControlPanel {
  constructor(main) {
    this.main = main;

    this.btnPreviousStep = document.querySelector('.btn-previous-step');
    this.btnPlayPause = document.querySelector('.btn-play-pause');
    this.btnNextStep = document.querySelector('.btn-next-step');
    this.btnReset = document.querySelector('.btn-reset');
    this.rangeDelay = document.querySelector('.range-delay');

    this.btnPreviousStep.addEventListener('click', this);
    this.btnPlayPause.addEventListener('click', this);
    this.btnNextStep.addEventListener('click', this);
    this.btnReset.addEventListener('click', this);
    this.rangeDelay.addEventListener('change', this);
  }

  handleEvent(event) {
    //console.log(event);
    if (event.target.classList.contains('btn-previous-step')) {
      console.log(event.target);
    }
    else if (event.target.classList.contains('btn-play-pause')) {
      if (!this.main.timerStatus) {
        this.main.startTimer(this.main.delay);
      }
      else if (this.main.timerStatus) {
        this.main.stopTimer();
      }
    }
    else if (event.target.classList.contains('btn-next-step')) {
      //console.log(event.target);
      this.main.nextStep();
    }
    else if (event.target.classList.contains('btn-reset')) {
      console.log(event.target);
    }
    else if (event.target.classList.contains('range-delay')) {
      //console.log(this.rangeDelay.value);
      this.main.delay = this.rangeDelay.value;
      this.main.stopTimer();
      this.main.startTimer(this.main.delay);

    }
  }


}