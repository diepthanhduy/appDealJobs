import 'react-native-gesture-handler'
import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ToastAndroid
} from 'react-native'

import {useNavigation} from '@react-navigation/native'

function TasksBooked() {
    const [isLoading, setLoading] = useState(true)
    const [dataTask, setData] = useState([])
    const navigation = useNavigation()

    //show toast (Thông báo)
    const showToast = mess => {
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    //Hàm call api GET list Task
    const handleGetTask = async () => {
        //option fetch

        var raw = JSON.stringify({
            IDUserBook: global.userData._id
        })

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        }

        fetch('http://10.0.2.2:3000/task/task-booked', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('Response GET: Success')
                setData(data)
            })
            .catch(err => {
                console.log('Lỗi fetch GET: ', err)
                showToast('Đã xảy ra lỗi')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    //Call api
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Man hinh DetailJob')
            handleGetTask()
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{backgroundColor: '#F3FFBD'}}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <Text style={styles.title}>Công việc đã nhận</Text>
                    <FlatList
                        style={styles.scroll}
                        data={dataTask}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('DetailJob', {
                                        ShowOnly: false,
                                        Name: item.Name,
                                        Description: item.Description,
                                        secure_url: item.secure_url,
                                        Price: item.Price,
                                        NameCreator: item.NameCreator
                                    })
                                }}>
                                <View style={styles.item}>
                                    <View style={styles.frameUser}>
                                        <View style={styles.imgBox}>
                                            <Image style={styles.img} source={{uri: item.secure_url}} />
                                        </View>
                                        <Text style={styles.userName}>{item.NameCreator}</Text>
                                    </View>
                                    <View style={styles.line}></View>
                                    <View style={styles.frameName}>
                                        <Text style={styles.textName}>{item.Name}</Text>
                                    </View>
                                    <View style={styles.frameDesc}>
                                        <Text numberOfLines={3} style={styles.description}>
                                            {item.Description}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        height: 146,
        borderRadius: 6,
        marginBottom: 4,
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#FBFFE7'
    },
    frameName: {
        marginLeft: 12
    },
    textName: {
        color: '#000',
        fontSize: 18
    },
    frameDesc: {
        marTop: 4,
        marginBottom: 2,
        marginLeft: 12,
        marginRight: 12
    },
    description: {
        color: '#000'
    },
    img: {
        width: '100%',
        height: 34,
        borderRadius: 50
    },
    imgBox: {
        width: 34,
        height: 34,
        marginRight: 8
    },
    frameUser: {
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 4,
        flexDirection: 'row'
    },
    line: {
        borderBottomColor: '#5E5E5E',
        borderBottomWidth: 0.3,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8
    },
    userName: {
        color: '#5E5E5E',
        fontSize: 18,
        marginTop: 2
    }
})

export default TasksBooked
