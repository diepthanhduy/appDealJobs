import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {useNavigation} from '@react-navigation/native'

function SettingUser() {
    const navigation = useNavigation()

    const [urlImg, setUrl] = useState(
        'https://res.cloudinary.com/dtd377/image/upload/v1647939596/unp3nb7epsqnakmo2nod.png'
    )

    const [defaultName, setNameDefalt] = useState('Đăng nhập tài khoản')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (typeof global.userData == 'object') {
                setUrl(global.userData.Picture)
                setNameDefalt(global.userData.FullName)
                console.log('Picture: ', global.userData.Picture)
            }
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.imgBox}>
                    <Image style={styles.img} source={{uri: urlImg}} />
                </View>
                <Text style={styles.textName}>{defaultName}</Text>
            </View>
            <View style={styles.box}>
                <Icon name="call-outline" size={18} style={{marginRight: 16}} />
                <Text style={styles.text}>0839509898</Text>
            </View>
            <View style={styles.box}>
                <Icon name="location-outline" size={18} style={{marginRight: 16}} />
                <Text style={styles.text}>675/15/1 Tran Xuan Soan Q7 TP.HCM</Text>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.btn}>
                    <Icon name="log-out-outline" size={22} style={{marginRight: 16, color: 'red'}} />
                    <Text style={[styles.text, {color: 'red'}]}>Đăng xuất</Text>
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
    }
})

export default SettingUser
