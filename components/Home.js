import React from 'react'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, Text } from 'react-native'

function Home() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Tìm kiếm việc làm</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Tạo công việc</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Cần công việc</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
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
        color: '#fff',
        fontSize: 18
    }
})

export default Home
