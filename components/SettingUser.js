import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {useNavigation} from '@react-navigation/native'

function SettingUser() {
    const navigation = useNavigation()

    const [urlImg, setUrl] = useState()
    const [defaultName, setNameDefalt] = useState('Đăng nhập tài khoản')
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [isLogin, setIsLogin] = useState(false)

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Khi màn hình này xuất hiện kiểm tra xem đã có đăng nhập hay chưa
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (typeof global.userData == 'object' && global.userData.UserName != undefined) {
                setUrl(global.userData.Picture)
                setNameDefalt(global.userData.FullName)
                setPhone(global.userData.Phone)
                setAddress(global.userData.Address)
                setIsLogin(true)
            } else {
                setUrl('https://res.cloudinary.com/dtd377/image/upload/v1647939596/unp3nb7epsqnakmo2nod.png')
            }
        })

        return unsubscribe
    }, [navigation])

    //Hàm xử lý đăng xuất
    const handleLogout = () => {
        global.userData = {}
        setUrl('https://res.cloudinary.com/dtd377/image/upload/v1647939596/unp3nb7epsqnakmo2nod.png')
        setNameDefalt('Đăng nhập tài khoản')
        setIsLogin(false)
    }

    //Hàm xử lý khi nhấn info user (nhấn vào ảnh đại diện)
    const onPressInfo = () => {
        if (isLogin) {
            navigation.navigate('InfoUser')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.box}
                onPress={() => {
                    onPressInfo()
                }}>
                <View style={styles.imgBox}>
                    <Image style={styles.img} source={{uri: urlImg}} />
                </View>
                <Text style={styles.textName}>{defaultName}</Text>
            </TouchableOpacity>

            {isLogin ? (
                <View>
                    <TouchableOpacity
                        style={styles.boxBtn}
                        onPress={() => {
                            navigation.navigate('CreateJob')
                        }}>
                        <Icon name="create" size={22} style={{marginRight: 16}} />
                        <Text style={styles.textBtn}>Tạo công việc</Text>
                    </TouchableOpacity>
                    <View style={styles.box}>
                        <Icon name="call-outline" size={18} style={{marginRight: 16}} />
                        <Text style={styles.text}>{global.userData.Phone}</Text>
                    </View>
                    <View style={styles.box}>
                        <Icon name="location-outline" size={18} style={{marginRight: 16}} />
                        <Text style={styles.text}>{global.userData.Address} </Text>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                handleLogout()
                            }}>
                            <Icon name="log-out-outline" size={22} style={{marginRight: 16, color: 'red'}} />
                            <Text style={[styles.text, {color: 'red'}]}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                navigation.navigate('Register')
                            }}>
                            <Icon name="person-add-outline" size={22} style={{marginRight: 16, color: '#24ACF2'}} />
                            <Text style={[styles.text, {color: '#24ACF2'}]}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                navigation.navigate('Login')
                            }}>
                            <Icon name="log-in-outline" size={22} style={{marginRight: 16, color: '#24ACF2'}} />
                            <Text style={[styles.text, {color: '#24ACF2'}]}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3FFBD',
        height: '100%'
    },
    box: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 4,
        marginBottom: 4,
        alignItems: 'center',
        backgroundColor: '#F6FFCB',
        padding: 8
    },
    textName: {
        fontSize: 22
    },
    text: {
        fontSize: 18
    },
    img: {
        width: '100%',
        height: 56,
        borderRadius: 50
    },
    imgBox: {
        width: 56,
        height: 56,
        marginRight: 16
    },
    btn: {
        flexDirection: 'row',
        marginLeft: 4
    },
    textBtn: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    boxBtn: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 4,
        marginBottom: 4,
        alignItems: 'center',
        backgroundColor: '#FBFFE7',
        padding: 8
    }
})

export default SettingUser
