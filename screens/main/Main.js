import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';

const Main = () => {
    const onLogOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('Sign Out Succes.');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View>
            <Text>Main Screen</Text>
            <Button title='Log Out' onPress={() => onLogOut()} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Main;
