import { SET_IMAGES } from './actions';

const initialState = {
    images: [],
}

function imagesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IMAGES:
            return { ...state, images: action.payload };
        default:
            return state;
    }
}

export default imagesReducer;