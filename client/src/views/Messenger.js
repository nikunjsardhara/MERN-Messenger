import React from 'react'
import Rooms from '../components/Rooms'
import { useSelector } from 'react-redux'
const Messenger = () => {
    const user = useSelector(state => state.user.user);

    return (
        <div>
            {user.displayname}
            <Rooms />
        </div>
    )
}

export default Messenger