import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { loadTodos, removeTodo, saveTodo, setFilterSort } from '../store/actions/todo.actions.js'
import { changeBalance } from '../store/actions/user.actions.js'

import { PaginationBtns } from "../cmps/PaginationBtns.jsx"
import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(todoService.getFilterFromSearchParams(searchParams))
    const todos = useSelector((storeState) => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const maxPage = useSelector((storeState) => storeState.maxPage)

    useEffect(() => {
        loadTodos(filterBy)
        setSearchParams(utilService.getTruthyValues(filterBy))
    }, [filterBy])


    // const [todos, setTodos] = useState(null)
    // Special hook for accessing search-params:
    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    // const [filterBy, setFilterBy] = useState(defaultFilter)

    // useEffect(() => {
    //     setSearchParams(filterBy)
    //     todoService.query(filterBy)
    //         .then(todos => setTodos(todos))
    //         .catch(err => {
    //             console.eror('err:', err)
    //             showErrorMsg('Cannot load todos')
    //         })
    // }, [filterBy])

    function onRemoveTodo(todoId) {
        const ans = confirm('Do you want to delete this todo?')
        if (!ans) return
        removeTodo(todoId)
            .then(() => {
                console.log('removed todo ' + todoId);
                showSuccessMsg(`Removed todo with ${todoId} id successfully`)
            })
            .catch(() => showErrorMsg('Had trouble removing the todo'))
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(() => {
                showSuccessMsg(`Updated ${todoToSave.txt} successfully`)
                if (todoToSave.isDone) {
                    return changeBalance(10)
                }
            })
            .catch(() => showErrorMsg('Had trouble updating the todo'))
    }

    function onSetFilterSort(filterSort) {
        setFilterBy(_filterBy => ({ ..._filterBy, ...filterSort }))
    }

    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        onSetFilterSort({ ...filterBy, pageIdx: newPageIdx, })
    }

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterSort} />

            <PaginationBtns filterSortBy={filterBy} onChangePageIdx={onChangePageIdx} />
            <Link to="/todo/edit" className="add-todo-btn btn" >Add Todo</Link>
            {isLoading
                ? <h1 className="loader">Loading...</h1>
                : <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            }
        </section>
    )
}






// function onRemoveTodo(todoId) { 
//     todoService.remove(todoId)
//         .then(() => {
//             setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
//             showSuccessMsg(`Todo removed`)
//         })
//         .catch(err => {
//             console.log('err:', err)
//             showErrorMsg('Cannot remove todo ' + todoId)
//         })
// }

// function onToggleTodo(todo) {
//     const todoToSave = { ...todo, isDone: !todo.isDone }
//     todoService.save(todoToSave)
//         .then((savedTodo) => {
//             setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
//             showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
//         })
//         .catch(err => {
//             console.log('err:', err)
//             showErrorMsg('Cannot toggle todo ' + todoId)
//         })
// }