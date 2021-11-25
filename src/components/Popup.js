import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, Pressable, ActivityIndicator, TextInput, FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { mockPostComment, mockDeleteComment } from '../redux/mocks';
import { Colors } from '../constants/colors';

const Popup = (props) => {

    const [myComment, setMyComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    const dispatch = useDispatch();
    const { images } = useSelector(state => state.imagesReducer);

    const backOnpress = () => {
        setMyComment('');
        setShowComments(false);
        props.togglePopup();
    }

    const sendComment = () => {
        if (myComment) {
            mockPostComment(dispatch, images, props.item.id, myComment);
            setMyComment('');
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={styles.commentContainer}
            >
                <Text style={styles.username}>{item.username}:</Text>
                <Text style={styles.comment}>{item.comment}</Text>
                {item.isMine ?
                    <Pressable
                        onPress={() => { mockDeleteComment(dispatch, images, props.item.id, item.comment) }}
                        style={styles.deleteButton}
                    >
                        <Icon name="times" size={10} color={Colors.LIGHT_GREY} />
                    </Pressable>
                    :
                    null
                }
            </View>
        );
    }

    return (
        <Modal
            visible={props.showPopup}
            transparent
            onRequestClose={() => backOnpress()}
            animationType='slide'
            hardwareAccelerated
        >
            <View style={styles.centered_view}>
                <View style={styles.popup_modal}>
                    <Pressable
                        onPress={() => backOnpress()}
                        style={{ margin: 20 }}
                    >
                        <Icon name="arrow-left" size={20} color={Colors.LIGHT_GREY} />
                    </Pressable>
                    <ImageViewer
                        style={styles.imageViewer}
                        imageUrls={[{ url: props.item.url }]}
                        renderIndicator={() => null}
                        loadingRender={() => <ActivityIndicator size='large' />}
                    />
                    {showComments ?
                        <View
                            style={styles.commentsContainer}
                        >
                            <View style={styles.commentsClose}>
                                <Pressable
                                    onPress={() => setShowComments(!showComments)}
                                >
                                    <Icon name="times" size={20} color={Colors.LIGHT_GREY} />
                                </Pressable>
                                <Text style={styles.commentsTitle}>Comments</Text>
                            </View>
                            <FlatList
                                data={images[images.findIndex(obj => obj.id === props.item.id)].comments}
                                style={{ flex: 1, }}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index}
                            />
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setMyComment}
                                    value={myComment}
                                    placeholder='Enter your comment'
                                    placeholderTextColor={Colors.LIGHT_GREY}
                                />
                                <Pressable
                                    onPress={() => sendComment()}
                                >
                                    <Icon name="send" size={20} color={Colors.LIGHT_GREY} />
                                </Pressable>
                            </View>
                        </View>
                        :
                        <Pressable
                            onPress={() => setShowComments(!showComments)}
                            style={styles.showComments}
                        >
                            <Icon name="comment" size={25} color={Colors.LIGHT_GREY} />
                            <Text style={styles.commentsCount}>{props.item ? props.item.comments.length : 0}</Text>
                        </Pressable>
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centered_view: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DARK_TRANSPARENT
    },
    popup_modal: {
        width: '90%',
        flex: 1,
        margin: 20,
        backgroundColor: Colors.BLACK,
        borderRadius: 20
    },
    commentContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'flex-start'
    },
    username: {
        color: Colors.LIGHT_GREY,
        fontSize: 20,
        fontStyle: 'italic'
    },
    comment: {
        flex: 1,
        color: Colors.LIGHT_GREY,
        fontSize: 15,
        marginHorizontal: 5,
        marginVertical: 4,
        flexWrap: 'wrap'
    },
    deleteButton: {
        marginTop: 7
    },
    imageViewer: {
        marginBottom: 60
    },
    commentsContainer: {
        position: 'absolute',
        borderRadius: 20,
        backgroundColor: Colors.DARK_TRANSPARENT,
        bottom: 0,
        width: '100%',
        height: '50%'
    },
    commentsClose: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    commentsTitle: {
        color: Colors.LIGHT_GREY,
        fontSize: 20,
        marginHorizontal: 10
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.WHITE,
        height: 40,
        margin: 10
    },
    textInput: {
        flex: 1,
        color: Colors.LIGHT_GREY,
        marginHorizontal: 10
    },
    showComments: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    commentsCount: {
        color: Colors.LIGHT_GREY,
        fontSize: 20
    }
});

export default Popup;