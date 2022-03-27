import 'react-native-gesture-handler'

import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'

function InfoUser({navigation}) {
    const [image, setImage] = useState()

    //Khi màn hình xuất hiện
    useEffect(() => {
        setImage(global.userData.Picture)
        console.log('Xuất hiện screen')
    }, [])

    //onpress image (Hàm khi nhấn vào ảnh)
    const onPressImg = () => {
        handleOpenGallery()
    }

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Hàm xử lý khi mở thư viện ảnh
    const handleOpenGallery = () => {
        ImagePicker.openPicker({
            cropping: false,
            mediaType: 'photo'
        })
            .then(data => {
                //Lấy ảnh từ thư viện (data) thành công
                setImage(data.path)
            })
            .catch(err => {
                console.log('Lỗi mở Lib: ' + err)
            })
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Ảnh</Text>
                <TouchableOpacity
                    style={styles.imgBtn}
                    onPress={() => {
                        onPressImg()
                    }}>
                    <Image source={{uri: image}} style={styles.img} />
                </TouchableOpacity>
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Tên</Text>
                <TextInput
                    style={styles.textBox}
                    editable
                    maxLength={40}
                    placeholder="Tên người dùng"
                    value={global.userData.FullName}
                />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Số điện thoại</Text>
                <TextInput
                    style={styles.textBox}
                    editable
                    maxLength={40}
                    placeholder="Số điện thoại"
                    value={global.userData.Phone}
                />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Địa chỉ</Text>
                <TextInput
                    style={styles.textBox}
                    editable
                    maxLength={40}
                    placeholder="Địa chỉ"
                    value={global.userData.Address}
                />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Miêu tả</Text>
                <TextInput style={styles.textBox} editable maxLength={500} placeholder="Mô tả công việc" />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Tiền</Text>
                <TextInput style={styles.textBox} editable maxLength={10} placeholder="Số tiền cho việc này" />
            </View>

            <View style={[styles.marTop, {alignItems: 'center'}]}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 12
    },
    img: {
        width: 124,
        height: 124,
        borderRadius: 4
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textBox: {
        borderWidth: 0.5,
        borderRadius: 4
    },
    text: {
        fontSize: 18
    },
    marTop: {
        marginTop: 24
    },
    imgBtn: {
        width: 130
    },
    button: {
        width: '33%',
        borderRadius: 6,
        padding: 12,
        backgroundColor: '#63AED6',
        alignItems: 'center'
    }
})

export default InfoUser
