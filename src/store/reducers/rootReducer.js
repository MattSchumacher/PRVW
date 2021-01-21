import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import announceReducer from './announceReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    announce: announceReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer