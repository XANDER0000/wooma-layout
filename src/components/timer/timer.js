class Timer {
  constructor(selector) {
    this.timers = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.timers.forEach((timer) => {
      const dateAttr = timer.getAttribute('data-date');
      if (!dateAttr) return;

      const targetDate = new Date(dateAttr);
      if (Number.isNaN(targetDate.getTime())) return;

      Timer.updateTimer(timer, targetDate);
      setInterval(() => Timer.updateTimer(timer, targetDate), 1000);
    });
  }

  static updateTimer(timer, targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      timer.textContent = 'Время истекло';
      return;
    }

    const timeData = Timer.calculateTime(diff);
    timer.textContent = Timer.formatTime(timeData);
  }

  static calculateTime(remainingTime) {
    let diff = remainingTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;

    const seconds = Math.floor(diff / 1000);

    return {
      days, hours, minutes, seconds,
    };
  }

  static formatTime(timeData) {
    const {
      days, hours, minutes, seconds,
    } = timeData;
    const parts = [];

    if (days > 0) parts.push(`${days}д`);
    if (hours > 0 || parts.length > 0) parts.push(`${hours}ч`);
    if (minutes > 0 || parts.length > 0) parts.push(`${minutes}м`);
    if (seconds > 0 || parts.length > 0) parts.push(`${seconds}с`);

    return parts.join(' : ');
  }
}

// Инициализация таймера через глобальную переменную
window.Timer = Timer;

window.timerInstance = new Timer('[data-date]');
