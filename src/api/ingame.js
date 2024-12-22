import axios from 'axios'

const api = axios.create({
    baseURL: 'http://rofif.my.id/api/v1'
})


export const restNewMatch = async (token, userData) => {
    try {
        const response = await api.post('/match', userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.data
    } catch (e) {
        throw new Error('Failed to create new match: ' + e.message)
    }
}

export const restTakeTurn = async (token, userData) => {
    try {
        const response = await api.put('/match', userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.data
    } catch (e) {
        throw new Error('Failed to take turn: ' + e.message)
    }
}

