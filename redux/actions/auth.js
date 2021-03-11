import firebase from 'firebase';
import { USER_AUTH_CHANGED } from '../types/index';

export const fetchUser = () => (dispatch) => {
    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                dispatch({
                    type: USER_AUTH_CHANGED,
                    payload: snapshot.data(),
                });
            } else {
                console.log('Does not exist.');
            }
        });
};
