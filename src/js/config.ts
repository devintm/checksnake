const speed: number = 6;
const worldSize: number = 12;
const startPoint: [number, number] = [7, 7];
const snake = [startPoint];

let movingDirection: Direction;
let moveInterval: ReturnType<typeof setTimeout>;