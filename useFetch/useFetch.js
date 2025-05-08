import { useEffect, useState } from 'react'

//Creamos la cache
const localCache = {};




export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect(() => {
        getFetch();
    }, [url]); 

    const setLoagingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });
    }

    const getFetch = async () => {

        if (localCache[url]) {
            console.log('Datos desde caché');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });

            return;
        }


        setLoagingState();

        const resp = await fetch(url);

        await new Promise((resolve) => setTimeout(resolve, 500));  // Simulando un tiempo de carga

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            return;
        }

        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })

        // console.log({data});

        //Almacenamos en caché, para no volver a hacer la petición
        localCache[url] = data;

    }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }

}
