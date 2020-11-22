export default class FormValidator {

    constructor(form) {
      this.form = form;
      this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));
      this.errors = Array.from(this.form.querySelectorAll('.popup__error'));
      this.btnSubmit = this.form.querySelector('.popup__button');
      this.buttonText = this.btnSubmit.textContent;
      this.formValid=this.formValid.bind(this);
      this._hideErrors=this._hideErrors.bind(this);
      this._setEventListeners();
    }

    showLoading(status) {
      if (status) {
        this.btnSubmit.textContent = 'Загрузка...';
      }
      else {
        this.btnSubmit.textContent = this.buttonText;
      }
    }

    get formElement () {
      return this.form;
    }

    set formValues (values) {
      this.form.elements.name.value = values.name;
      this.form.elements.job.value = values.about;
    }

    get formValues () {
      const values = {
        name: this.form.elements.name.value,
        about: this.form.elements.job.value
      }
      return(values);
    }

    _setSubmitButtonState(status) {
      const btn = this.form.querySelector('.popup__button');
      if (status) {
        btn.classList.add('popup__button_enabled');
        btn.disabled = !status;
        }
      else {
        btn.classList.remove('popup__button_enabled');
        btn.disabled = !status;
      }
    }


    _hideErrors() {
        this.errors.forEach( (field) => {field.style.visibility= 'hidden'} );
    }


    _checkInputValidity(showErrors) {
      if (showErrors !== false) showErrors = true;

          //взял готовую функцию проверки на ссылку с StackOverflow, сам в регулярных выражениях не разбираюсь еще
          function validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
              '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
          }

        const error = this.nextElementSibling;
        let result = true;
        if (this.value==='') {
            error.textContent='Это обязательное поле';
            result = false
          }
            else if (this.type === 'text') {
            if ((this.value.length<2) || (this.value.length>30)) {
              error.textContent='Должно быть от 2 до 30 символов';
              result = false}
          }
          else if (this.type === 'url') {
            if (!validURL(this.value)) {
              error.textContent='Здесь должна быть ссылка';
            result = false}
          }
        if (showErrors) {result ? error.style.visibility= 'hidden' : error.style.visibility= 'visible'}
        return result;
    }

    formValid() {
      const status = this.inputs.every( field => this._checkInputValidity.bind(field)(false) );
      this._setSubmitButtonState(status);
    }

    _setEventListeners() {
        this.inputs.forEach( (field) => {field.addEventListener('input', this._checkInputValidity); });
        this.form.addEventListener('input', this.formValid );
    }

    delEventListeners() {
        this.inputs.forEach( (field) => {field.removeEventListener('input', this._checkInputValidity); });
        this.form.removeEventListener('input', this.formValid );
    }

  }
