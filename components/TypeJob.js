import React from 'react'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, Text } from 'react-native'

function TypeJob() {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>Bán thời gian</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>Phụ bếp</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>Thợ điện, nước</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>Sửa khóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%'
    },
    item: {
        width: '50%',
        borderRadius: 6,
        padding: 22,
        backgroundColor: 'gray',
        marginLeft: '25%',
        margin: 16,
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 18
    }
})

export default TypeJob
