class Forms {
  constructor(form) {
    this.form = document.querySelector(form);
    this.path = 'assets/question.php';
    this.messages = {
      fail: 'Oops...',
      success: 'Success!',
    };
  }
  checkMailInputs() {
    const mailInput = this.form.querySelector('[name="email"]');
    mailInput.addEventListener('input', () => {
      mailInput.value = mailInput.value.replace(/[а-яё]/gi, '');
    });
  }
  async postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url} ${res.status} (${res.statusText})`
      );
    }
    return await res.text();
  }
  initMask() {
    function setCursorPosition(pos, elem) {
      elem.setSelectionRange(pos, pos);
      elem.focus();
    }

    function createMask(event) {
      const matrix = '+1 (___) ___-____';
      const def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');
      let i = 0;

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    const input = this.form.querySelector('[name="phone"]');

    if (input) {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
      input.addEventListener('keypress', createMask);
    }
  }
  init() {
    try {
      this.checkMailInputs();
      this.initMask();

      const statusModal = document.createElement('div');
      statusModal.classList.add('status-modal');

      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(this.form);
        document.body.prepend(statusModal);

        this.postData(this.path, formData)
          .then((data) => {
            statusModal.innerHTML = `
           <div class="text-window">
              <p>${this.messages.success}</p>
           </div>
           `;
            console.log(data);
          })
          .catch((e) => {
            statusModal.innerHTML = `
           <div class="text-window">
              <p>${this.messages.fail}</p>
           </div>
           `;
            console.log(e.message);
          })
          .finally(() => {
            this.form.reset();
            setTimeout(() => {
              statusModal.remove();
            }, 3500);
          });
      });
    } catch (e) {}
  }
}
export default Forms;
