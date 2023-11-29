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

        gamearea: document.getElementById('gamearea'),

        $el: document.getElementById('gamearea'),

        showcount: 1,

        missclick: 0,

        cardsize: 0,

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

            this.cardsize = cardSize;

            let tmpimages = shuffle(assets_cars);
            this.cards = tmpimages.slice(0, cardsCount);


            this.imagecache(this.cards);

            this.showcount = 1;
            this.shownextcards();
        },

        clickevent: function (name) {

            if (this.opened.indexOf(name) >= 0) {

                this.missclick++;

                if (this.missclick >= 5) {
                    gamemenu.add('Будь внимательней!<br/>Играть еще!', 'index.html')
                    gamemenu.add('Другие игры', '/')
                    return;

                }

                gamemenu.add('нет');

                setTimeout(() => {
                    gamemenu.clean();

                    this.shownextcards()
                }, 500);


            } else {

                this.missclick = 0;
                this.opened.push(name);

                if (this.opened.length === this.cards.length) {
                    gamemenu.add('Молодец!<br/>Играть еще!', 'index.html')
                    gamemenu.add('Другие игры', '/')
                    return;
                }


                gamemenu.add('Правильно!');

                setTimeout(() => {
                    gamemenu.clean();

                    this.showcount++;
                    this.shownextcards()
                }, 500);

            }


        },

        shownextcards: function () {
            // this.animation1(() => {

            this.gamearea.innerHTML = '';

            let cards = this.cards.slice(0, this.showcount);
            cards = shuffle(cards);

            for (let index = 0; index < cards.length; index++) {
                this.createcard(cards[index], this.cardsize);
            }
            // });
        },

        imagecache: function (images) {
            let $cache = document.getElementById('imagecache');

            for (let index = 0; index < images.length; index++) {

                let $img = document.createElement('img');
                $img.setAttribute('src', images[index]);
                $cache.appendChild($img);
            }
        },

        createcard: function (name, cardSize) {
            let $el = document.createElement('div');
            $el.setAttribute('class', 'card');
            $el.style.width = cardSize + 'px';
            $el.style.height = cardSize + 'px';

            $el.innerHTML = '<img alt="pic" src="' + name + '"/>';

            $el.addEventListener(click_event, (e) => {
                this.clickevent(name);
            });

            this.gamearea.appendChild($el);
            return $el;
        },
    };

    document.addEventListener('DOMContentLoaded', function () {
        game.initialize();
    });
})();
