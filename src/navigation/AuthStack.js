import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
        alert('Failed to save the data to the storage') // saving error
    }
}

export const loginApi = async (email, password) => {
    const value = { username: email, password: password }

    const add = await axios.post('http://myiotplatform.in/login_Api',value);
    if (add.data.length > 0) {
        storeData(value)
        return { status: 200, msg: "Login successfully" }
    }
    else {
        return { status: 400, msg: "Login failed" }
    }
}

export const removeData = async () => {
    const value = await AsyncStorage.removeItem('@storage_Key')
    return value
}

export const sensor_API =  async (email) => {
    const add = await axios.post('http://myiotplatform.in/sensor_API',{ username: email })
    if (add.data.length > 0) {
        return { status: 200, data:add.data }
    }
    else {
        return { status: 400 }
    }
}

export const alarm_API =  async (email) => {
    const add = await axios.post('http://myiotplatform.in/alarm_API',{ username: email })
    if (add.data.length > 0) {
        return { status: 200, data:add.data }
    }
    else {
        return { status: 400 }
    }
}
