const rows: NodeListOf<Element> = document.querySelectorAll('.row');

const getItemAt = (x: number, y: number) => rows[y - 1].children[x - 1] as HTMLInputElement;
const checkItemAt = (x: number, y: number) => getItemAt(x, y).checked = true;
const unCheckItemAt = (x: number, y: number) => getItemAt(x, y).checked = false;

const placeAppleAt = (x: number, y: number) => {
    getItemAt(x, y).type = 'radio';
    checkItemAt(x, y);
}

const removeAppleAt = (x: number, y: number) => {
    getItemAt(x, y).type = 'checkbox';
    unCheckItemAt(x, y);
}

const getApplePosition = () => {
    const position: Coordinates = [1, 1];

    rows.forEach((row, rowIndex) => {
        Array.from(row.children).forEach((input: HTMLInputElement, inputIndex) => {
            if (input.type === 'radio') {
                position[0] = inputIndex + 1;
                position[1] = rowIndex + 1;
            }
        });
    });

    return position;
}

const getRandomPosition = () => {
    const availablePositions: Coordinates[] = [];

    rows.forEach((row, rowIndex) => {
        Array.from(row.children).forEach((input: HTMLInputElement, inputIndex) => {
            if (input.type === 'checkbox' && input.checked === false) {
                availablePositions.push([inputIndex + 1, rowIndex + 1]);
            }
        });
    });

    const index = Math.floor(Math.random() * (availablePositions.length) - 1) + 1;

    return availablePositions[index];
}

const increaseScore = () => {
    const score: HTMLElement = document.querySelector('.score');

    const currentScore: number = parseInt(score.innerText, 10);
    score.innerText = String(currentScore + 1);
}

const handleInput = () => {
    document.addEventListener('keydown', e => {
        switch(e.code) {
            case "ArrowUp":    movingDirection = movingDirection === 'down' ? 'down' : 'up'; break;
            case "ArrowDown":  movingDirection = movingDirection === 'up' ? 'up' : 'down'; break;
            case "ArrowLeft":  movingDirection = movingDirection === 'right' ? 'right' : 'left'; break;
            case "ArrowRight": movingDirection = movingDirection === 'left' ? 'left' : 'right'; break;
        }

        if (moveInterval === undefined) {
            moveInterval = setInterval(() => {
                move(movingDirection || 'left');
            }, 1000 / speed);
        }
    });
}

const playWave = (head: [number, number]) => {
    const checkboxes = [];

    for (let x = 1; x <= worldSize; x++) {
        for (let y = 1; y <= worldSize; y++) {
            checkboxes.push(getItemAt(x, y));
        }
    }

    getItemAt(...head).className = 'wave';

    checkboxes.forEach((checkbox, index) => {
        setTimeout(() => {
            checkbox.className = 'wave';
            checkbox.checked = false;
        }, 10 * index);
    });
}

const move = (direction: Direction) => {
    const applePosition: [number, number] = getApplePosition();
    const head: [number, number] = [...snake[0]];
    const tail: [number, number] = [...snake[snake.length - 1]];

    const updateSnake = () => {
        snake.unshift(head);
        snake.pop();

        snake.forEach(snakePart => checkItemAt(snakePart[0], snakePart[1]));
    }

    switch (direction) {
        case 'up':    head[1] = head[1] === 1 ? worldSize : head[1] - 1; break;
        case 'down':  head[1] = head[1] === worldSize ? 1 : head[1] + 1; break;
        case 'left':  head[0] = head[0] === 1 ? worldSize : head[0] - 1; break;
        case 'right': head[0] = head[0] === worldSize ? 1 : head[0] + 1; break;
    }

    let checkBox = getItemAt(...head);
    if (checkBox.type === 'checkbox' && checkBox.checked) {
        document.querySelector('h1').innerText = 'Game Over...';
        document.querySelectorAll('input').forEach(input => input.disabled = true);

        playWave(head);

        clearInterval(moveInterval);
    }

    if (head[0] === applePosition[0] && head[1] === applePosition[1]) {
        snake.push(tail);

        placeAppleAt(...getRandomPosition());
        removeAppleAt(...applePosition);
        
        increaseScore();

        updateSnake();
    } else {
        updateSnake();
        unCheckItemAt(...tail);
    }
}