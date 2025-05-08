import { useState } from "react";

export const useForm = (initialForm = {}) => { 
  
  
    const [formState, setFormState] = useState( initialForm) 
    
    const onInputChange = ({ target }) => { // Se desestructura el evento y se obtiene el target
        const { name, value } = target; // Se obtiene el name y el value del target
        
        setFormState({
            ...formState,
            [name]: value
        })
    }   

    const onResetForm = () => {
        setFormState(initialForm);
    }
  
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}
