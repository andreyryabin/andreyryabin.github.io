let gamemenu = {

    $el: document.getElementById('gamemenu'),

    clean: function () {
        this.$el.innerHTML = '';
        document.body.classList.remove('finish');
    },

    add: function (text, href) {
        let $el;

        if (href) {
            $el = document.createElement('a');
            $el.setAttribute('href', href);
        } else {
            $el = document.createElement('div');
        }

        $el.innerHTML = text;

        $el.setAttribute('class', 'menutext');

        this.$el.appendChild($el);


        document.body.classList.add('finish');

    }

};