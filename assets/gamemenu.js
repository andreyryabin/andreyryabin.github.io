let gamemenu = {

    init: '',

    getmenu: function () {
        if (!this.init) {
            let $menu = document.getElementById('gamemenu');
            let ob = document.createElement('div');
            ob.setAttribute('class', 'gamemenu-items');
            $menu.appendChild(ob);
            this.init = ob;
        }

        return this.init;
    },

    clean: function () {
        this.getmenu().innerHTML = '';
        document.body.classList.remove('finish');
    },

    add: function (text, href) {
        let ob;

        if (href) {
            ob = document.createElement('a');

            if (typeof href === 'function') {
                ob.setAttribute('href', '#');
                ob.addEventListener('click', (e) => {
                    e.preventDefault();
                    href();
                });
            } else {
                ob.setAttribute('href', href);
            }


        } else {
            ob = document.createElement('div');
        }

        ob.innerHTML = text;

        ob.setAttribute('class', 'gamemenu-item');

        this.getmenu().appendChild(ob);
        document.body.classList.add('finish');

    }

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
