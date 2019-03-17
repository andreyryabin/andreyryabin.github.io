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

        gamearea: document.getElementById('gamearea'),

        initialize: function () {
            let clientw = parseInt(document.body.clientWidth, 10);
            let clienth = parseInt(document.body.clientHeight, 10);

            let cardInRow = 8;
            if (clientw < 1024) {
                cardInRow = 6;
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

            let tmpimages = shuffle(memoimages);
            tmpimages = tmpimages.slice(0, cardsCount);

            let tmpcards = [];
            for (let index = 0; index < tmpimages.length; index++) {
                tmpcards.push(tmpimages[index]);
            }

            this.cards = [];

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


        },


        closecards: function () {
            for (let index = 0; index < this.cards.length; index++) {
                if (!this.cards[index].lock) {
                    this.cards[index].$el.classList.remove('flip');
                }
            }
        },

        opencards: function () {
            for (let index = 0; index < this.cards.length; index++) {
                this.cards[index].$el.classList.add('flip');
            }
        },

        opencard: function (index) {
            this.cards[index].$el.classList.add('flip');
        },


    };


    function randomint(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    document.addEventListener('DOMContentLoaded', function () {
        game.initialize();

        // window.addEventListener('resize', function (event) {
        //     game.initialize(1);
        // });

    });
})();