import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'

function CreateJob() {
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [description, setDescripton] = useState()
    const [price, setPrice] = useState()
    const [public_id, setPublicID] = useState()
    const [secure_url, setSecureUrl] = useState()

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
    const handleUpToCloud = async () => {
        var newImage = {
            uri: image.path,
            type: image.mime,
            name: `test/${image.path.split('/')[9]}`
        }

        //Upload
        const formData = new FormData()
        formData.append('file', newImage)
        formData.append('upload_preset', 'dealjob')
        formData.append('cloud_name', 'dtd377')
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dtd377/image/upload', {
                method: 'POST',
                body: formData,
                redirect: 'follow',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const resData = await res.json()
            console.log('Respone from Cloud: ', resData.public_id)
            console.log('Respone from Cloud: ', resData.secure_url)
            setPublicID(resData.public_id)
            setSecureUrl(resData.secure_url)
        } catch (error) {
            console.log('Lỗi fetch: ', error)
        }
    }

    //Hàm xử lý đưa data về server (lưu vào DB)
    const handelPostTask = async () => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        //Tạo Obj đưa vào body
        //Dua cac state da tao vao obj nay
        var raw = JSON.stringify({
            Name: name,
            Description: description,
            Price: price,
            public_id: public_id,
            secure_url: secure_url
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        try {
            const res = await fetch('http://localhost:3000/taskApi', requestOptions)
            const resData = await res.json()
            console.log('Resopnse POST: ', resData)
        } catch (error) {
            console.log('Lỗi fetch POST: ', error)
        }
    }

    //Hàm xử lý khi mở Camera
    const handleOpenCamera = () => {
        console.log('Camere không khả dụng trên máy ảo')
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.labelInput}>Tên công việc</Text>
                <TextInput style={styles.input} placeholder="Tạo một tên cho công việc mới.." />
            </View>
            <View>
                <Text style={styles.labelInput}>Nội dung công việc</Text>
                <TextInput
                    style={styles.inputArea}
                    multiline={true}
                    placeholder="Thêm nhiều thông về công việc tại đây..."
                />
            </View>
            <View>
                <Text style={styles.labelInput}>Giá tiền</Text>
                <TextInput style={styles.input} placeholder="Tạo giá để đối tác có thể biết thêm..." />
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
                            handleUpToCloud()
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
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
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
