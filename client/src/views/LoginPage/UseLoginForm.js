import axios from 'axios';
import { useState } from 'react'

const initial = {
    username: '',
    password: '',
    isRemember: true,
    errorUser: '',
    errorPass: '',
    loggedin: null,
    error: null,
    isSending: false
}

export default function UseLogin() {
    const [userInfo, setUserInfo] = useState(initial);

    const setUsername = v => setUserInfo(prev => ({ ...prev, username: v }))

    const setPassword = v => setUserInfo(prev => ({ ...prev, password: v }))

    const setRemember = v => setUserInfo(prev => ({ ...prev, isRemember: v }))

    const setUserError = v => setUserInfo(prev => ({ ...prev, errorUser: v }))

    const setPassError = v => setUserInfo(prev => ({ ...prev, errorPass: v }))

    const login = async () => {
        if (userInfo.username.trim() === "") {
            return setUserError("Username is empty !")
        }

        if (userInfo.password.trim() === "") {
            return setPassError("Password is empty !")
        }
        return await axios({
            method: 'post',
            url: 'api/login/login',
            proxy: {
                host: 'localhost',
                port: 5000,
                protocol: 'http'
            },
            data: userInfo,
        })
            .then(({ data }) => {
                data.type === 'success'
                    ? setUserInfo(prev => ({
                        ...prev,
                        loggedin: true,
                    }))
                    : setUserInfo(prev => ({
                        ...prev,
                        loggedin: false,
                        error: data.message,
                    }))

            })
            .catch(err => err.response ? alert(err.response.data)
                : err.request ? alert(`Error: ${err.message}`) : alert(err.config))
            .finally(() => {
                setUserInfo(prev => ({
                    ...prev,
                    isSending: false,
                }))
            })

    }
    return {
        userInfo,
        setUsername,
        setPassword,
        setRemember,
        setUserError,
        setPassError,
        login
    }
}
