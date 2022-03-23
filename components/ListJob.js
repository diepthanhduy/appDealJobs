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

function ListJob() {
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
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }

        await fetch('http://10.0.2.2:3000/taskApi', requestOptions)
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
        handleGetTask()
    }, [])

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    style={styles.scroll}
                    data={dataTask}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log('ID item is: ' + item._id)
                                navigation.navigate('DetailJob', {
                                    Name: item.Name,
                                    Description: item.Description,
                                    secure_url: item.secure_url,
                                    Price: item.Price
                                })
                            }}>
                            <View style={styles.item}>
                                <View style={styles.frameName}>
                                    <Text style={styles.textName}>{item.Name}</Text>
                                </View>
                                <View style={styles.frameDesc}>
                                    <Text style={styles.description}>{item.Description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: '100%',
        paddingTop: 12
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        height: 96,
        borderRadius: 6,
        marginBottom: 4,
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#BDB515'
    },
    frameName: {
        marginTop: 4,
        marginLeft: 12
    },
    textName: {
        color: '#000',
        fontSize: 20
    },
    frameDesc: {
        marTop: 4,
        marginBottom: 2,
        marginLeft: 6,
        marginRight: 6
    },
    description: {
        color: '#000'
    }
})

export default ListJob
