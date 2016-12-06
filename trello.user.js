// ==UserScript==
// @name         TrelloListHider
// @namespace    https://github.com/rsyring/trello-list-hider
// @version      0.1
// @description  Hide (and show) Trello lists
// @match        https://trello.com/b/*/*
// @copyright    2016+, Randy Syring
// ==/UserScript==

/* jshint -W097 */
'use strict';

(function () {
    function start() {
        var closeList = function (list) {
            list.querySelector('.list-cards').style.display = 'none';
        };

        var openList = function (list) {
            list.querySelector('.list-cards').style.display = 'block';
        };

        var lists = document.getElementById('board').querySelectorAll('div.js-list');

        for (var i = 0; i < lists.length; i++) {
            (function () {
                var list    = lists[i];
                var close   = document.createElement('a');

                openList(list);

                close.setAttribute('href', '#');
                close.setAttribute('class', 'close icon-sm dark-hover');

                close.innerHTML             = '&times;';
                close.style.textDecoration  = 'none';
                close.style.position        = 'absolute';
                close.style.left            = '1px';
                close.style.top             = '-5px';

                list.querySelector('.list-header').appendChild(close);

                close.addEventListener('click', function (e) {
                    e.preventDefault();

                    if (close.getAttribute('class').match('close')) {
                        closeList(list);
                        close.setAttribute('class', 'open icon-sm dark-hover');
                        close.innerHTML = 'o';
                    }
                    else {
                        openList(list);
                        close.setAttribute('class', 'close icon-sm dark-hover');
                        close.innerHTML = '&times;';
                    }
                });
            })();
        }
    }

    function checkReady() {
        if (document.getElementById('board')) {
            start();
        } else {
            setTimeout(checkReady, 100);
        }
    }

    setTimeout(checkReady, 100);
})();
