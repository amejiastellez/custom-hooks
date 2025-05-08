import { useReducer, useEffect } from "react";
import { todoReducer } from "../todoReducer";

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Comprar pan',
    //     done: false,
    // },
    // {
    //     id: new Date().getTime() * 3,
    //     description: 'Comprar leche',
    //     done: false,
    // },
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
  
    const [todos, dispatch] = useReducer( todoReducer, initialState, init);

    //Guardamos en la local storage y la informacion de los todos persiste cuando se recarga la pagina

    useEffect(() => { //useEffect se dispara cada vez que cambia el estado de los todos
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    //Creamos un nuevo todo
    const handleNewTodo = ( todo ) => {
  
        const action = {
            type: '[TODO] Add Todo', //el tipo de accion que se va a ejecutar
            payload: todo //el payload es el todo que se va a agregar
        }

        dispatch(action);
    }
  
    //Borrar un todo
    const handleDelete = ( todoId ) => {

        const action = {
            type: '[TODO] Delete Todo',
            payload: todoId
        }

        dispatch(action);
    }
  
    const handleToggleTodo = ( todoId ) => {

        const action = {
            type: '[TODO] Toggle Todo',
            payload: todoId
        }

        dispatch(action);
    }
  
  
  
  
  
   return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDelete,
        handleToggleTodo,
   }
}
