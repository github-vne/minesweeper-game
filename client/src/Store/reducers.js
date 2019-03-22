import {
    START_GAME,
    HANDLE_CLICK,
    CHECK_MINE,
    CHANGE_MODAL,
    CHANGE_USER_NAME,

} from "./const";

import {
    generationField,
    generationView,
} from "./generation";

const initialState = {
    gameOver: false,
    start: false,
    size: 8,
    mines: 10,
    field: [],
    viewField: [],
    modal: false,
    userName: localStorage.getItem('userSapper') || "",
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_GAME:
            return {
                ...state,
                start: true,
                gameOver: false,
                field: generationField(state.size, state.mines),
                viewField: generationView(state.size),
            };

        case HANDLE_CLICK:
            if (state.gameOver) {
                return {...state};
            } else {
                let endGame = false;
                const {i, j} = action.payload;
                const cell = state.field[i][j];
                let changeView = [...state.viewField];
                if (cell === -1) {
                    endGame = true;
                    changeView[i][j] = -2;
                } else {
                    changeView[i][j] = 1;
                }
                return {
                    ...state,
                    viewField: changeView,
                    gameOver: endGame,
                };
            }


        case CHECK_MINE:
            if (state.gameOver) {
                return {...state};
            } else {
                let a = action.payload.i;
                let b = action.payload.j;
                const cellCheck = [...state.viewField];
                cellCheck[a][b] === -1 ? cellCheck[a][b] = 0 : cellCheck[a][b] = -1;
                return {
                    ...state,
                    viewField: cellCheck,
                };
            }


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