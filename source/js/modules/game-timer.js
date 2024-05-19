export default class GameTimer {
  constructor(elementSelector, minutes) {
    this.timerElement = document.querySelector(elementSelector);
    this.maxSessionDuration = minutes * 60;
    this.startTime = null;
    this.requestId = null;
  }

  updateTimer() {
    if (!this.startTime) {
      this.startTime = Math.floor(Date.now() / 1000);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = Math.min(currentTime - this.startTime, this.maxSessionDuration);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    this.timerElement.textContent = `${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;

    if (elapsedTime >= this.maxSessionDuration) {
      this.stop();
    } else {
      this.requestId = requestAnimationFrame(() => this.updateTimer());
    }
  }

  start() {
    this.requestId = requestAnimationFrame(() => this.updateTimer());
  }

  stop() {
    cancelAnimationFrame(this.requestId);
    this.startTime = null;
    this.requestId = null;
  }

  reset() {
    cancelAnimationFrame(this.requestId);
    this.startTime = null;
    this.requestId = null;
    this.timerElement.textContent = `00:00`;
  }
}

