import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

// Actions
import { fetchUser } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';

// Validatin hook
import { useForm, Controller } from 'react-hook-form';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Colors
import { PrimaryColor, White, Red, DisabledColor } from '../../constants/colors';

const Recover = ({ navigation, setAlert }) => {
    const { control, handleSubmit, errors, setValue, setError } = useForm();
    const [disabled, setDisabled] = useState(false);

    const onRecover = async (data) => {
        setDisabled(true);
        firebase.auth().useDeviceLanguage();
        firebase
            .auth()
            .sendPasswordResetEmail(data.email)
            .then(function () {
                console.log('Email sent.');
                navigation.navigate('Landing');
                setAlert('Password reset email has been sent.');
                setDisabled(false);
            })
            .catch(function (error) {
                console.log(error);
                setError('firebaseError', error);
                setDisabled(false);
            });
    };

    return (
        <View style={styles.container}>
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
                                placeholder='Insert e-mail'
                                onChangeText={(val) => {
                                    props.onChange(val);
                                }}
                            />
                        </View>
                    )}
                />
                {errors.email && errors.email.type === 'required' && (
                    <Text style={styles.error}>E-mail is required.</Text>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                    <Text style={styles.error}>E-mail is in wrong format.</Text>
                )}
                {errors.firebaseError && (
                    <Text style={styles.error}>
                        This email address is not found in our database.
                    </Text>
                )}
            </View>
            <TouchableOpacity
                disabled={disabled}
                onPress={handleSubmit(onRecover)}
                style={disabled ? styles.btnDisabled : styles.btn}>
                <Text style={styles.btnText}>Recover Password</Text>
            </TouchableOpacity>
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
    btnDisabled: {
        backgroundColor: DisabledColor,
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

export default connect(null, { setAlert })(Recover);
