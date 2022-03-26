// eslint-disable-next-line
import { SET_SIGNUP_USER, SET_SIGNIN_USER, SET_SIGNout_USER } from "../types";
import setAuthToken from "./../../setAuthToken";
import { authService } from "../../service";
export const setUser = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_SIGNIN_USER, payload: data });
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch({ type: SET_SIGNIN_USER, payload: {} });
};

export function signUp(data, next) {
    authService.signUp(data).then(response => {
        if (next) next(response)
    })
}


export function signIn(data, next) {
    return (dispatch, getState) => {
        authService.signIn(data).then(response => {
            switch (response.status) {
                case 200: {
                    const { user, tokens } = response.data
                    if (user) {
                        dispatch({ type: SET_SIGNIN_USER, payload: user });
                        dispatch({ type: 'SET_OTHER_USER_DETAIL', payload: jwt_decode(token).user });
                    }
                    if (next) next(response)
                    break
                }
                case 400: {
                    if (next) next(response)
                    break
                }
                default:
                    break

            }
        })
    }
}

export function signOut(data, next) {
    return (dispatch, getState) => {
        authService.signOut(data).then(response => {
            switch (response.status) {
                case 200: {
                    dispatch({
                        type: SET_SIGNOUT_USER,
                        payload: {
                            success: response.data.success,
                            message: response.data.message
                        }
                    });
                    if (next) next(response)
                    break
                }
                case 400: {
                    if (next) next(response)
                    break
                }
                default:
                    break

            }
        })
    }
}