// The ERRORS reducer: controles the errors store
import * as actions from '../actions/actions'

export default (notes = [], action) => {

    switch(action.type){

        case actions.ADD_NOTES:
            let newNotes = [];
            action.payload.map( error => {
                const f = notes.find( existingErr => existingErr === error )
                if(f === undefined){
                    newNotes.push({
                        isError: true,
                        message: error,
                    })
                }
            })
            return [...notes, ...newNotes];

        case actions.ADD_NOTE:
            return [...notes, action.payload];

        case actions.REMOVE_NOTE:
            return notes.filter( error => error.message !== action.payload.message);

        default:
            return notes;
    }
}