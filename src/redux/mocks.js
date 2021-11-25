import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setImages } from '../redux/actions';
import { mockData } from '../constants/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';

var mock = new MockAdapter(axios);

export const mockGetImages = async (dispatch) => {
  
  var storedImages = [];
  await AsyncStorage.getItem('images', (error, result) => {
    if (result)
      storedImages = JSON.parse(result);
  });

  mock.onGet("/api/images").reply(200, {
    images: mockData,
  });

  axios.get("/api/images").then(function (response) {
    if (storedImages.length > 0)
      dispatch(setImages(storedImages));
    else
      dispatch(setImages(response.data.images));
  });
}

export const mockPostComment = (dispatch, images, id, comment) => {

  let image_index = images.findIndex(obj => obj.id === id);
  images[image_index].comments.push(
    {
      username: "my self",
      comment: comment,
      isMine: true
    }
  );

  mock.onPost("/api/add_comment").reply(200, {
    images: images,
  });

  axios.post("/api/add_comment").then(function (response) {
    dispatch(setImages(response.data.images));
    AsyncStorage.setItem('images', JSON.stringify(response.data.images));
  });
}

export const mockDeleteComment = (dispatch, images, id, comment) => {

  let image_index = images.findIndex(obj => obj.id === id);
  let comment_index = images[image_index].comments.findIndex(obj => obj.comment === comment);
  images[image_index].comments.splice(comment_index, 1);

  mock.onPost("/api/delete_comment").reply(200, {
    images: images,
  });

  axios.post("/api/delete_comment").then(function (response) {
    dispatch(setImages(response.data.images));
    AsyncStorage.setItem('images', JSON.stringify(response.data.images));
  });
}