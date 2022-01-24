// The POSTS reducer: controles the posts store
import * as actions from '../actions/actions'

export default (posts = [], action) => {
    switch(action.type){
        case actions.FETCH_ALL_POSTS:
            return action.payload;

        case actions.CREATE_POST:
            return [action.payload, ...posts];

        case actions.UPDATE_POST:
                return posts.map( post => (
                    post._id === action.payload._id ? action.payload : post
                ));

        case actions.DELETE_POST:
            return posts.filter(post => post._id !== action.payload);

        default:
            return posts;
    }
}