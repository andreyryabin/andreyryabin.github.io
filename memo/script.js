(function () {

    let move_event = 'mousemove';
    let up_event = 'mouseup';
    let down_event = 'mousedown';
    let click_event = 'click';

    if ("ontouchstart" in window) {
        move_event = 'touchmove';
        up_event = 'touchend';
        down_event = 'touchstart';
        click_event = 'click';
    }

    let game = {
        cards: [],
        opened: [],

        intervalclose: 2500,
        timerclose: 0,

        gamearea: document.getElementById('gamearea'),

        hintclicks: 0,
        lockcnt: 0,

        initialize: function () {
            let clientw = parseInt(document.body.clientWidth, 10);
            let clienth = parseInt(document.body.clientHeight, 10);

            let cardInRow = 6;
            if (clientw < 1024) {
                cardInRow = 4;
            }

            let cardSize = ((clientw - 40) - (cardInRow * 20)) / cardInRow;
            let cardInCol = (clienth - 40) / (cardSize + 20);
            let cardsCount = Math.floor(cardInCol) * cardInRow;

            this.createcards(cardsCount, cardSize);
        },

        createcard: function (name, index, cardSize) {
            let $el = document.createElement('div');
            $el.setAttribute('class', 'card');
            $el.style.width = cardSize + 'px';
            $el.style.height = cardSize + 'px';

            $el.innerHTML = '<div class="front">' +
                '<div class="number">' + (index + 1) + '</div>' +
                '</div>' +
                '<div class="back"><img alt="pic' + index + '" src="' + name + '"/></div>';

            $el.addEventListener(click_event, (e) => {
                this.clickevent(index);
            });

            this.gamearea.appendChild($el);
            return $el;
        },

        createcards: function (cardsCount, cardSize) {
            clearTimeout(this.timerclose);

            this.gamearea.innerHTML = '';

            this.cards = [];
            this.opened = [];

            let sliceVal = cardsCount / 2;

            let tmpimages = shuffle(assets_cars);
            tmpimages = tmpimages.slice(0, sliceVal);

            let tmpcards = [];
            for (let index = 0; index < tmpimages.length; index++) {
                tmpcards.push(tmpimages[index]);
                tmpcards.push(tmpimages[index]);
            }

            tmpcards = shuffle(tmpcards);

            for (let index = 0; index < tmpcards.length; index++) {
                let $el = this.createcard(tmpcards[index], index, cardSize);
                this.cards.push({
                    'name': tmpcards[index],
                    '$el': $el,
                    'lock': 0,
                })
            }
        },

        clickevent: function (index) {
            let card = this.cards[index];

            if (card.lock) {
                return;
            }

            if (this.opened.length <= 0) {
                this.opencard(index);

                this.timerclose = setTimeout(() => {
                    this.closecards()
                }, this.intervalclose);

                return;

            }

            if (this.opened.length === 1) {
                this.hintclicks++;

                let firstindex = this.opened[0];
                let firstcard = this.cards[firstindex];

                if (firstindex === index) {
                    return;
                }

                clearTimeout(this.timerclose);

                this.opencard(index);

                if (firstcard.name === card.name) {
                    firstcard.lock = 1;
                    card.lock = 1;

                    this.lockcnt += 2;
                    this.hintclicks = 0;
                }

                if (this.lockcnt === this.cards.length) {
                    clearTimeout(this.timerclose);

                    setTimeout(() => {
                        gamemenu.add('Молодец!<br/>Играть еще!', 'index.html')
                        gamemenu.add('Другие игры', '/')
                    }, 500);

                    return;
                }


                this.timerclose = setTimeout(() => {
                    this.closecards()
                }, this.intervalclose);

                return;
            }

            if (this.opened.length === 2) {
                this.hintclicks++;

                clearTimeout(this.timerclose);
                this.closecards();

                this.opencard(index);

                this.timerclose = setTimeout(() => {
                    this.closecards()
                }, this.intervalclose);

                return;
            }

        },


        showhint: function () {
            let cname = '';
            for (let index = 0; index < this.cards.length; index++) {
                if (!cname && !this.cards[index].lock) {
                    cname = this.cards[index].name;
                }

                if (cname && cname === this.cards[index].name) {
                    this.cards[index].$el.classList.add('hint');
                }
            }
        },

        closecards: function () {
            this.opened = [];

            for (let index = 0; index < this.cards.length; index++) {
                if (!this.cards[index].lock) {
                    this.cards[index].$el.classList.remove('flip');
                }
            }

            if (this.hintclicks > 4) {
                this.hintclicks = 0;
                this.showhint();
            }
        },

        opencards: function () {
            for (let index = 0; index < this.cards.length; index++) {
                this.cards[index].$el.classList.add('flip');
            }
        },

        opencard: function (index) {
            this.opened.push(index);
            this.cards[index].$el.classList.add('flip');
        },


    };


    document.addEventListener('DOMContentLoaded', function () {
        game.initialize();

        // window.addEventListener('resize', function (event) {
        //     game.initialize(1);
        // });

    });
})();


