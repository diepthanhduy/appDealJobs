import React from 'react'

import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'

function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>DEAL JOBS</Text>
            <View>
                <TextInput style={styles.input} placeholder="Tên đăng nhập" />
            </View>
            <View>
                <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={true} />
            </View>
            <View style={styles.button}>
                <TouchableOpacity>
                    <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 56
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    button: {
        width: '50%',
        borderRadius: 6,
        padding: 22,
        backgroundColor: 'gray',
        marginLeft: '25%',
        margin: 16,
        marginTop: 56,
        alignItems: 'center'
    }
})

export default Login
