import React from 'react'

import { View, Text, StyleSheet, Image, TextInput } from 'react-native'

function InfoUser() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Ảnh</Text>
                <Image source={require('../Assets/song5NgayChuaGiongBao.jpg')} style={styles.img} />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Tên</Text>
                <TextInput style={styles.textBox} editable maxLength={40} placeholder="Tên người dùng" />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Miêu tả</Text>
                <TextInput style={styles.textBox} editable maxLength={500} placeholder="Mô tả công việc" />
            </View>

            <View style={styles.marTop}>
                <Text style={styles.title}>Tiền</Text>
                <TextInput style={styles.textBox} editable maxLength={10} placeholder="Số tiền cho việc này" />
            </View>
        </View>
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
    marTop: {
        marginTop: 24
    }
})

export default InfoUser
