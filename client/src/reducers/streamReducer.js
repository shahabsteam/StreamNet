import {CREATE_STREAM,FETCH_STREAM,FETCH_STREAMS,
    DELETE_STREAM,EDIT_STREAM} from '../actions/types'
    import _ from 'lodash'
const StreamReducer =  (state ={},action)=>{
    switch(action.type){
        case FETCH_STREAMS :
            if(action.payload.error){
                return {...state,error : action.payload.error}
            }else{
                return {...state,..._.mapKeys(action.payload,'id')}
            }
            
        case FETCH_STREAM :

            return {...state,[action.payload.id]:action.payload};
        case CREATE_STREAM :
            if(action.payload.error){
                return {...state,error : action.payload.error}
            }
            return {...state,[action.payload.id]:action.payload};
            
        case EDIT_STREAM :
            return {...state,[action.payload.id]:action.payload};
            case DELETE_STREAM :
                return _.omit(state,action.payload)
        default:
            return state;
    }
}
export default StreamReducer;