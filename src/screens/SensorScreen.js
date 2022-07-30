import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sensor_API } from '../navigation/AuthStack'
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';

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

const Item = ({ tagname, value, unit, icon }) => (
  <View style={styles.item}>
    <Text>
      <View>
        {icon === 'Type1' ? <Image source={require("../../assets/Type1.png")} style={{ width: 30, height: 30, marginRight: 10 }} /> : null}
        {icon === 'Type2' ? <Image source={require("../../assets/Type2.png")} style={{ width: 30, height: 30, marginRight: 10 }} /> : null}
        {icon === 'Type3' ? <Image source={require("../../assets/Type4.png")} style={{ width: 30, height: 30, marginRight: 10 }} /> : null}
        {icon === 'Type4' ? <Image source={require("../../assets/Type4.png")} style={{ width: 30, height: 30, marginRight: 10 }} /> : null}
        {icon === 'Type5' ? <Image source={require("../../assets/Type6.png")} style={{ width: 30, height: 30, marginRight: 10 }} /> : null}
        {icon === 'Type6' ? <Image source={require("../../assets/Type6.png")} style={{ width: 30, height: 30, marginRight: 10 }} /> : null}
      </View>

      <View style={{ paddingBottom: 7, paddingRight:5 }}>
        <Text style={styles.title}>{tagname}</Text>
      </View>
      <View style={{ paddingBottom: 7 }}>
        <Text style={{ fontSize: 12, color: '#808080' }}> ({unit}) </Text>
      </View>
    </Text>
    <View style={styles.value}>
      <Text style={styles.valueTitle}>{value}</Text>
    </View>

  </View>
);

export default function SensorScreen() {

  const [sensorData, setSensorData] = React.useState(null)

  const renderItem = ({ item }) => (
    <Item tagname={item.tagname} unit={item.unit} value={item.value} icon={item.icon} />
  );


  React.useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        const email = JSON.parse(value).username
        const api = await sensor_API(email)
        setSensorData(api.data)
      }
    }
    getData()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <FlatList
        data={sensorData}
        renderItem={renderItem}
      // keyExtractor={item => item.id}
      />
      {(sensorData !== null) ?
        <View style={styles.time}>
          <Text style={{ color: "#808080" }}> Last Updated {getDateTime(sensorData[1].time)}</Text>
        </View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  item: {
    padding: 10,
    paddingTop:5,
    paddingLeft:10,
    paddingBottom: 10,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,    
  },
  title: {
    fontSize: 16,
  },
  value: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: -24,
    paddingRight: 10,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  time: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
});
