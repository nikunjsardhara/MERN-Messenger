// eslint-disable-next-line
import { SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, RESET_STATE } from "../types";

const initialState = {
    user: localStorage.user ? JSON.parse(localStorage.user) : {},
    access: localStorage.access ? localStorage.access : '',
    refresh: localStorage.refresh ? localStorage.refresh : '',
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload
            };
        }
        case SET_ACCESS_TOKEN: {
            localStorage.setItem('access', action.payload);
            return {
                ...state,
                access: action.payload,
            }
        }
        case SET_REFRESH_TOKEN: {
            localStorage.setItem('refresh', action.payload);
            return {
                ...state,
                refresh: action.payload,
            }
        }
        case RESET_STATE: {
            return initialState
        }
        default:
            return state;
    }
}


export default user;