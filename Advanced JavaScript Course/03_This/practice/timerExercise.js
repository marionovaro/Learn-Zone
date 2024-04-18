class Timer {
  constructor() {
    this.tick = 0;
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      this.tick++
      console.log(this.tick)
      this.tick == 5 && this.stop()
    }, 1000);
  }
  
  stop() {
      clearInterval(this.timerId)
  }
}

const tiempo = new Timer()
tiempo.start()