import streams from "../apis/streams"
import auth from "../apis/streams"
import { SIGN_IN,SIGN_OUT,CREATE_STREAM
    ,DELETE_STREAM,EDIT_STREAM,FETCH_STREAM,
    FETCH_STREAMS,REGISTER,LOGIN_SUCCESS, LOGIN_FAILURE,REGISTER_FAILURE,REGISTER_SUCCESS  } 
    from "./types"
import history from "../history"
export const signIn=(email)=>{
    history.push('/')

    return {
        type : SIGN_IN,
        payload : email
    }
}
export const signOut = ( )=>{
    return {
        type : SIGN_OUT
    }
}
export const createStream = formValues=> async (dispatch,getState)=>{
    const {userEmail}=getState().auth;
    try{
        const response = await  streams.post('/streams',{...formValues,userEmail});
        dispatch({type : CREATE_STREAM,payload : response.data});
        history.push('/')       // navigation
    }catch(error){
        const payload = {
            error : error.response ? `${error.message} ${error.response.data.message}` : `${error.message}`
        }
        dispatch({type:CREATE_STREAM,payload})
    }


    }
export const fetchStreams = ()=> async dispatch =>{
    try{
        const response = await streams.get('/streams')
        dispatch({type:FETCH_STREAMS,payload:response.data})
    }catch(error){
        const payload = {
            error : error.response ? `${error.message} ${error.response.data.message}` : `${error.message}`
        }
        dispatch({type:FETCH_STREAMS,payload})
    }

}
export const fetchStream = (id)=>async dispatch =>{
     const response = await streams.get(`/streams/${id}`)
    //we have to only get data[0]
    dispatch({type:FETCH_STREAM,payload:response.data[0]})
}
export const editStream = (id,formValues)=>async dispatch=>{
    const response = await streams.patch(`streams/${id}`,formValues)
   
    dispatch({type:EDIT_STREAM,payload:response.data})
    history.push('/')

}
export const deleteStream = (id)=> async dispatch =>{
    await streams.delete(`streams/${id}`)
    dispatch({type:DELETE_STREAM,payload:id})
    history.push('/')
}

export const login = (username,password)=> async dispatch =>{
    try {
        await auth.post(`login`, { username, password });
        dispatch({ type: LOGIN_SUCCESS, payload: username });
        history.push('/');
      } catch (error) {
        
        dispatch({ type: LOGIN_FAILURE,
            payload: error.response ? `${error.message} ${error.response.data.message}` : `${error.message}`
        });
        // You can also display an error message or perform additional error handling here
      }
}

export const register = (username,password)=> async dispatch =>{
   
    dispatch({type:REGISTER,payload:username})
    // history.push('/')
    try {
        await auth.post(`register`,{ username, password })
        dispatch({ type: REGISTER_SUCCESS, payload: "user created now LogIn" });
        
      } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response ? `${error.message} ${error.response.data.message}` : `${error.message}`
          });
       
        // You can also display an error message or perform additional error handling here
      }
}
