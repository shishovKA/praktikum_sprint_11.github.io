export default class Popup {

    constructor (container) {
        this.container = container;
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this._create = this._create.bind(this);
    }

    get popupElement() {
        return this.element;
    }

    get popupForm() {
        return this.element.querySelector('.popup__form');
    }

    get isOpen() {
        return this.element.classList.contains('popup_is-opened')
    }

    createInput(inputOptions) {
        const  {className,type,name,placeHolder} = inputOptions;
        const input = document.createElement('input');
            input.classList.add(className);
            input.type = type;
            input.name = name;
            input.placeholder = placeHolder;
        return input;
    }


    _create() {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        const __content = document.createElement('div');
        const __close = document.createElement('div');
        __close.classList.add('popup__close');
        __content.append(__close);
        popup.append(__content);

        this.content = __content;
        this.btnClose = __close;
        this.element = popup;
    }


    open() {
        this._create();
        this.container.append(this.element);
        this.element.classList.add('popup_is-opened');
        this._setEventListeners();
    }

    close() {
        this._delEventListeners();
        this.element.classList.remove('popup_is-opened');
        this.element.remove();
    }

    _setEventListeners() {
        this.btnClose.addEventListener('click', this.close);
    }

    _delEventListeners() {
        this.btnClose.removeEventListener('click', this.close);
    }


}
