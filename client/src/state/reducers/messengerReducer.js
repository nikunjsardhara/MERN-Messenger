
// import {
//     SET_ROOMS,
//     SET_MESSAGES,
//     SEND_MESSAGE,
//     RECEIVE_MESSAGE,
//     SET_ACTIVE_ROOM,
//     KEEP_SOCKET,
//     SET_SELECT_USER_DIALOG,
//     SET_MESSENGER_USERS,
//     ADD_TO_ROOM,
//     SCROLL_TO_BOTTOM
// } from "../types";
import jwt_decode from "jwt-decode";
const initialState = {
    socket: {},
    active_room: 0,
    users: [], // List of users to select from for new chat
    open_select_user_dialog: false,
    rooms: [],
    scrollToBottom: 0,
    _id: localStorage.jwtToken
        ? jwt_decode(localStorage.jwtToken)?.user?._id
        : "",
};

const messenger = (state = initialState, action) => {
    switch (action.type) {
        // case SET_ROOMS:
        //     return {
        //         ...state,
        //         rooms: action.payload.room,
        //         _id: action.payload._id,
        //     };
        // case SET_MESSAGES:
        //     let rooms = [...state.rooms];
        //     rooms[action.payload.roomIndex].messages = [
        //         ...action.payload.messages,
        //         ...rooms[action.payload.roomIndex].messages,
        //     ];
        //     return {
        //         ...state,
        //         rooms: rooms,
        //     };
        // case SEND_MESSAGE:
        //     if (action.payload.message !== "" || action.payload?.files.length > 0) {
        //         let rooms = [...state.rooms];

        //         rooms[state.active_room].messages.push({
        //             text: action.payload.message,
        //             sender: state._id,
        //             files: action.payload?.files
        //         });
        //         let body = {
        //             type: "SEND_MESSAGE",
        //             payload: {
        //                 room_id: rooms[state.active_room]._id,
        //                 text: action.payload.message,
        //                 files: action.payload?.files
        //             },
        //         };
        //         state.socket.emit("request", body);
        //         return {
        //             ...state,
        //             rooms: rooms,
        //         };
        //     }
        //     return state;
        // case RECEIVE_MESSAGE:
        //     if (action.payload.message !== "" || action.payload?.files.length > 0) {
        //         let rooms = [...state.rooms];

        //         const roomFound = rooms.some(
        //             (conv) => conv._id === action.payload.room_id
        //         ); // checking if the room exist
        //         if (roomFound) {
        //             // adding the message to the room if the room is found
        //             var roomToUpdate = rooms.filter(
        //                 (conv) => conv._id === action.payload.room_id
        //             )[0];
        //             roomToUpdate.messages.push({
        //                 text: action.payload.message,
        //                 sender: action.payload.sender,
        //                 files: action.payload?.files
        //             });
        //             roomToUpdate.title = action.payload.title;
        //             roomToUpdate.last_updated = action.payload.last_updated;
        //         } else {
        //             // adding the room along with the message to the room list
        //             rooms.push({
        //                 _id: action.payload.room_id,
        //                 title: action.payload.title,
        //                 last_updated: action.payload.timestamp,
        //                 messages: [{ ...action.payload }],
        //             });
        //         }
        //         let scrollToBottomCounter = state.scrollToBottom + 1;
        //         return {
        //             ...state,
        //             scrollToBottom: scrollToBottomCounter,
        //             rooms: rooms,
        //         };
        //     }
        //     break;
        // case SCROLL_TO_BOTTOM:
        //     let scrollToBottomCounter = state.scrollToBottom + 1;
        //     return {
        //         ...state,
        //         scrollToBottom: scrollToBottomCounter
        //     };
        // case KEEP_SOCKET:
        //     return {
        //         ...state,
        //         socket: action.payload,
        //     };
        // case SET_ACTIVE_ROOM:
        //     return {
        //         ...state,
        //         active_room: action.payload,
        //     };
        // case SET_SELECT_USER_DIALOG:
        //     return {
        //         ...state,
        //         open_select_user_dialog: action.payload,
        //     };
        // case SET_MESSENGER_USERS:
        //     return {
        //         ...state,
        //         users: action.payload,
        //     };
        // case ADD_TO_ROOM:
        //     return add_room(state, action.payload);
        default:
            return state;
    }
};

// const add_room = (state, payload) => {
//     // call this reducer after the room has been added to backend OR new message has been received from new traveler
//     var rooms = [...state.rooms];
//     const found = rooms.some((room) => room._id === payload._id);
//     payload["messages"] = [];
//     if (!found) rooms.push(payload);

//     return {
//         ...state,
//         rooms: rooms,
//     };
// };

export default messenger;
