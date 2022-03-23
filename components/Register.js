import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'

function Login() {
    const [fullName, setFullName] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Hàm xử lý POST User về server
    const handlePostUser = () => {
        var raw = JSON.stringify({
            FullName: fullName,
            UserName: user,
            PassWord: confirm
        })

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: raw,
            redirect: 'follow'
        }

        fetch('http://10.0.2.2:3000/user/create-user', requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message == 'exist') {
                    showToast('Vui lòng chọn tên đăng nhập khác')
                } else {
                    showToast(`Xin chào ${result.FullName}`)
                }
            })
            .catch(error => console.log('error', error))
    }

    //Khi nhấn Đăng ký
    const onPressRegister = () => {
        //Kiểm tra xem đầy đủ thông tin?
        if (fullName == '' || user == '' || pass == '' || confirm == '') {
            showToast('Vui lòng điền đủ thông tin')
        } else {
            //Xác nhận mật khẩu có trùng?
            if (pass != confirm) {
                showToast('Xác nhận lại mật khẩu')
            } else {
                if (pass.length < 8) {
                    showToast('Mật khẩu có ít nhất 8 ký tự')
                } else {
                    handlePostUser()
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DEAL JOBS</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    editale
                    onChangeText={text => setFullName(text)}
                />
            </View>
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
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true}
                    editale
                    onChangeText={text => setConfirm(text)}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onPressRegister()
                }}>
                <Text style={styles.text}>Đăng ký</Text>
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
