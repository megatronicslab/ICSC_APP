import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmScreen from '../screens/AlarmScreen';
import SensorScreen from '../screens/SensorScreen';
import HomeScreen from '../screens/HomeScreen';
import LogoutScreen from '../screens/Logout';

const Tab = createMaterialTopTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen
                name="Sensor"
                component={SensorScreen}
            />
            <Tab.Screen
                name="Alarm"
                component={AlarmScreen}
            />
        </Tab.Navigator>
    );
};

const removeData = async () => {
    try{
        await AsyncStorage.removeItem('@storage_Key')
    } catch(e){
        console.log(e);
    }
}

const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        // <NavigationContainer independent="true">
            <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: '#0081CF' }, headerTitleStyle: { color: "#fff" }, headerTintColor: '#fff' }}>
                <Drawer.Screen
                    name="Monitoring"
                    options={{ title: "Monitoring" }}
                    component={TabNavigator}
                />
                <Drawer.Screen
                    name="Logout"
                    options={{ headerShown: false }}
                    component={LogoutScreen}
                />
                {/* <Drawer.Screen
                    name="Alarm"
                    options={{ headerShown: false }}
                    component={AlarmScreen}
                /> */}

            </Drawer.Navigator>
        // </NavigationContainer>

    );
};

export default AppStack;
