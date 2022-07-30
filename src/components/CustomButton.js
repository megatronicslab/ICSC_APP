import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

export default function CustomButton(props) {
    const { onPress, title = 'Login' } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 40,
        elevation: 3,
        backgroundColor: '#2895F0',
        width: 300,
        height: 45,
        borderRadius: 50,
        fontSize: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})