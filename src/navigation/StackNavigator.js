import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import AppStack from './AppStack'

export default function StackNavigator() {
    const Stack = createNativeStackNavigator();
    const [login, setLogin] = React.useState(false)

    React.useEffect(() => {
        const getData = async () => {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                setLogin(true)
            }
        }
        getData()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator  >
                {(login) ? <Stack.Screen
                    name="Home3"
                    options={{ headerShown: false }}
                    component={AppStack} /> :
                    <Stack.Screen
                        name="LogIn"
                        options={{ headerShown: false }}
                        component={LoginScreen} />}


                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                    component={AppStack} />
                    <Stack.Screen
                        name="LogIn1"
                        options={{ headerShown: false }}
                        component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
