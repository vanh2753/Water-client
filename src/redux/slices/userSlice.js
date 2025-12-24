import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {
        user_id: null,
        username: null,
        full_name: null,
        email: null,
        role: null,
    },
    access_token: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        Login: (state, action) => {
            state.userInfo = action.payload.user
            state.access_token = action.payload.access_token
            state.isAuthenticated = true
        },
        Logout: (state) => {
            state.userInfo = initialState.userInfo
            state.access_token = null
            state.isAuthenticated = false
        }
    }
})

export const { Login, Logout } = userSlice.actions
export default userSlice.reducer