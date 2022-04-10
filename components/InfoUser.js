import 'react-native-gesture-handler'

import React, {useEffect, useState} from 'react'

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'

function InfoUser({navigation}) {
    const [image, setImage] = useState(global.userData.Picture) // Lưu Url của ảnh
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [expectedPrice, setExpectedPrice] = useState('') //Tiền

    const [dataImg, setDataImg] = useState('') // tất cả thông tin của cái ảnh mới khi được chọn

    const [isChangeImg, setIsChangeImg] = useState(false)

    const [isPuting, setIsPuting] = useState(false)

    //Khi màn hình xuất hiện. Hàm này sẽ được thực thi
    useEffect(() => {
        //setImage(global.userData.Picture)
        console.log('Màn hình InfoUser')
    }, [])

    //onpress image (Hàm khi nhấn vào ảnh)
    const onPressImg = () => {
        handleOpenGallery()
    }

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Hàm kiểm tra xem text input nào thay đổi
    const handleCheckChange = data => {
        //Tạo một Obj có tất cả các trường có thể thay đổi được
        const allTextInput = {
            _id: global.userData._id,
            FullName: fullName,
            Phone: phone,
            Address: address,
            Description: description,
            ExpectedPrice: expectedPrice,
            public_id: data.public_id,
            Picture: data.secure_url
        }
        //Khởi tạo obj này lưu các trường được thay đổi
        var dataUpdate = {}
        //Kiểm tra xem trường nào được thay đổi thì đưa vào dataUpdate
        for (const [key, value] of Object.entries(allTextInput)) {
            if (value != '') {
                dataUpdate[key] = value
            }
        }
        if (isChangeImg) {
            dataUpdate['public_id_old'] = global.userData.public_id
        }
        //Trả về obj là các trường bị thay đổi
        return dataUpdate
    }

    //Hàm xử lý khi mở thư viện ảnh
    const handleOpenGallery = () => {
        ImagePicker.openPicker({
            cropping: false,
            mediaType: 'photo'
        })
            .then(data => {
                //Lấy ảnh từ thư viện (data) thành công
                setImage(data.path) //để hiện thị ra màn hình
                setDataImg(data) //để lấy data post
                setIsChangeImg(true) //Thay đổi trạng thái là đã có chọn ảnh
                console.log('Đã chọn ảnh mới')
            })
            .catch(err => {
                console.log('Lỗi mở Lib: ' + err)
            })
    }

    //Hàm Upload ảnh lên Cloudinary
    const handleUpToCloud = () => {
        var newImage = {
            uri: dataImg.path,
            type: dataImg.mime,
            name: `test/${dataImg.path.split('/')[9]}`
        }

        //Tạo FormData để đưa vào body
        const formData = new FormData()
        formData.append('file', newImage)
        formData.append('upload_preset', 'dealjob')
        formData.append('cloud_name', 'dtd377')

        //options của fetch
        const options = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        fetch('https://api.cloudinary.com/v1_1/dtd377/image/upload', options)
            .then(res => res.json())
            .then(dataCloud => {
                setIsPuting(true)
                //console.log('Response Cloud: ', dataCloud)
                return dataCloud
            })
            .then(dataCloud => {
                const data = handleCheckChange(dataCloud)
                return data
            })
            .then(data => {
                handlePut(data) //lấy được url ảnh trên cloud sau đó đẩy về server
            })
            .catch(err => {
                console.log('Lỗi Upload to Cloud: ', err)
            })
    }

    //PUT api
    const handlePut = dataRaw => {
        const raw = JSON.stringify(dataRaw)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        }
        fetch('http://10.0.2.2:3000/user/update', requestOptions)
            .then(response => response.json())
            .then(result => {
                global.userData = result
                console.log('Resopnse from PUT: ', result)
                setIsPuting(false)
            })
            .catch(error => console.log('error', error))
    }

    //onPress Xác nhận
    const onPressXacNhan = () => {
        if (isChangeImg) {
            /*Nếu có thay đổi ảnh thì up ảnh lên cloud trước*/
            setIsPuting(true)
            handleUpToCloud()
        } else {
            /*Nếu ko có up ảnh lên thì chỉ chạy 1 hàm đẩy vể server với url ''*/
            setIsPuting(true)
            const obj = handleCheckChange({public_id: '', secure_url: ''})
            handlePut(obj)
        }
    }

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
            {isPuting ? (
                <ActivityIndicator />
            ) : (
                <View>
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
                            placeholder={global.userData.FullName}
                            onChangeText={text => setFullName(text)}
                        />
                    </View>

                    <View style={styles.marTop}>
                        <Text style={styles.title}>Số điện thoại</Text>
                        <TextInput
                            style={styles.textBox}
                            editable
                            maxLength={40}
                            placeholder={global.userData.Phone}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>

                    <View style={styles.marTop}>
                        <Text style={styles.title}>Địa chỉ</Text>
                        <TextInput
                            style={styles.textBox}
                            editable
                            maxLength={40}
                            placeholder={global.userData.Address}
                            onChangeText={text => setAddress(text)}
                        />
                    </View>

                    <View style={styles.marTop}>
                        <Text style={styles.title}>Miêu tả</Text>
                        <TextInput
                            style={styles.textBox}
                            editable
                            maxLength={500}
                            placeholder={global.userData.Description}
                            onChangeText={text => setDescription(text)}
                        />
                    </View>

                    <View style={styles.marTop}>
                        <Text style={styles.title}>Tiền</Text>
                        <TextInput
                            style={styles.textBox}
                            editable
                            maxLength={10}
                            placeholder={global.userData.ExpectedPrice}
                            onChangeText={text => setExpectedPrice(text)}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={[styles.button, styles.marTop]}
                            onPress={() => {
                                onPressXacNhan()
                            }}>
                            <Text style={styles.text}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
