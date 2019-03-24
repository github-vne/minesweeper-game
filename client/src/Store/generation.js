export function generateEmptyField(size) {
    let emptyArray = [], row = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) row.push(0);
        emptyArray.push(row);
        row = [];
    }
    return emptyArray;
}

function generateMine(size, mines) {
    let array_mines = [];
    const getRandom = () => {
        const cell = [
            Math.floor(Math.random() * size),
            Math.floor(Math.random() * size)
        ];
        const foundMine = array_mines.find(el => {
            return JSON.stringify(el) === JSON.stringify(cell)
        });
        foundMine !== undefined ? getRandom() : array_mines.push(cell);
    };
    for (let i = 0; i < mines; i++) getRandom();
    return array_mines;
}

export const generateField = (size, mines) => {
    const mine = -1;
    let field = generateEmptyField(size),
        array_mines = generateMine(size, mines);

    for (let i in array_mines) {
        let cell = array_mines[i];
        let row = cell[0];
        let column = cell[1];
        field[row][column] = mine;

        const rowP = (row + 1 !== size);
        const rowM = (row - 1 !== -1);
        const collP = (column + 1 !== size);
        const collM = (column - 1 !== -1);

        if (rowP && field[row + 1][column] !== -1) {
            field[row + 1][column]++;
        }
        if (rowM && field[row - 1][column] !== -1) {
            field[row - 1][column]++;
        }
        if (collP && field[row][column + 1] !== -1) {
            field[row][column + 1]++;
        }
        if (collM && field[row][column - 1] !== -1) {
            field[row][column - 1]++;
        }
        if (rowP && collP && field[row + 1][column + 1] !== -1) {
            field[row + 1][column + 1]++
        }
        if (rowM && collP && field[row - 1][column + 1] !== -1) {
            field[row - 1][column + 1]++
        }
        if (rowP && collM && field[row + 1][column - 1] !== -1) {
            field[row + 1][column - 1]++
        }
        if (rowM && collM && field[row - 1][column - 1] !== -1) {
            field[row - 1][column - 1]++
        }
    }
    return field;
};

export const addStatistic = async (size,mines,userName,time) => {
    const data = {
        name: userName,
        size: `${size}x${size}`,
        time: time,
        mine: mines,
    };
    await fetch('http://localhost:3001/statistic', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
};