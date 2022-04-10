import 'react-native-gesture-handler'
//import MapView from 'react-native-maps'
import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator} from 'react-native'

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import GetLocation from 'react-native-get-location'

function Map({route}) {
    const [data, setData] = useState([])
    const [userLocation, setUserLocation] = useState({})
    const [isShow, setIsShow] = useState(false)
    const [locNear, setLocNear] = useState([])

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

        fetch('http://10.0.2.2:3000/task', requestOptions)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
            .catch(err => {
                console.log('Lỗi fetch GET: ', err)
                showToast('Đã xảy ra lỗi')
            })
    }

    //Hàm lấy vị trí hiện tại
    const handleGetLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 15000
        })
            .then(location => {
                console.log('Lấy vị trí thành công')
                setUserLocation(location)
            })
            .catch(error => {
                const {code, message} = error
                if (code == 'UNAUTHORIZED') {
                    showToast('Không lấy được vị trí hiện tại')
                }
            })
    }

    //hiện vị trí xung quanh
    const onPressShowlocationUser = () => {
        if (userLocation.latitude) {
            var dataNear = []
            setIsShow(true)
            const arrNew = data.filter(task => task.Latitude != '')
            arrNew.forEach(item => {
                if (handleDistance(userLocation.latitude, userLocation.longitude, item.Latitude, item.Longitude) < 10) {
                    dataNear.push({latitude: item.Latitude, longitude: item.Longitude})
                }
            })
        }
        setLocNear(dataNear)
        console.log(dataNear)
    }

    //Call api
    useEffect(() => {
        handleGetTask()
        handleGetLocation()
    }, [])

    //Hàm tính khoảng cách giữa 2 điểm công thức haversince
    // Lấy từ https://helpex.vn/question/tinh-khoang-cach-giua-hai-diem-kinh-do-vi-do-cong-thuc-haversine-5cb0233aae03f645f420fac4
    function handleDistance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295 // Math.PI / 180
        var c = Math.cos
        var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

        return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
    }
    return (
        <View style={{flex: 1}}>
            <View style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}>
                <Text
                    onPress={() => {
                        onPressShowlocationUser()
                    }}
                    style={styles.title}>
                    Vị trí công việc xung quanh*
                </Text>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={{flex: 1}}
                initialRegion={{
                    latitude: Number(route.params.Latitude),
                    longitude: Number(route.params.Longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                {isShow
                    ? locNear.map((item, index) => {
                          return (
                              <MapView.Marker
                                  key={index}
                                  coordinate={{latitude: Number(item.latitude), longitude: Number(item.longitude)}}
                                  title={'Chỗ lân cận'}
                              />
                          )
                      })
                    : null}
                <MapView.Marker
                    coordinate={{latitude: Number(route.params.Latitude), longitude: Number(route.params.Longitude)}}
                    title={'Nơi làm'}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#007ACC',
        left: 12,
        top: 4,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: 'rgba(52, 52, 52, 0.2)'
    }
})

export default Map
