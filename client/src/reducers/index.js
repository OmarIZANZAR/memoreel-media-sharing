import { combineReducers } from 'redux'

import progress from './progress'
import notes from './notes'
import posts from './posts'

export default combineReducers({
    posts,
    progress,
    notes,
})