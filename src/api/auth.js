import axios from 'axios'

const api = axios.create({
    baseURL: 'http://rofif.my.id/api/v1'
})

export const restRegister = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data.data;
    } catch (e) {
        if (e.response && e.response.status === 500) {
            throw new Error('Email already registered');
        } else {
            throw new Error('Failed to register: ' + e.message);
        }
    }
};

export const restLogin = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData)
        return response.data.data
    } catch (e) {
        throw new Error('Failed login: ' + e.message)
    }
}
