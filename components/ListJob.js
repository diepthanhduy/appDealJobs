import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'

function ListJob() {
    var dataTest = [
        {
            _id: '62320aa339d30d71ef40ff70',
            Name: 'Sửa ống',
            Description: 'Ống nước trong nhà tắm tôi bị hư, không ra nước',
            Picture:
                'https://file.hstatic.net/200000389525/file/ong-nuoc-hu-do-nguyen-nhan-do-dau-cach-khac-phuc-nhu-the-nao__3__8c58f5ddc6144c29a295011b29e1522c_master.jpg',
            Price: '100000',
            Status: 0,
            StatusDone: 0,
            IDUser: '62348b9b576c3e4345f89502',
            IDCategory: '62320c1c39d30d71ef40ff74',
            CreateDay: '2022-03-19T16:54:55.671Z'
        },
        {
            _id: '62349805b14ef22cbb7ed3c1',
            Name: 'Sửa ống nhà hàng',
            Description: 'Ống nước nhà bếp trong nhà hàng không ra nước',
            Picture:
                'https://file.hstatic.net/200000389525/file/ong-nuoc-hu-do-nguyen-nhan-do-dau-cach-khac-phuc-nhu-the-nao__3__8c58f5ddc6144c29a295011b29e1522c_master.jpg',
            Price: '100000',
            Status: 0,
            StatusDone: 0,
            IDUser: '62348b9b576c3e4345f89502',
            IDCategory: '62320c1c39d30d71ef40ff74',
            CreateDay: '2022-03-19T16:54:55.672Z'
        },
        {
            _id: '62349ad6c1ebe7f208bf22cf',
            Name: 'Dạy kèm học sinh lớp 3',
            Description: 'Cần dạy môn toán lớp 3',
            Picture: 'https://cf.shopee.vn/file/5e7876ccb2b952fb5894a95e5eff9e52g',
            Price: '100k/buổi',
            Status: 0,
            StatusDone: 0,
            IDUser: '62348b9b576c3e4345f89502',
            IDCategory: '6232090b39d30d71ef40ff6c',
            CreateDay: '2022-03-18T14:44:38.169Z'
        }
    ]
    return (
        <View>
            <FlatList
                style={styles.scroll}
                data={dataTest}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            console.log('ID item is: ' + item._id)
                        }}
                    >
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
