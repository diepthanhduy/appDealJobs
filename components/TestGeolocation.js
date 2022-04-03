//import MapView from 'react-native-maps'
import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import GetLocation from 'react-native-get-location'

function Map() {
    const tt = () => {
        Geolocation.getCurrentPosition(
            location => {
                console.log(location)
            },
            err => {
                console.log('Lỗi: ', err)
            },
            {
                timeout: 15000,
                enableHighAccuracy: false
            }
        )
    }

    const handleGetLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 15000
        })
            .then(location => {
                console.log(location)
            })
            .catch(error => {
                const {code, message} = error
                if (code == 'UNAUTHORIZED') {
                    showToast('Không lấy được vị trí hiện tại')
                }
            })
    }
    return (
        <View>
            <Text
                onPress={() => {
                    tt()
                    console.log('onpress Text')
                }}>
                Màn hình Test Lib GetLocation
            </Text>
        </View>
    )
}

export default Map
