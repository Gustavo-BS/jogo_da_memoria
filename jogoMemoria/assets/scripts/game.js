let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    fruits: [
        'abacate',
        'abacaxi',
        'cereja',
        'laranja',
        'maca',
        'melancia',
        'morango',
        'pera',
        'pessego',
        'uva'],

    setCard: function (id) {
        let card = this.cards.filter(card => card.id == id)[0];
        console.log(card)
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMat: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    cards: null,

    createCardFromFruits: function () {
        this.cards = [];

        this.fruits.forEach((fruit) => {
            this.cards.push(this.createPairFromFruit(fruit))
        })


        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards();
        // return this.cards
    },

    createPairFromFruit: function (fruit) {
        return [{
            id: this.createIdWithFruit(fruit),
            icon: fruit,
            flipped: false,
        }, {
            id: this.createIdWithFruit(fruit),
            icon: fruit,
            flipped: false,
        }]
    },

    createIdWithFruit: function (fruit) {
        return fruit + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}

