import 'react-native-gesture-handler'
//import MapView from 'react-native-maps'
import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator} from 'react-native'

import MapView from 'react-native-maps'

function Map({route}) {
    return (
        <View>
            <MapView
                style={{width: '100%', height: '100%'}}
                initialRegion={{
                    latitude: Number(route.params.Latitude),
                    longitude: Number(route.params.Longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                <MapView.Marker
                    coordinate={{latitude: Number(route.params.Latitude), longitude: Number(route.params.Longitude)}}
                    title={'Nơi làm'}
                />
            </MapView>
        </View>
    )
}

export default Map
