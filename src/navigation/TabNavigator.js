import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import AlarmScreen from '../screens/AlarmScreen';
import SensorScreen from '../screens/SensorScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home1"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export const TabNavigator = () => {
    return (
        <NavigationContainer >
            <Tab.Navigator style={{marginTop:-610}}>
                <Tab.Screen
                    name="Sensor"
                    component={SensorScreen}
                />
                <Tab.Screen
                    name="Alarm"
                    component={AlarmScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
