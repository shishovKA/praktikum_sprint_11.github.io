export default class Card {

    constructor (cardJSON, showImage, delCardApi, likeApi, dislikeApi) {
        this.text = cardJSON.name;
        this.link = cardJSON.link;
        this.likes = cardJSON.likes.length;
        this._id = cardJSON._id;
        this.myCard = (cardJSON.owner._id == '934c1f3d9d90e132a9efcf5b');
        this.isLiked = !(cardJSON.likes.find(user => user._id == '934c1f3d9d90e132a9efcf5b')==undefined);

        this.element = this._create();
        this._like = this._like.bind(this);
        this._remove = this._remove.bind(this);
        this._openImage = this._openImage.bind(this);
        this.showImage = showImage;
        this.delCardApi = delCardApi;
        this.likeApi = likeApi;
        this.dislikeApi = dislikeApi;

        this._setEventListeners();
    }

    get cardElement () {
        return this.element;
    }

    _create () {
        const card = document.createElement('div');
        card.classList.add('place-card');
        const image = document.createElement('div');
        image.classList.add('place-card__image');
        image.style.backgroundImage = `url(${this.link})`;
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('place-card__delete-icon');

        if (this.myCard) btnDelete.style.display = 'block';

        image.append(btnDelete);
        const description = document.createElement('div');
        description.classList.add('place-card__description');
        const name = document.createElement('h3');
        name.textContent = this.text;
        name.classList.add('place-card__name');
        description.append(name);


        const likeContainer = document.createElement('div');
        likeContainer.classList.add('place-card__like-container');

        const btnLike = document.createElement('button');
        btnLike.classList.add('place-card__like-icon');

        if (this.isLiked) btnLike.classList.add('place-card__like-icon_liked')

        const likeCounter = document.createElement('p');
        likeCounter.classList.add('place-card__like-counter');
        likeCounter.textContent = `${this.likes}`;

        this.likeCounter = likeCounter;

        likeContainer.append(btnLike);
        likeContainer.append(likeCounter);

        description.append(likeContainer);
        card.append(image);
        card.append(description);

        this.btnLike = btnLike;
        this.btnDelete = btnDelete;
        this.image = image;

        return card;
    }


    _like (event) {

        if (this.isLiked) {
            this.dislikeApi(this._id)
                .then((res)=>{
                    event.target.classList.toggle('place-card__like-icon_liked');
                    this.likeCounter.textContent = `${res.likes.length}`;
                    this.isLiked = false;
                    })
            }
        else {
            this.likeApi(this._id)
                .then((res)=>{
                    event.target.classList.toggle('place-card__like-icon_liked');
                    this.likeCounter.textContent = `${res.likes.length}`;
                    this.isLiked = true;
                    })
        }
        
    }

    _remove () {
    if  (window.confirm('Вы действительно хотите удалить карточку?')) {
                this.delCardApi(this._id)
                        .then((res)=>{
                            this._delEventListeners();
                            this.element.remove();
                })
            }
    }

    _openImage (event) {
        if (event.target.classList.contains('place-card__image')) { this.showImage(this.link) }
    }

    _setEventListeners() {
        this.btnLike.addEventListener('click', this._like);
        this.btnDelete.addEventListener('click', this._remove);
        this.image.addEventListener('click', this._openImage);
      }

    _delEventListeners() {
        this.btnLike.removeEventListener('click', this._like);
        this.btnDelete.removeEventListener('click', this._remove);
        this.image.removeEventListener('click', this._openImage);
    }

}
