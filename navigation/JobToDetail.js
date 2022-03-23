import 'react-native-gesture-handler'
import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import ListJob from '../components/ListJob'
import DetailJob from '../components/DetailJob'

const Stack = createStackNavigator()

function JobToDetail() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="ListJob" component={ListJob} />
            <Stack.Screen name="DetailJob" component={DetailJob} />
        </Stack.Navigator>
    )
}

export default JobToDetail
