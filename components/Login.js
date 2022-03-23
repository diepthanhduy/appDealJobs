import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'

function Login({navigation}) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Hàm xử lý POST user, pass
    const handleLogin = () => {
        const raw = JSON.stringify({
            UserName: user,
            PassWord: pass
        })

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: raw,
            redirect: 'follow'
        }

        fetch('http://10.0.2.2:3000/user/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.length == 0) {
                    showToast('Sai tài khoản mật khẩu')
                } else {
                    showToast(`Xin chào ${data[0].FullName}`)
                    global.userData = data[0]
                    navigation.goBack()
                }
            })
            .catch(err => {
                console.log('Lỗi fetch POST Login: ', err)
            })
    }

    //Hàm xử lý khi nhấn đăng nhập diepthanhduy
    const onPressLogin = () => {
        //Kiểm tra đủ thông tin chưa => POST về server
        if (user != '' && pass != '') {
            handleLogin()
        } else {
            showToast('Vui lòng nhập đủ thông tin')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DEAL JOBS</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    editale
                    onChangeText={text => setUser(text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    editale
                    onChangeText={text => setPass(text)}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onPressLogin()
                }}>
                <Text style={styles.text}>Đăng nhập</Text>
            </TouchableOpacity>
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
        height: 46,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4
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
