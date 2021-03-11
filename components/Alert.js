import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

// Actions
import { removeAlert } from '../redux/actions/alert';

//Colors
import { GreenLight, White } from '../constants/colors';

const Alert = ({ alert, removeAlert }) => {
    if (alert.length > 0) {
        return (
            <View style={styles.alertContainer}>
                {alert.map((alert) => {
                    return (
                        <Text key={alert.id} style={styles.alertText}>
                            {alert.msg}
                        </Text>
                    );
                })}
            </View>
        );
    }

    return <View></View>;
};

const mapStateToProps = (state) => ({
    alert: state.alert,
});

const styles = StyleSheet.create({
    alertContainer: {
        backgroundColor: GreenLight,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    alertText: {
        color: White,
    },
});

export default connect(mapStateToProps, { removeAlert })(Alert);
