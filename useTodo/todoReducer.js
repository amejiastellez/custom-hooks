
export const todoReducer = (initialState = [], action) => {

    switch (action.type) {
        case '[TODO] Add Todo':
            return [...initialState, action.payload];
        
        case '[TODO] Delete Todo':
            return initialState.filter(todo => todo.id !== action.payload);
            
        case '[TODO] Toggle Todo':
            return initialState.map(todo => {

                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }

                // (todo.id === action.payload)
                //     ? {...todo, done: !todo.done}
                //     : todo
                return todo;
        });
        
        default:
                return initialState;
    }

}