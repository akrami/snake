(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"/home/alireza/extra/projects/snake/app-client.js":[function(require,module,exports){
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const w = 20,
    x = 20,
    y = 20,
    o = 2;

let snake = [];
snake[0] = { i: 10, j: 10 };
let food = {
    i: Math.floor(Math.random() * 20),
    j: Math.floor(Math.random() * 20)
};
let score = 0;
let move = { i: 0, j: 0 };
let direction = "RIGHT";
let pause = false;
let speed = 300;
let lost = false;
let lock = false;
var draw = () => {
    if (!pause && !lost) {
        lock = false;
        //draw background
        ctx.fillStyle = '#c5bfbc';
        ctx.fillRect(0, 0, 440, 540);
        ctx.fillStyle = '#7cad51';
        ctx.fillRect(20, 20, 400, 400);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(440, 0);
        ctx.lineTo(430, 10);
        ctx.lineTo(10, 10);
        ctx.lineTo(10, 530);
        ctx.lineTo(0, 540);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(420, 420);
        ctx.lineTo(20, 420);
        ctx.lineTo(25, 415);
        ctx.lineTo(415, 415);
        ctx.lineTo(415, 25);
        ctx.lineTo(420, 20);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(440, 540);
        ctx.lineTo(440, 0);
        ctx.lineTo(430, 10);
        ctx.lineTo(430, 530);
        ctx.lineTo(10, 530);
        ctx.lineTo(0, 540);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(420, 20);
        ctx.lineTo(415, 25);
        ctx.lineTo(25, 25);
        ctx.lineTo(25, 415);
        ctx.lineTo(20, 420);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fill();


        //move snake
        let head = {
            i: snake[0].i + move.i,
            j: snake[0].j + move.j
        };
        head.i = (head.i < 0) ? 19 : head.i;
        head.i = (head.i > 19) ? 0 : head.i;
        head.j = (head.j < 0) ? 19 : head.j;
        head.j = (head.j > 19) ? 0 : head.j;
        if (snake.find((dot) => {
            return (dot.i === head.i && dot.j === head.j);
        }) && !(move.i == 0 && move.j == 0)) {
            lost = true;
        }
        if (head.i == food.i && head.j == food.j) {
            score++;
            food = {
                i: Math.floor(Math.random() * 20),
                j: Math.floor(Math.random() * 20)
            };
            speed = (speed > 50) ? speed - 5 : speed;
            clearInterval(game);
            game = setInterval(draw, speed);
        } else {
            snake.pop();
        }
        snake.unshift(head);

        //draw snake dots
        snake.forEach((dot, index) => {
            ctx.fillStyle = (index == 0) ? 'rgba(14,10,9,0.75)' : 'rgba(14,10,9,0.5)';
            ctx.fillRect(x + o + dot.i * w, y + o + dot.j * w, w - 2 * o, w - 2 * o);
        });

        //draw fruit
        ctx.beginPath();
        ctx.arc(x + (w / 2) + food.i * w, y + (w / 2) + food.j * w, w / 2 - o, 0, 2 * Math.PI);
        ctx.fillStyle = 'darkred';
        ctx.fill();

        //draw score
        ctx.fillStyle = 'white';
        ctx.font = "23px 'Press Start 2P'";
        ctx.textBaseline = 'top';
        ctx.fillText(`Score: ${score}`, 20, 440);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode == 37 && direction != "RIGHT" && !pause && !lost && !lock) {
        lock = true;
        direction = "LEFT";
        move = { i: -1, j: 0 };
    } else if (event.keyCode == 38 && direction != "DOWN" && !pause && !lost && !lock) {
        lock = true;
        direction = "UP";
        move = { i: 0, j: -1 };
    } else if (event.keyCode == 39 && direction != "LEFT" && !pause && !lost && !lock) {
        lock = true;
        direction = "RIGHT";
        move = { i: 1, j: 0 };
    } else if (event.keyCode == 40 && direction != "UP" && !pause && !lost && !lock) {
        lock = true;
        direction = "DOWN";
        move = { i: 0, j: 1 };
    } else if (event.keyCode == 32 && !pause && !lost && !lock) {
        pause = true;
        move = { i: 0, j: 0 };
    } else if (event.keyCode == 32 && pause && !lost && !lock) {
        lock = true;
        pause = false;
        switch (direction) {
            case 'LEFT':
                move = { i: -1, j: 0 };
                break;
            case 'UP':
                move = { i: 0, j: -1 };
                break;
            case 'RIGHT':
                move = { i: 1, j: 0 };
                break;
            case 'DOWN':
                move = { i: 0, j: 1 };
                break;
        }
    }
});

let game = setInterval(draw, speed);
},{}]},{},["/home/alireza/extra/projects/snake/app-client.js"]);
