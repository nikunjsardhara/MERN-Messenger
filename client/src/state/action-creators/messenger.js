
import { messengerService } from "../../service";
import { SET_MESSENGER_USERS, ADD_TO_ROOM, SET_ROOMS, SET_MESSAGES } from "./../types";
import jwt_decode from "jwt-decode";
import { ERROR } from "./common";

export function fetchUsers(data, next) {
    return (dispatch, getState) => {
        messengerService.getUsers({}).then((response) => {
            switch (response?.status) {
                case 200:
                    if (next) next(response);
                    dispatch({ type: SET_MESSENGER_USERS, payload: response.data.data });
                    break;
                case 400:
                    dispatch(ERROR(response?.error));
                    if (next) next(response);
                    break;
                default:
                    if (next) next(response)
                    break;
            }
        });
    };
}

export function fetchRoomList(data, next) {

    return (dispatch, getState) => {
        messengerService.getRooms(data).then((response) => {
            switch (response?.status) {
                case 200:
                    if (next) next(response);
                    var _user = {};
                    if (localStorage.jwtToken) {
                        const token = localStorage.jwtToken;
                        const decoded = jwt_decode(token);
                        _user = decoded.user;
                    }
                    const rooms = [
                        ...response?.data?.data,
                    ];
                    rooms?.map((room) => {
                        if (room?.user.length === 2) {
                            room.title = getFullName(
                                room?.user?.filter((user) => user._id !== _user._id)[0]
                            );
                        }
                        if (!room?.profile_url) {
                            room.profile_url = room?.user?.filter(
                                (user) => user._id !== _user._id
                            )[0]?.profile_picture_url;
                        }
                        // adding empty messages array into room so that messages can be added after the api call of fetching messages
                        room['messages'] = [];
                        return room;
                    });
                    dispatch({
                        type: SET_ROOMS,
                        payload: { room: rooms, _id: _user._id },
                    });
                    break;

                case 400:
                    if (next) next(response);
                    dispatch(ERROR(response?.error));
                    break;

                default:
                    if (next) next(response)
                    break;
            }
        });
    };
}

export function fetchMessages(data, roomIndex, next) {
    return (dispatch, getState) => {
        messengerService.getMessages(data).then(response => {
            switch (response?.status) {
                case 200:
                    if (next) next(response)
                    const messages = [
                        ...response?.data?.data,
                    ];
                    dispatch({
                        type: SET_MESSAGES,
                        payload: { roomIndex: roomIndex, messages: messages.reverse() },
                    });
                    break;
                case 400:
                    dispatch(ERROR(response?.error))
                    if (next) next(response)
                    break;
                default:
                    if (next) next(response)
                    break;
            }
        })
    }
}

export function createOneToOneRoom(data, next) {
    return (dispatch, getState) => {
        messengerService.createOneToOneRoom(data).then((response) => {
            switch (response?.status) {
                case 200:
                    if (next) next(response);
                    dispatch({ type: ADD_TO_ROOM, payload: response.data.data });
                    break;
                case 400:
                    dispatch(ERROR(response?.error));
                    if (next) next(response);
                    break;
                default:
                    if (next) next(response)
                    break;
            }
        });
    };
}
