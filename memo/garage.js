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

        $slide: '',

        showcount: 1,

        missclick: 0,

        initialize: function () {
            let clientw = parseInt(document.body.clientWidth, 10);
            let clienth = parseInt(document.body.clientHeight, 10);

            this.$slide = document.createElement('div');
            this.$slide.setAttribute('class', 'garageslide');
            document.body.appendChild(this.$slide);

            let tmpimages = shuffle(memoimages);
            this.cards = tmpimages.slice(0, 20);


            this.imagecache(this.cards);

            this.showcount = 1;
            this.shownextcards();

        },

        clickevent: function (name) {

            if (this.opened.indexOf(name) >= 0) {

                this.missclick++;

                if (this.missclick >= 5) {
                    gamemenu.add('Будь внимательней!<br/>Играть еще!', 'index.html')
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
                    return;
                }


                gamemenu.add('Правильно!');

                setTimeout(() => {
                    gamemenu.clean();

                    this.showcount++;
                    this.shownextcards()
                }, 500);

            }


            // let rand = randomint(20, memoimages.length - 1);

            //this.cards.splice(index, 1);
            // this.cards[index] = memoimages[rand];

            // this.cards = shuffle(this.cards);


        },

        shownextcards: function () {
            // this.animation1(() => {

            this.gamearea.innerHTML = '';

            let cards = this.cards.slice(0, this.showcount);
            cards = shuffle(cards);

            for (let index = 0; index < cards.length; index++) {
                this.createcard(cards[index], 200);
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

        animation2: function (callback100) {
            this.$slide.style.opacity = '0';
            this.$slide.style.display = 'block';

            let timeout = 25;
            let opacity = 0;
            let open = 1;

            let interval = setInterval(() => {
                if (open) {
                    opacity += 0.1;
                    if (opacity > 1) {
                        opacity = 1;
                        open = 0;

                        if (callback100) {
                            callback100();
                        }

                    }
                } else {
                    opacity -= 0.1;
                }

                if (opacity < 0) {
                    opacity = 0;
                    clearInterval(interval);
                    this.$slide.style.display = 'none';
                }

                this.$slide.style.opacity = '' + opacity;

            }, timeout);
        },

        animation1: function (callback100) {
            this.$slide.style.width = '0%';
            this.$slide.style.display = 'block';

            let timeout = 25;
            let opacity = 0;
            let open = 1;

            let step = 10;

            let interval = setInterval(() => {
                if (open) {
                    opacity += step;
                    if (opacity > 100) {
                        opacity = 100;
                        open = 0;

                        if (callback100) {
                            callback100();
                        }

                    }
                } else {
                    opacity -= step;
                }

                if (opacity < 0) {
                    opacity = 0;
                    clearInterval(interval);
                    this.$slide.style.display = 'none';
                }

                this.$slide.style.width = opacity + '%';

            }, timeout);
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
    });
})();