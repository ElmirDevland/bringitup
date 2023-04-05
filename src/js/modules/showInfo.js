class ShowInfo {
  constructor(btn) {
    this.btns = document.querySelectorAll(btn);
  }
  showMessage() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const message = btn.closest('.module__info-show').nextElementSibling;
        message.classList.toggle('show');
        message.classList.toggle('animated');
        message.classList.toggle('fadeIn');
      });
    });
  }
  init() {
    this.showMessage();
  }
}

export default ShowInfo;
