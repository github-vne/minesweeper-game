import React, {Component} from 'react';

class App extends Component {

    /*
    for(i=0; i<num_mines;i++) Field[rand()%nxm]=-1;// Установим информацию на пустых клетках о количестве мин находящихся рядом
    for(i=0;i<n;i++)
    for(j=0;j<m;j++)
    {
    mine_counter=0;
    if(Field[i+m*j-1]==-1)mine_counter++; // есть мина слева?
    if(Field[i+m*j+1]==-1)mine_counter++; // есть мина справа?
    if(Field[i+m*(j-1)]==-1)mine_counter++; // есть мина вверху?
    if(Field[i+m*(j+1)]==-1)mine_counter++; // есть мина внизу относительно текущей клетки?
    // так же пройдем по краям
    if(Field[i+m*(j+1)+1]==-1)mine_counter++;
    if(Field[i+m*(j-1)-1]==-1)mine_counter++;
    if(Field[i+m*(j+1)-1]==-1)mine_counter++;
    if(Field[i+m*(j-1)+1]==-1)mine_counter++;
    //  +---------+------------+---------+
    //  | клетка1 |   клетка2  | клетка3 |
    //  | клетка4 | текущ. поз | клетка6 |
    //  | клетка7 |   клетка8  | клетка9 |
    //  +---------+------------+---------+
    Field[i]=mine_counter; // сохраним о количестве мин
    }
    */
    render() {
        const n = 8; // размеры поля
        let arr = [];
        let row = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                j % 3 !== 0 ? row.push(0) : row.push(-1);
            }
            arr.push(row);
            row = [];
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (arr[i][j] === -1) continue;
                let count = 0;
                if (j !== n && arr[i][j + 1] === -1) count++;
                if (j !== 0 && arr[i][j - 1] === -1) count++;
                if (arr[i + 1] !== undefined && arr[i + 1][j] === -1) count++;
                if (arr[i + 1] !== undefined && j !== n && arr[i + 1][j + 1] === -1) count++;
                if (arr[i + 1] !== undefined && j !== 0 && arr[i + 1][j - 1] === -1) count++;
                if (arr[i - 1] !== undefined && arr[i - 1][j] === -1) count++;
                if (arr[i - 1] !== undefined && j !== n && arr[i - 1][j + 1] === -1) count++;
                if (arr[i - 1] !== undefined && j !== 0 && arr[i - 1][j - 1] === -1) count++;
                arr[i][j] = count;
            }
        }

        console.info(arr);


        return (
            <div className="App">
                <div>
                    {arr.map((row, i) => {
                        return (
                            <div key={i}>
                                {row.map((el, j) => {
                                    return (
                                        <button key={j}>{el}</button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        );

    }
}

export default App;
