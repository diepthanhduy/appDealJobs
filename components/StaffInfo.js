import React from 'react'

import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'

function StaffInfo() {
    return (
        <View>
            <ScrollView style={styles.scroll}>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <View style={styles.frameName}>
                            <Text style={styles.textName}>Anh A</Text>
                        </View>
                        <View style={styles.frameDesc}>
                            <Text style={styles.description}>
                                Mô tả công việc này cần có một người làm phụ cho tôi làm mấy thứ linh tinh như là là là
                                vầy nè
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
        backgroundColor: '#E1ECF7'
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

export default StaffInfo
