const { createStore, compose } = Redux
import { todoService } from '../services/todo.service.js'

export const SET_TODOS = 'SET_TODOS'
export const SET_DONE_TODOS = 'SET_DONE_TODOS'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    todos: [],
    doneTodos: 0,
    filterBy: todoService.getDefaultFilter(),
    maxPage: 0,

}

export function todoReducer(state = initialState, cmd) {
    switch (cmd.type) {
        //Todo crud
        case SET_TODOS:
            return { ...state, todos: cmd.todos }
        case ADD_TODO:
            return { ...state, todos: [cmd.todo, ...state.todos] }
        case REMOVE_TODO:
            return { ...state, todos: [state.todos.filter(todo => todo._id !== cmd.todoId)] }
        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo) }
        case SET_DONE_TODOS:
            return { ...state, doneTodos: cmd.doneTodos }
        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }

        default:
            return state
    }
}



