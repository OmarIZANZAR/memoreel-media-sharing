// The PROGRESS reducer: controles the progress store
import * as actions from '../actions/actions'

export default (progress = 0, action) => {
    switch(action.type){
        case actions.SET_PROGRESS:
            return action.payload;

        default:
            return progress;
    }
}