// eslint-disable-next-line
import { SET_SIGNIN_USER, SET_SIGNOUT_USER, SET_USER_DETAIL } from "../types";
import jwt_decode from "jwt-decode";
// import isEmpty from "is-empty";
const initialState = {
    user: {},
    access: localStorage.access ? localStorage.access : '',
    refresh: localStorage.refresh ? localStorage.refresh : '',
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGNUP_USER: {
            return {
                ...state,
                user: action.payload?.user,
                access: action.payload?.access.token,
                refresh: action.payload?.refresh.token,
            };
        }
        case SET_SIGNIN_USER: {
            return {
                ...state,
                user: action.payload?.user,
                access: action.payload?.access.token,
                refresh: action.payload?.refresh.token,
            };
        }
        case SET_SIGNOUT_USER: {
            return {
                ...state,
                user_status: action.payload?.message,
            };
        }
        case SET_USER_DETAIL: {
            const user = { ...state.data, ...action?.payload }
            return { ...state, data: user, _id: user?._id }
        }
        case 'RESET_STATE': {
            return initialState
        }
        default:
            return state;
    }
}


export default user;