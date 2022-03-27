import 'react-native-gesture-handler'

import React, {useState} from 'react'
import type {Node} from 'react'
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

//Import các components

import JobToDetail from './navigation/JobToDetail'
import Login from './components/Login'
import Register from './components/Register'
import SettingUser from './components/SettingUser'
import Notification from './components/Notification'
import ListJob from './components/ListJob'
import DetailJob from './components/DetailJob'
import SettingNavigation from './navigation/SettingNavigation'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import {LogBox} from 'react-native'

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"
])
const App: () => Node = () => {
    // <View>
    //     <DetailJob />
    // </View>

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#6FBFB1',
                    tabBarInactiveTintColor: '#7C8288'
                }}>
                <Tab.Screen
                    name="Task"
                    component={JobToDetail}
                    options={{
                        tabBarLabel: 'Task',
                        tabBarIcon: ({color, focused}) => {
                            let iconName
                            if (!focused) {
                                iconName = 'list-circle-outline'
                            } else {
                                iconName = 'list-circle'
                            }
                            return <Ionicons style={{color: color}} name={iconName} size={28} />
                        }
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        tabBarLabel: 'Notification',
                        tabBarIcon: ({color, focused}) => {
                            let iconName
                            if (!focused) {
                                iconName = 'notifications-outline'
                            } else {
                                iconName = 'notifications'
                            }
                            return <Ionicons style={{color: color}} name={iconName} size={28} />
                        }
                    }}
                />
                <Tab.Screen
                    name="SettingNavigation"
                    component={SettingNavigation}
                    options={{
                        tabBarLabel: 'Setting',
                        tabBarIcon: ({color, focused}) => {
                            let iconName
                            if (!focused) {
                                iconName = 'settings-outline'
                            } else {
                                iconName = 'settings'
                            }
                            return <Ionicons style={{color: color}} name={iconName} size={28} />
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default App
