var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen();

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '20%',
    height: '40%',
    content: 'Advertising space foqr rent!',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'magenta',
        border: {
            fg: '#ffffff'
        },
    }
});

// Append our box to the screen.
screen.append(box);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

function reset() {
    box.direction = 'right';
    box.angle = 'down';
    screen.render();
}

function startMove() {
    reset();

    setInterval(function () {
        if (box.direction === 'right') {
            if (box.left > screen.width - box.width) {
                box.direction = 'left'
                box.left--
            } else {
                box.left++
            }
        } else if (box.direction === 'left') {
            if (box.left < 0) {
                box.direction = 'right'
                box.left++
            } else {
                box.left--
            }
        }

        if (box.angle === 'down') {
            if (box.top > screen.height - box.height) {
                box.angle = 'up';
                box.top--
            } else {
                box.top++;
            }
        } else if (box.angle === 'up') {
            if (box.top < 0) {
                box.angle = 'down';
                box.top++
            } else {
                box.top--;
            }
        }

        screen.render();
    }, 1000);
}

function main() {
    screen.render();
    return startMove();
}

main();