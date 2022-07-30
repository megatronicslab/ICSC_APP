import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import * as React from 'react';
import CustomButton from '../components/CustomButton'
import { MaterialIcons } from '@expo/vector-icons'
import { loginApi } from '../navigation/AuthStack'
// import AppStack from '../navigation/AppStack'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [show, setShow] = React.useState(true)
  const [emailAlert, setEmailAlert] = React.useState('')
  const [error, setError] = React.useState(false)

  const Submit = async () => {
    if ((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) && (/.com/.test(email))) {
      setEmailAlert("")
      setError(false)
      setEmail(email.toLowerCase())
      const temp = await loginApi(email, password)
      if (temp.status === 200) {
        navigation.navigate("Home")
      }
      else{
        setEmailAlert("Email and Password invalid")
        setError(true)
      }
    }
    else {
      setEmailAlert("Email and Password invalid")
      setError(true)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo.jpeg")} style={{ marginBottom: 30 }} />
      <TextInput placeholder={"Email"} value={email} onChangeText={setEmail} style={styles.text} />
      <View>
        <TextInput secureTextEntry={show} placeholder={"Password"} value={password} onChangeText={setPassword} style={styles.text} />
        <View style={styles.visibale}>
          <MaterialIcons name={(show) ? "visibility-off" : "visibility"} onPress={() => { (show) ? setShow(false) : setShow(true) }} size={24} color="#6D7574" />
        </View>
      </View>
      {(error) ? <Text style={{ color: 'red', marginTop: 20, marginBottom: -30 }}>{emailAlert}</Text> : null}
      <CustomButton onPress={() => { Submit() }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E3F4F1',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100
  },
  visibale: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: -35,
    paddingRight: 10
  },
  text: {
    backgroundColor: '#f4f4f4',
    marginTop: 25,
    width: 300,
    height: 45,
    borderRadius: 50,
    fontSize: 16,
    color: "#6D7574",
    paddingLeft: 20
  },
})