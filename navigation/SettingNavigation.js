import 'react-native-gesture-handler'
import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import SettingUser from '../components/SettingUser'
import Login from '../components/Login'

const Stack = createStackNavigator()

function JobToDetail() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="SettingUser" component={SettingUser} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default JobToDetail
