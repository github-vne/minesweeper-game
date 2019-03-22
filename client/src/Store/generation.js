export const generationField = (size, quantity_mines) => {
    const n = size;
    const mines = quantity_mines;
    let field = [], row = [], array_mines = [];

    // Создание мин
    const getRandom = () => {
        const row = Math.floor(Math.random() * n - 1);
        const column = Math.floor(Math.random() * n - 1);
        const cell = [row, column];
        const findCall = array_mines.find(el => {
            return JSON.stringify(el) === JSON.stringify(cell)
        });
        findCall !== undefined ? getRandom() : array_mines.push(cell);
    };

    for (let i = 0; i < mines; i++) {
        getRandom();
    }

    // Генерация поля
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const findCall = array_mines.find(el => {
                return JSON.stringify(el) === JSON.stringify([i, j])
            });
            findCall !== undefined ? row.push(-1) : row.push(0);
        }
        field.push(row);
        row = [];
    }

    // Кол-во мин рядом
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (field[i][j] === -1) continue;
            let count = 0;
            if (j !== n && field[i][j + 1] === -1) count++;
            if (j !== 0 && field[i][j - 1] === -1) count++;
            if (field[i + 1] !== undefined && field[i + 1][j] === -1) count++;
            if (field[i + 1] !== undefined && j !== n && field[i + 1][j + 1] === -1) count++;
            if (field[i + 1] !== undefined && j !== 0 && field[i + 1][j - 1] === -1) count++;
            if (field[i - 1] !== undefined && field[i - 1][j] === -1) count++;
            if (field[i - 1] !== undefined && j !== n && field[i - 1][j + 1] === -1) count++;
            if (field[i - 1] !== undefined && j !== 0 && field[i - 1][j - 1] === -1) count++;
            field[i][j] = count;
        }
    }
    return field;
};

export const generationView = (size) => {
    const n = size;
    let viewArr = [], row = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            row.push(0);
        }
        viewArr.push(row);
        row = [];
    }
    return viewArr;
};