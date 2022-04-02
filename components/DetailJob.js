import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    ActivityIndicator
} from 'react-native'

const {width} = Dimensions.get('window')

function DetailJob({navigation, route}) {
    const [isLoading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Khi màn hình này xuất hiện kiểm tra xem đã có đăng nhập hay chưa
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Man hinh DetailJob')
            if (typeof global.userData == 'object' && global.userData.UserName != undefined) {
                setIsLogin(true)
            } else {
            }
        })

        return unsubscribe
    }, [navigation])

    //HÀm xử lý update task
    const handleBook = () => {
        var raw = JSON.stringify({
            IDUser: global.userData._id
        })

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        }

        fetch('http://localhost:3000/task/task-booked', requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                console.log('Respons Update: ', result)
            })
            .catch(error => console.log('error', error))
    }

    //Onpress Nhận việc này
    const onPressNhanViecNay = () => {
        if (isLogin) {
            setLoading(true)
            handleBook()
        } else {
            showToast('Vui lòng đăng nhập')
        }
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View>
                        <Text style={styles.text}>Người tạo {route.params.NameCreator}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{route.params.Name}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{route.params.Description}</Text>
                    </View>
                    <View style={styles.imgBox}>
                        <Image style={styles.img} source={{uri: route.params.secure_url}} />
                    </View>
                    <View>
                        <Text style={styles.text}>Tiền công {route.params.Price}</Text>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 24}}>
                        <TouchableOpacity
                            style={styles.btnBox}
                            onPress={() => {
                                onPressNhanViecNay()
                            }}>
                            <Text style={{fontSize: 18}}>Nhận việc này</Text>
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
    button: {
        width: '50%',
        borderRadius: 6,
        padding: 22,
        backgroundColor: 'gray',
        marginLeft: '25%',
        margin: 16,
        alignItems: 'center'
    },
    text: {
        marginLeft: 12,
        fontSize: 18,
        marginTop: 12
    },
    img: {
        width: '100%',
        height: 300,
        borderRadius: 4
    },
    imgBox: {
        margin: 12
    },
    btnBox: {
        borderWidth: 1,
        borderRadius: 4,
        width: '33.3%',
        height: 46,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#B1DABE',
        alignItems: 'center'
    }
})

export default DetailJob
