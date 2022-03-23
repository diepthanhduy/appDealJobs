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
    Dimensions
} from 'react-native'

const {width} = Dimensions.get('window')

function DetailJob({navigation, route}) {
    return (
        <View style={styles.container}>
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
                <TouchableOpacity style={styles.btnBox}>
                    <Text style={{fontSize: 18}}>Nhận việc này</Text>
                </TouchableOpacity>
            </View>
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
