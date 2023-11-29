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

        $el: document.getElementById('gamearea'),

        lastIndex: 0,

        initialize: function () {
            let clientw = parseInt(document.body.clientWidth, 10);
            let clienth = parseInt(document.body.clientHeight, 10);

            let cardSize = 100;

            let rowCnt = 3;
            let colCnt = 3;

            this.createcards(rowCnt, colCnt, cardSize);
        },


        createcards: function (rowCnt, colCnt, cardSize) {
            this.gamearea.innerHTML = '';
            this.lastIndex = 0;
            this.cards = [];

            let tmpcards = [];
            for (let index = 0; index < rowCnt * colCnt; index++) {
                tmpcards.push(index + 1);
            }

            tmpcards = shuffle(tmpcards);


            let cardindex = 0;

            for (let rowindex = 0; rowindex < rowCnt; rowindex++) {

                let $row = document.createElement('div');
                $row.setAttribute('class', 'row');

                for (let colindex = 0; colindex < colCnt; colindex++) {
                    let $col = document.createElement('div');
                    $col.setAttribute('class', 'cell');


                    let $el = this.createcard(tmpcards[cardindex], cardSize);
                    this.cards.push({
                        'name': tmpcards[cardindex],
                        '$el': $el,
                    })
                    cardindex++;

                    $col.appendChild($el);
                    $row.appendChild($col);
                }

                this.gamearea.appendChild($row);

            }
        },


        createcard: function (name, cardSize) {
            let $el = document.createElement('div');
            $el.setAttribute('class', 'card');
            $el.style.width = cardSize + 'px';
            $el.style.height = cardSize + 'px';

            $el.innerHTML = name;

            $el.addEventListener(click_event, (e) => {
                this.clickevent(name);
            });

            return $el;
        },

        clickevent: function (name) {
            let index = name - 1

            if (index === this.lastIndex) {
                gamemenu.add('Правильно!');

                setTimeout(() => {
                    gamemenu.clean();
                }, 500);

                this.lastIndex++;
            }

            if (this.lastIndex === this.cards.length) {
                setTimeout(() => {
                    gamemenu.add('Молодец!<br/>Играть еще!', 'index.html')
                    gamemenu.add('Другие игры', '/')
                }, 500);
            }
        }

    };

    document.addEventListener('DOMContentLoaded', function () {
        game.initialize();
    });
})();
