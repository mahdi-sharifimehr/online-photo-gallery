export const SET_IMAGES = 'SET_IMAGES';

export const setImages = images => dispatch => {
    dispatch({
        type: SET_IMAGES,
        payload: images,
    });
};