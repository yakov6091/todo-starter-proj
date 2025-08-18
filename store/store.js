const { createStore, compose } = Redux
import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_TODOS = 'SET_TODOS'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'


const initialState = {
    todos: [],
    doneTodos: 0,
    maxPage: 0,
    user: userService.getLoggedinUser(),
    isLoading: false,
}

export function appReducer(state = initialState, cmd) {
    switch (cmd.type) {
        //Todo crud
        case SET_TODOS:
            return { ...state, todos: cmd.todos }
        case ADD_TODO:
            return { ...state, todos: [cmd.todo, ...state.todos] }
        case REMOVE_DOTO:
            return { ...state, todos: [state.todos.filter(todo => todo._id !== cmd.todoId)] }
        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo) }


        case SET_DONE_TODOS:
            return { ...state, doneTodosPercent: cmd.doneTodos }
        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }


        //USER
        case SET_USER:
            return { ...state, user: cmd.user }
        case SET_USER_BALANCE:
            if (!state.user) return state
            return { ...state, user: { ...state.user, balance: cmd.balance } }
        case SET_IS_LOADING:
            return {
                ...state, isLoading: cmd.isLoading
            }
        default:
            return state
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, composeEnhancers())


