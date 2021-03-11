import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

// Actions
import { fetchUser } from '../../redux/actions/auth';

// Validatin hook
import { useForm, Controller } from 'react-hook-form';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Colors
import { PrimaryColor, White, Red } from '../../constants/colors';

// Localization
import i18n from 'i18n-js';
import { enTranslations, frTranslations, nlTranslations } from '../../config/localization';

i18n.translations = {
    en: enTranslations,
    nl: nlTranslations,
    fr: frTranslations,
};

const Register = ({ navigation, fetchUser }) => {
    const { control, handleSubmit, errors, setValue, setError } = useForm();

    const onRegister = async (data) => {
        const { name, email, password } = data;
        try {
            const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if (newUser) {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                    name,
                    email,
                });
            }
            fetchUser();
        } catch (error) {
            console.log(error);
            setError('firebase', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Name is required.',
                    }}
                    render={(props) => (
                        <View style={styles.input}>
                            <TextInput
                                {...props}
                                placeholder={i18n.t('insertName')}
                                onChangeText={(val) => {
                                    props.onChange(val);
                                }}
                            />
                        </View>
                    )}
                />
                {errors.name && errors.name.type === 'required' && (
                    <Text style={styles.error}>{i18n.t('nameIsRequired')}</Text>
                )}
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'E-mail is required.',
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    }}
                    render={(props) => (
                        <View style={styles.input}>
                            <TextInput
                                {...props}
                                placeholder={i18n.t('insertEmail')}
                                onChangeText={(val) => {
                                    props.onChange(val);
                                }}
                            />
                        </View>
                    )}
                />
                {errors.email && errors.email.type === 'required' && (
                    <Text style={styles.error}>{i18n.t('emailIsRequired')}</Text>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                    <Text style={styles.error}>{i18n.t('emailIsInWrongFormat')}</Text>
                )}
                {errors.firebase && <Text style={styles.error}>{i18n.t('emailAlreadyInUse')}</Text>}
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{i18n.t('password')}</Text>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Password is required.',
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    }}
                    render={(props) => (
                        <View style={styles.input}>
                            <TextInput
                                {...props}
                                secureTextEntry
                                placeholder={i18n.t('insertPassword')}
                                onChangeText={(val) => {
                                    props.onChange(val);
                                }}
                            />
                        </View>
                    )}
                />
                {errors.password && errors.password.type === 'required' && (
                    <Text style={styles.error}>{i18n.t('passwordIsRequired')}</Text>
                )}
                {errors.password && errors.password.type === 'pattern' && (
                    <Text style={styles.error}>{i18n.t('passwordRegEx')}</Text>
                )}
            </View>

            <TouchableOpacity onPress={handleSubmit(onRegister)} style={styles.btn}>
                <Text style={styles.btnText}>{i18n.t('register')}</Text>
            </TouchableOpacity>
            <View style={styles.btnBareContainer}>
                <Text>{i18n.t('alreadyRegistered')} </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
                    <Text style={styles.btnBare}>{i18n.t('signIn')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
        marginTop: 25,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'solid',
    },
    btn: {
        backgroundColor: PrimaryColor,
        padding: 10,
        textAlign: 'center',
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: White,
        fontWeight: 'bold',
    },
    btnBareContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    btnBare: {
        color: PrimaryColor,
    },
    error: {
        color: Red,
        fontSize: 12,
    },
});

export default connect(null, { fetchUser })(Register);
