class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/bringitup.pdf';
  }
  download(url) {
    const element = document.createElement('a');
    element.style.display = 'none';
    element.href = url;
    element.setAttribute('download', 'technical_specification');
    document.body.append(element);

    element.click();
    element.remove();
  }
  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.download(this.path);
      });
    });
  }
}
export default Download;
