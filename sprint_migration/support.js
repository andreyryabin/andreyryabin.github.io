document.addEventListener("DOMContentLoaded", function (e) {
    const info = {
        description: '' +
            'На этой странице можно поддержать улучшения, предложенные пользователями модуля, которые вы хотели бы видеть в обновлениях.' +
            '<br/><br/>' +
            'Предложить свою идею по улучшению можно в <a href="https://t.me/sprint_migration_bitrix">telegram-группе</a> ' +
            'или на странице модуля в <a href="https://marketplace.1c-bitrix.ru/solutions/sprint.migration/#tab-comments-link">маркетплейсе</a><br/>' +
            'Появление вашей идеи в списке ниже означает, что она реализуема, полезна и взята в работу.<br/>' +
            'После завершения сбора она появится в ближайшем обновлении модуля.',
        items: [
            {
                title: "Обновление модуля",
                description: "Поддержать ближайшее обновление модуля",
                content: "<iframe src=\"https://yoomoney.ru/quickpay/fundraise/widget?billNumber=cp8GYgQbfkI.231219&\" width=\"500\" height=\"480\" frameborder=\"0\" allowtransparency=\"true\" scrolling=\"no\"></iframe>"
            }
        ]
    };

    let $el = document.getElementById('support_page');
    if ($el) {
        $el.innerHTML = render(info);
        events($el);
    }


    function render(info) {
        let html = '';

        if (info.description) {
            html += '<div class="sp-support-description">' + info.description + '</div>';
        }

        if (info.items) {
            html += '<div class="sp-support-table">'
            html += '<div class="sp-support-row">'

            html += '<div class="sp-support-col-tabs">'
            info.items.forEach(function (item) {
                html += '<div class="sp-support-link">';
                html += '<strong>' + item.title + '</strong>';
                html += '<div>' + item.description + '</div>';
                html += '</div>';
            });
            html += '</div>'

            html += '<div class="sp-support-col-contents">'
            info.items.forEach(function (item) {
                html += '<div class="sp-support-content">' + item.content + '</div>';
            });
            html += '</div>'

            html += '</div>'
            html += '</div>'
        }

        return html;
    }

    function events($el) {
        let links = $el.getElementsByClassName('sp-support-link');
        let contents = $el.getElementsByClassName('sp-support-content');

        for (let index = 0; index < links.length; index++) {
            links[index].addEventListener('click', function () {
                open_tab(index);
            });
        }

        if (links.length > 0) {
            open_tab(0);
        }

        function open_tab(tabindex) {
            for (let index = 0; index < links.length; index++) {
                if (tabindex === index) {
                    links[index].classList.add('active');
                } else {
                    links[index].classList.remove('active');
                }
            }
            for (let index = 0; index < contents.length; index++) {
                if (tabindex === index) {
                    contents[index].style.display = 'block';
                } else {
                    contents[index].style.display = 'none';
                }
            }
        }
    }


});

