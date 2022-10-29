let { ref, reactive, effect } = require('@vue/reactivity')
let blessed = require('blessed')
let screen = blessed.screen()

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

let box = blessed.box({
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
})

screen.append(box);

const App = {
    render(data) {
        effect(() => {
            box.top = data.top.value
            box.left = data.left.value
            if (box.direction === 'right') {
                if (data.left.value >= (screen.width - box.width)) {
                    box.direction = 'left'
                }
            } else if (box.direction === 'left') {
                if (data.left.value < 0) {
                    box.direction = 'right'
                }
            }

            if (box.angle === 'down') {
                if (data.top.value >= (screen.height - box.height)) {
                    box.angle = 'up'
                }
            } else if (box.angle === 'up') {
                if (data.top.value < 0) {
                    box.angle = 'down'
                }
            }
            screen.render()
        })
    },
    setup() {
        const top = ref((screen.height - box.height) / 2)
        const left = ref((screen.width - box.width) / 2)
        box.direction = 'right'
        box.angle = 'down'
        setInterval(() => {
            if (box.direction === 'right') {
                left.value+=2
            }
            if (box.direction === 'left') {
                left.value-=2
            }
            if (box.angle === 'up') {
                top.value--
            }
            if (box.angle === 'down') {
                top.value++
            }
        }, 100);
        return {
            top, left
        }
    }
}

App.render(App.setup())
