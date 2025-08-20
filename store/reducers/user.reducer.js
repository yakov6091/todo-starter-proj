const { createStore, compose } = Redux
import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    user: userService.getLoggedinUser(),
    isLoading: false,
}

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        //USER
        case SET_USER:
            return { ...state, user: cmd.user }
        case SET_USER_BALANCE:
            if (!state.user) return state
            return { ...state, user: { ...state.user, balance: cmd.balance } }

        default:
            return state
    }
}



