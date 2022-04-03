import 'react-native-gesture-handler'

import React, {useEffect, useState} from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'
import GetLocation from 'react-native-get-location'

function CreateJob({navigation}) {
    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [description, setDescripton] = useState('')
    const [price, setPrice] = useState('')
    const [public_id, setPublicID] = useState('')
    const [secure_url, setSecureUrl] = useState('')
    const [isLoading, setLoading] = useState(false)

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
    /*====================CHÚ Ý ============================
    BƯỚC 1: handleUpToCloud => BƯỚC 2: lấy location => BƯỚC 3: handelPostTask
    ========================================================*/

    //Hàm xử lý khi mở thư viện ảnh
    const handleOpenGallery = () => {
        ImagePicker.openPicker({
            cropping: false,
            mediaType: 'photo'
        })
            .then(data => {
                //Lấy ảnh từ thư viện (data) thành công
                setImage(data)
            })
            .catch(err => {
                console.log('Lỗi mở Lib: ' + err)
            })
    }

    //Hàm Upload ảnh lên Cloudinary
    const handleUpToCloud = () => {
        var newImage = {
            uri: image.path,
            type: image.mime,
            name: `test/${image.path.split('/')[9]}`
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
                console.log('RES: ', dataCloud)
                handleGetLocation(dataCloud)
            })
            .catch(err => {
                console.log('Lỗi Upload to Cloud: ', err)
            })
    }

    //Hàm lấy vị trí hiện tại
    const handleGetLocation = cloud => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 15000
        })
            .then(location => {
                cloud['Latitude'] = location.latitude
                cloud['Longitude'] = location.longitude
                handelPostTask(cloud)
            })
            .catch(error => {
                handelPostTask(cloud)
                const {code, message} = error
                if (code == 'UNAUTHORIZED') {
                    showToast('Không lấy được vị trí hiện tại')
                }
            })
    }

    //Hàm xử lý đưa data về server (lưu vào DB)
    const handelPostTask = resCloud => {
        //Tạo header cho phương thức fetch
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        //Tạo Obj đưa vào body
        //Dua cac state da tao vao obj nay
        var raw = JSON.stringify({
            Name: name,
            Description: description,
            Price: price,
            public_id: resCloud.public_id,
            secure_url: resCloud.secure_url,
            PhoneCreator: global.userData.Phone,
            NameCreator: global.userData.FullName,
            AddressCreator: global.userData.Address,
            IDCreator: global.userData._id,
            Latitude: resCloud.Latitude,
            Longitude: resCloud.Longitude
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch('http://10.0.2.2:3000/task', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('Response POST: ', data)
            })
            .catch(err => {
                console.log('Lỗi fetch POST', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    //Hàm xử lý khi mở Camera
    const handleOpenCamera = () => {
        console.log('Camere không khả dụng trên máy ảo')
        showToast('Camera máy ảo không hoạt động')
    }

    //Hàm xử lý khi nhấn nút Tạo công việc
    const onPressUpLoad = () => {
        if (name != '' && description != '' && price != '') {
            setLoading(true)
            handleUpToCloud()
        } else {
            showToast('Vui lòng nhập đủ thông tin')
        }
    }

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View>
                        <Text style={styles.labelInput}>Tên công việc</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tạo một tên cho công việc mới.."
                            editale
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.labelInput}>Nội dung công việc</Text>
                        <TextInput
                            style={styles.inputArea}
                            multiline={true}
                            placeholder="Thêm nhiều thông về công việc tại đây..."
                            editale
                            onChangeText={text => setDescripton(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.labelInput}>Giá tiền</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tạo giá để đối tác có thể biết thêm..."
                            editale
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.labelInput}>Thêm ảnh</Text>
                    </View>
                    <View style={styles.boxAdd}>
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => {
                                handleOpenGallery()
                            }}>
                            <Text style={styles.text}>
                                <Icon name="image-outline" size={30} />
                                Thư viện
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => {
                                handleOpenCamera()
                            }}>
                            <Text style={styles.text}>
                                <Icon name="camera-outline" size={30} />
                                Camera
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {image ? (
                        <View style={styles.boxImg}>
                            <Image style={styles.img} source={{uri: image.path}} />
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() => {
                                    //Hàm Tạo công việc (up lên Cloud và POST về server)
                                    onPressUpLoad()
                                }}>
                                <Text style={styles.text}>
                                    <Icon name="push-outline" size={30} />
                                    Tạo việc làm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3FFBD',
        height: '100%'
    },
    text: {
        fontSize: 18
    },
    labelInput: {
        fontSize: 18,
        marginLeft: 12
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginTop: 3,
        marginRight: 12,
        marginBottom: 12,
        marginLeft: 12,
        borderRadius: 4
    },
    inputArea: {
        height: 96,
        borderWidth: 1,
        marginTop: 3,
        marginRight: 12,
        marginBottom: 12,
        marginLeft: 12,
        textAlignVertical: 'top',
        borderRadius: 4
    },
    addBtn: {
        borderWidth: 1,
        borderRadius: 4,
        width: '33.3%',
        marginLeft: 12,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#B1DABE'
    },
    boxAdd: {
        flexDirection: 'row'
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 4,
        margin: 12
    },
    boxImg: {
        marginTop: 8
    }
})

export default CreateJob
