export default class CardList {

    constructor(container, cards) {
      this.container = container;
      this.cards = cards;
    }

    addCard(card) {
      this.container.append(card.cardElement);
    }

    render() {
        this.cards.forEach((card) => this.addCard(card));
    }

  }
