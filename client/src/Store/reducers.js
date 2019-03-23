import {
    START_GAME,
    HANDLE_CLICK,
    CHECK_MINE,
    CHANGE_MODAL,
    CHANGE_USER_NAME,
    CHANGE_SETTINGS,
    SAVE_TIME,
} from "./const";

import {
    generateField,
    generateEmptyField,
} from "./generation";

const initialState = {
    statusGame: "",
    gameOver: true,
    size: Number(localStorage.getItem('sizeSapper')) || 8,
    mines: Number(localStorage.getItem('minesSapper')) || 10,
    field: [],
    viewField: [],
    modal: false,
    userName: localStorage.getItem('userSapper') || "",
    time: ""
};

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case START_GAME:
            return {
                ...state,
                gameOver: false,
                statusGame: "",
                field: generateField(state.size, state.mines),
                viewField: generateEmptyField(state.size),
            };

        case HANDLE_CLICK:
            if (state.gameOver) return {...state};
            const {i, j} = action.payload;
            const cell = state.field[i][j];
            let changeView = [...state.viewField];
            if (cell === -1) {
                changeView[i][j] = -2;
                return {
                    ...state,
                    viewField: changeView,
                    gameOver: true,
                    statusGame: 'loos',
                    modal: true,
                };
            } else {
                changeView[i][j] = 1;
                const checkOpenCell = state.viewField.flat().filter(el => {
                    return el === 1;
                }).length;
                const checkWin = checkOpenCell + state.mines;
                if (checkWin === state.size * state.size) {
                    return {
                        ...state,
                        viewField: changeView,
                        gameOver: true,
                        statusGame: 'win',
                        modal: true,
                    };
                } else {
                    return {
                        ...state,
                        viewField: changeView,
                    };
                }
            }

        case CHECK_MINE:
            if (state.gameOver) return {...state};
            let a = action.payload.i;
            let b = action.payload.j;
            const cellCheck = [...state.viewField];
            cellCheck[a][b] === -1 ? cellCheck[a][b] = 0 : cellCheck[a][b] = -1;
            return {
                ...state,
                viewField: cellCheck,
            };


        case CHANGE_MODAL:
            return {
                ...state,
                modal: !state.modal
            };

        case CHANGE_USER_NAME:
            return {
                ...state,
                userName: action.payload
            };

        case CHANGE_SETTINGS:
            const {size, mines} = action.payload;
            localStorage.setItem('sizeSapper', size);
            localStorage.setItem('minesSapper', mines);
            return {
                ...state,
                size: size,
                mines: action.payload.mines,
                gameOver: true,
                statusGame: "",
                field: generateField(size, mines),
                viewField: generateEmptyField(size),
            };

        case SAVE_TIME:
            return{
                ...state,
                time: action.payload,
            };

        // case PUSH_NEW_POST:
        //     return {
        //         ...state,
        //         postList: [].concat(action.payload, state.postList)
        //     };
        //
        // case ADD_NEW_COMMENT:
        //     const indexPost = state.postList.findIndex(post => {
        //         return post._id === action.payload._id;
        //     });
        //     let updatePostList = [...state.postList];
        //     updatePostList[indexPost].comments = action.payload.comments;
        //     return{
        //         ...state,
        //         currentPost: action.payload,
        //         postList: updatePostList
        //     };

        default:
            return state;
    }
};