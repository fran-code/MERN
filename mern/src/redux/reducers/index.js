import { STORE_USER } from '../constants/action-types'


const initialState = {
    users: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case STORE_USER:
            return Object.assign({}, state.users, action.payload)
        default:
            return { ...state }
    }
};

export default rootReducer;