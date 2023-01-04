type coordinates = [number, number];

type keycodes = {
    arrowUp: number,
    arrowDown: number,
    arrowLeft: number,
    arrowRight: number
}

const speed: number = 6;
const worldSize: number = 10;
// const startPoint = [5, 5] as [number, number];
// const startPoint: [number, number] = [5, 5];
const startPoint: coordinates = [5, 5];
const snake: coordinates[] = [startPoint];
const key = {
    arrowUp: 38,
    arrowDown: 40,
    arrowLeft: 37,
    arrowRight: 39
};

let movingDirection;
let moveInterval;