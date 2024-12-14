class TargetManager {
  constructor(triggerSelector, targetSelector, activeClass = 'active') {
    this.triggers = document.querySelectorAll(triggerSelector);
    this.targets = document.querySelectorAll(targetSelector);
    this.activeClass = activeClass;

    this.init();
  }

  init() {
    // Добавляем обработчики событий для всех триггеров
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => this.handleTriggerClick(trigger));
    });
  }

  handleTriggerClick(trigger) {
    const targetId = trigger.dataset.target; // Получаем id целевого элемента
    if (!targetId) return;

    const target = [...this.targets].find((t) => t.id === targetId);

    if (target) {
      // Убираем активный класс у всех других targets, если нужно
      this.targets.forEach((t) => t.classList.remove(this.activeClass));
      target.classList.add(this.activeClass);

      this.triggers.forEach((t) => t.classList.remove(this.activeClass));// Добавляем активный класс
      trigger.classList.add(this.activeClass);
      // if (target.classList.contains(this.activeClass)) {
      //   target.classList.remove(this.activeClass); // Убираем активный класс
      // } else {
      //   // Убираем активный класс у всех других targets, если нужно
      //   this.targets.forEach((t) => t.classList.remove(this.activeClass));

      //   target.classList.add(this.activeClass); // Добавляем активный класс
      // }
    }
  }
}
window.targetManager = TargetManager;
window.targetManager = new TargetManager('.target-trigger', '.target');
