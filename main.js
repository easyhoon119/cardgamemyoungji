
'use strict';
var karo = 4;
var sero = 3;
var sign;
var sign1;
var sign2;
var color = ['baekma.jpeg', 'baekma.jpeg', 'changjo.jpg', 'changjo.jpg', 'chaplegwan.jpg', 'chaplegwan.jpg', 'chargwan.jpg', 'chargwan.jpg', 'chasaedae.jpeg', 'chasaedae.jpeg', 'undongjang.jpg', 'undongjang.jpg'];
var color_sub = color.slice();
var check1 = document.getElementById('start_check');
var back_color = [];
var click_flag = true;
var count_card = [];
var first_card = [];
var complete_card = [];
var cnt = 0;
var count = 0;
var start_time;
var retryState = false;
var l = 0;
var total_time;
function shupple() {
    for (var i = 0; color.length > 0; i += 1) {
        back_color = back_color.concat(color.splice(Math.floor(Math.random() * color.length), 1));
    }
}
console.log(back_color);
function card_setting(karo, sero) {
    click_flag = false;
    var container = document.createElement('div');
    container.className = 'containers';
    var container2 = document.createElement('div');
    container2.className = 'container2';
    var mark = document.createElement('div');
    mark.className = 'mark';
    for (var i = 0; i < karo * sero; i += 1) {
        var card = document.createElement('div');
        card.className = 'card';
        card.id = i;
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundImage = 'url(' + back_color[i] + ')';
        cardBack.style.backgroundSize = 'cover';
        cardBack.style.backgroundPosition = 'center';
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (c) {
            card.addEventListener('click', function () {
                if (click_flag && !complete_card.includes(c) && c.id !== first_card[first_card.length - 1]) {
                    c.classList.toggle('flipped');
                    first_card.push(c.id);
                    count_card.push(c);
                    if (count_card.length == 2) {
                        first_card = [];
                        if (count_card[0].querySelector('.card-back').style.backgroundImage === count_card[1].querySelector('.card-back').style.backgroundImage) {
                            complete_card.push(count_card[0]);
                            complete_card.push(count_card[1]);
                            count_card = [];
                            setTimeout(function () {
                                if (complete_card.length === 12) {
                                    retry.innerHTML = '다시하기';
                                    var compl_time = new Date();
                                    total_time = (compl_time - start_time) / 1000;
                                    var msg = total_time + '초 걸렸습니다.\n* 태그 : #mju_run, #당방봄, #명지대타짜\n제 48대 Run 총학생회';
                                    if (cnt == 0) {
                                        sign = window.prompt('학번을 입력하세요');
                                        sign1 = window.prompt('학과를 입력해주세요');
                                        sign2 = window.prompt('이름을 입력해주세요');
                                        alert(total_time + '초' + '\n' + sign + '\n' + sign1 + '\n' + sign2 + '\n' + '참여가 완료 되었습니다.');
                                        cnt += 1;
                                    }
                                    hide.style.display = 'block';
                                    retry.addEventListener('click', function () {
                                        hide.style.display = 'none';
                                        document.querySelector('.background').innerHTML = '';
                                        color = color_sub.slice();
                                        back_color = [];
                                        complete_card = [];
                                        cnt = 0;
                                        start_time = null;
                                        shupple();
                                        card_setting(karo, sero);
                                    });
                                }
                            }, 1000);
                        }
                        else {
                            click_flag = false;
                            setTimeout(function () {
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
        document.querySelector('.background').appendChild(mark);
        document.querySelector('.background').appendChild(container);
        document.body.appendChild(document.querySelector('.background'))
    }
    var retry = document.createElement('div');
    retry.className = 'retry-btn';
    var hide = document.createElement('div');
    hide.className = 'hide';
    var another = document.createElement('div');
    another.className = 'another-btn';
    another.appendChild(retry);
    hide.appendChild(another);
    container2.appendChild(hide);
    document.querySelector('.background').appendChild(container2);
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 2000 + 100 * index);
    });

    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('flipped')
        });
        click_flag = true;
        start_time = new Date();
    }, 3750);

}
function starting() {
    const start_btn = document.querySelector('.start_btn');
    check1.addEventListener('click', () => {
        check1.checked = true;
        start_btn.addEventListener('click', () => {
            start_btn.style.display = 'none';
            document.querySelector('.no-touch').style.display = 'none';
            count += 1;
            if (count == 1) {
                card_setting(karo, sero);
            }
        });
    });
}

shupple();
starting();



