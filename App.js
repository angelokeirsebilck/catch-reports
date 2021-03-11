import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Colors
import { PrimaryColor } from './constants/colors';

// Init firebase connection.
import firebase from 'firebase/app';
import 'firebase/auth';
import initFB from './config/initFirebase';
initFB();

// Screens
import LandingScreen from './screens/auth/Landing';
import RegisterScreen from './screens/auth/Register';
import RecoverPWScreen from './screens/auth/Recover';
import MainScreen from './screens/main/Main';

const Stack = createStackNavigator();

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.defaultLocale = 'en';

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setIsLoggedIn(false);
                setIsLoading(true);
            } else {
                setIsLoggedIn(true);
                setIsLoading(true);
            }
        });
    }, []);

    if (!isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={PrimaryColor} />
            </View>
        );
    }

    if (!isLoggedIn) {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Landing'>
                        <Stack.Screen
                            name='Landing'
                            component={LandingScreen}
                            // options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Register'
                            component={RegisterScreen}
                            // options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='RecoverPassword'
                            component={RecoverPWScreen}
                            // options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Main'>
                    <Stack.Screen name='Main' component={MainScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
