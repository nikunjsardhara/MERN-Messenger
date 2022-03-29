// eslint-disable-next-line
import { SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "../types";
import setAuthToken from "./../../setAuthToken";
import { authService } from "../../service";
export const setUser = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_USER, payload: data });
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch({ type: SET_USER, payload: {} });
};

export function signUp(data, next) {
    return (dispatch, getState) => {
        authService.signUp(data).then(response => {

            switch (response.status) {
                // 201 = Created
                case 201: {
                    dispatch({ type: SET_USER, payload: response.data?.user });
                    dispatch({ type: SET_ACCESS_TOKEN, payload: response.data?.tokens.access?.token });
                    dispatch({ type: SET_REFRESH_TOKEN, payload: response.data?.tokens.refresh?.token });
                    if (next) next(response)
                    break;
                }
                case 200: {
                    if (next) next(response)
                    break;
                }
                case 400: {
                    if (next) next(response)
                    break;
                }
                default:
                    break;

            }
        })
    }
}


export function signIn(data, next) {
    return (dispatch, getState) => {
        authService.signIn(data).then(response => {
            switch (response.status) {
                // 200 = OK
                case 200: {
                    dispatch({ type: SET_USER, payload: response.data?.user });
                    dispatch({ type: SET_ACCESS_TOKEN, payload: response.data?.tokens?.access?.token });
                    dispatch({ type: SET_REFRESH_TOKEN, payload: response.data?.tokens?.refresh?.token });
                    if (next) next(response)
                    break;
                }
                case 400: {
                    if (next) next(response)
                    break;
                }
                default:
                    break;

            }
        })
    }
}

// export function signOut(data, next) {
//     return (dispatch, getState) => {
//         authService.signOut(data).then(response => {
//             switch (response.status) {
//                 case 200: {
//                     dispatch({
//                         type: SET_SIGNOUT_USER,
//                         payload: {
//                             success: response.data.success,
//                             message: response.data.message
//                         }
//                     });
//                     if (next) next(response)
//                     break
//                 }
//                 case 400: {
//                     if (next) next(response)
//                     break
//                 }
//                 default:
//                     break

//             }
//         })
//     }
// }