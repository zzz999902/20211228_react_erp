import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
export default function Admin() {

    const navigate = useNavigate();
    const user = memoryUtils.user

    useEffect(() => {
        if (!user || !user._id) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            admin:{[user.username]}
            <button onClick={() => {
                storageUtils.removeUser()
                console.log(user)
            }}>退出</button>
        </div>
    )
}