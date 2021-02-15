(function (window, document){
    'use strict';
    let karo = 4;
    let sero = 3;
    let color = ['#FF2D00','#FF2D00', '#FF8600', '#FF8600', '#00EC3D', '#00EC3D', '#FFF100', '#FFF100', '#FAF9F9', '#FAF9F9', '#8456F8', '#8456F8'];
    let color_sub = color.slice();
    let back_color = [];
    let click_flag = true;
    let count_card = [];
    let complete_card = [];
    let start_time;
    let total_time;
    function shupple (){
        for (let i = 0; color.length > 0; i += 1) {
            back_color = back_color.concat(color.splice(Math.floor(Math.random()* color.length), 1));
        }
    }
    
    console.log(back_color);
    function card_setting(karo, sero) {
        click_flag = false;
        let container = document.querySelector('.containers');
        for (let i = 0; i < karo * sero; i += 1) {
            let card = document.createElement('div');
            card.className = 'card';
            let cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            let cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            let cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.style.backgroundColor = back_color[i];
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            (function (c){
                card.addEventListener('click', function(){
                    if(click_flag && !complete_card.includes(c)){
                        c.classList.toggle('flipped');
                        count_card.push(c);
                        if (count_card.length == 2) {
                           if (count_card[0].querySelector('.card-back').style.backgroundColor === count_card[1].querySelector('.card-back').style.backgroundColor) {
                                complete_card.push(count_card[0]);
                                complete_card.push(count_card[1]);
                                count_card = [];
                                setTimeout(function () {
                                    if (complete_card.length === 12) {
                                        let compl_time = new Date();
                                        total_time = (compl_time - start_time) / 1000;
                                        alert('성공!' + total_time + '초 걸렸습니다!');
                                        container.innerHTML = '';
                                        color = color_sub.slice();
                                        back_color = [];
                                        complete_card = [];
                                        start_time = null;
                                        shupple();
                                        card_setting(karo, sero);
                                    }
                                }, 1000);                 
                           }
                           else {
                               click_flag = false;
                                setTimeout(function() {
                                    count_card[0].classList.remove('flipped');
                                    count_card[1].classList.remove('flipped');
                                    click_flag = true;
                                    count_card = [];
                                }, 1000);
                           }
                        }
                    } 
                });
            })(card);           
            container.appendChild(card);
            document.querySelector('.background').appendChild(container);
            document.body.appendChild(document.querySelector('.background'))
        }

        document.querySelectorAll('.card').forEach(function (card, index) {
            setTimeout(function () {
                card.classList.add('flipped');
            }, 1000 + 100 * index);
        });

        setTimeout(function () {
            document.querySelectorAll('.card').forEach(function (card) {
                card.classList.remove('flipped')
            });
            click_flag = true;
            start_time = new Date();
        }, 5000);
    }

    shupple();
    card_setting(karo, sero);
})(window, document);

