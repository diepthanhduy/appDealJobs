import 'react-native-gesture-handler'
import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import SettingUser from '../components/SettingUser'
import Login from '../components/Login'
import CreateJob from '../components/CreateJob'
import InfoUser from '../components/InfoUser'
import Register from '../components/Register'
import TasksBooked from '../components/TasksBooked'
import TasksCreated from '../components/TasksCreated'

const Stack = createStackNavigator()

function JobToDetail() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="SettingUser" component={SettingUser} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateJob" component={CreateJob} />
            <Stack.Screen name="InfoUser" component={InfoUser} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="TasksBooked" component={TasksBooked} />
            <Stack.Screen name="TasksCreated" component={TasksCreated} />
        </Stack.Navigator>
    )
}

export default JobToDetail
