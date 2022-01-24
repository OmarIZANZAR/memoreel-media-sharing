// Action Creators:
import * as actions from './actions'

export const addNotes = (notes) => {
    return {
        type: actions.ADD_NOTES,
        payload: notes,
    }
}

export const addNote = (note) => {
    return {
        type: actions.ADD_NOTE,
        payload: note,
    }
}

export const removeNote = (note) => {
    return {
        type: actions.REMOVE_NOTE,
        payload: note,
    }
}