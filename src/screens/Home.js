import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Popup from '../components/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { mockGetImages } from '../redux/mocks';
import { numColumns } from '../constants/configs';
import { Colors } from '../constants/colors';

const formatData = (data, numColumns) => {

  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;

};

function Home() {

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const dispatch = useDispatch();
  const { images } = useSelector(state => state.imagesReducer);

  useEffect(() => {
    mockGetImages(dispatch);
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  const thumbnailOnpress = (item) => {
    setSelectedImage(item);
    togglePopup();
  }

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <TouchableOpacity
          style={styles.cardItem}
          onPress={() => thumbnailOnpress(item)}
          activeOpacity={0.5}
        >
          <FastImage
            style={styles.image}
            source={{ uri: item.thumbnail }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <LinearGradient
            style={styles.gradient}
            colors={[Colors.LIGHT_TRANSPARENT, Colors.BLACK]}
          >
            <Icon name="comment" size={15} color={Colors.LIGHT_GREY} />
            <Text style={styles.commentsCount}>{item.comments.length}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    (images && images.length > 0) ?
      <View style={styles.container}>
        <Popup
          showPopup={showPopup}
          togglePopup={togglePopup}
          item={selectedImage}
        />
        <FlatList
          data={formatData(images, numColumns)}
          renderItem={renderItem}
          numColumns={numColumns}
          keyExtractor={item => item.id}
        />
      </View>
      :
      null
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50
  },
  item: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
    height: Dimensions.get('window').width / numColumns
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  cardItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  gradient: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    alignItems: 'center'
  },
  commentsCount: {
    color: Colors.LIGHT_GREY,
    fontSize: 15,
    marginLeft: 5,
    marginRight: 10
  }
});

export default Home;