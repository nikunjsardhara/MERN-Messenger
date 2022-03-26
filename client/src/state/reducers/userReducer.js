// eslint-disable-next-line
import { SET_SIGNIN_USER, SET_SIGNOUT_USER, SET_USER_DETAIL } from "../types";
import jwt_decode from "jwt-decode";
// import isEmpty from "is-empty";
const initialState = {
    isAuthenticated: false,
    data: localStorage.jwtToken ? jwt_decode(localStorage.jwtToken)?.user : {},
    _id: localStorage.jwtToken ? jwt_decode(localStorage.jwtToken)?.user?._id : '',
    user_type: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGNIN_USER: {
            return {
                ...state,
                _id: action.payload?.user?._id,
                isAuthenticated: action.payload?.isAuthenticated,
                data: action.payload?.user,
                user_type: "user"
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