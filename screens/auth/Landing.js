import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import GoogleIcon from '../../components/svg/GoogleIcon';

// Actions
import { fetchUser } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';

// Validatin hook
import { useForm, Controller } from 'react-hook-form';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

// Colors
import { PrimaryColor, White, Red, DisabledColor } from '../../constants/colors';

//Components
import Alert from '../../components/Alert';

const Landing = ({ navigation, fetchUser, alert, setAlert }) => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { control, handleSubmit, errors, setValue, setError, clearErrors } = useForm();

    const onSignIn = async (data) => {
        setDisabled(true);
        const { email, password } = data;

        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            fetchUser();
            setDisabled(false);
        } catch (error) {
            console.log(error);
            setError('firebaseError', error);
            setDisabled(false);
        }
    };

    // const onGoogleSignIn = () => {
    //     console.log('test');
    //     let provider = new firebase.auth.GoogleAuthProvider();
    //     firebase.auth().useDeviceLanguage();
    //     firebase
    //         .auth()
    //         .signInWithPopup(provider)
    //         .then((result) => {
    //             var credential = result.credential;

    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             var token = credential.accessToken;
    //             // The signed-in user info.
    //             var user = result.user;

    //             console.log(result);
    //         })
    //         .catch((error) => {
    //             // Handle Errors here.
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             // The email of the user's account used.
    //             var email = error.email;
    //             // The firebase.auth.AuthCredential type that was used.
    //             var credential = error.credential;
    //             // ...

    //             console.log(error);
    //         });
    // };

    // console.log(errors);

    return (
        <View style={styles.parentContainer}>
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
                                        clearErrors('firebaseError');
                                        clearErrors('email');
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
                    {errors.firebaseError && <Text style={styles.error}>Invalid credentials</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'Password is required.',
                        }}
                        render={(props) => (
                            <View style={styles.input}>
                                <TextInput
                                    {...props}
                                    placeholder='Insert password'
                                    secureTextEntry
                                    onChangeText={(val) => {
                                        props.onChange(val);
                                        clearErrors('firebaseError');
                                        clearErrors('password');
                                    }}
                                />
                            </View>
                        )}
                    />
                    {errors.password && errors.password.type === 'required' && (
                        <Text style={styles.error}>Password is required.</Text>
                    )}
                    {errors.firebaseError && <Text style={styles.error}>Invalid credentials</Text>}
                </View>

                <TouchableOpacity
                    disabled={disabled}
                    onPress={handleSubmit(onSignIn)}
                    style={disabled ? styles.btnDisabled : styles.btn}>
                    <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.btnBareContainer}>
                    <Text>Did not register yet? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.btnBare}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
                    <Text style={styles.btnBare}>Forgot password?</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.btnProvider}>
                <FontAwesome
                    name='facebook-square'
                    size={15}
                    style={{ marginRight: 5 }}
                    color='#3b5998'
                />
                <Text style={styles.btnTextProvider}>Sign in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onGoogleSignIn()} style={styles.btnProvider}>
                <GoogleIcon style={styles.svgContainer} />

                <Text style={styles.btnTextProvider}>Sign in with Google</Text>
            </TouchableOpacity> */}
            </View>
            <Alert />
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        marginHorizontal: 25,
        marginTop: 25,
    },
    svgContainer: {
        height: 15,
        width: 15,
        marginRight: 5,
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
    btnTextProvider: {
        color: PrimaryColor,
        fontWeight: 'bold',
    },

    btnProvider: {
        borderWidth: 1,
        borderColor: PrimaryColor,
        padding: 10,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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

const mapStateToProps = (state) => ({
    alert: state.alert,
});

export default connect(mapStateToProps, { fetchUser, setAlert })(Landing);
