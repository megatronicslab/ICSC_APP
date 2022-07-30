import * as React from 'react';
import { ListItem } from "@react-native-material/core";
import { alarm_API } from '../navigation/AuthStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';

export default function AlarmScreen() {
  const [alarmData, setAlarmData] = React.useState(null)

  function getDateTime(e) {
    var now = new Date(e);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
      minute = '0' + minute;
    }
    if (second.toString().length == 1) {
      second = '0' + second;
    }
    var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
  }

  const Item = ({ message, text, time, icon }) => (
    <>
      <View style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          {icon === "true" ? <Image source={require("../../assets/success.png")} style={{ width: 40, height: 40, marginRight: 10, marginTop: 6 }} />
            : <Image source={require("../../assets/alert.png")} style={{ width: 50, height: 50, marginRight: 10, marginLeft: -4, marginTop: 6 }} />}
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.text}>{text} </Text>
            <Text style={styles.time}>{getDateTime(time)}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const renderItem = ({ item }) => (
    item.map((value, index) => (
      <Item key={index} message={value.Message} text={value.alname} time={value.time} icon={value.Status} />
    ))
  );

  React.useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        const email = JSON.parse(value).username
        const api = await alarm_API(email)
        setAlarmData(api.data)
      }
    }
    getData()
  }, [])
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <FlatList
          data={alarmData}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({

  item: {
    // padding: 7,
    paddingTop: 7,
    paddingLeft: 15,
    paddingBottom: 7,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  message: {
    fontSize: 15,
    marginRight: 20
  },
  text: {
    fontSize: 12,
    color: "#3f3f3f"
  },
  time: {
    fontSize: 11,
    color: "#808080"
  }
});