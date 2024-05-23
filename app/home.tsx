import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { router } from 'expo-router';
import { Button, Card } from '@rneui/themed';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const getCat = async (option:any) =>{
      if(option == "Entediado") option = "bored"
      if(option == "Triste") option = "sad"
      if(option == "Feliz") option = "happy"
      if(option == "Apaixonado") option = "love"
    try{
      const request = await axios.get(`https://cataas.com/cat/${option}?json=true`)
      return request.data._id
    }
    catch (e){
      console.log(e)
    }
  } 

  const getItems = async ()=>{
    let d:any = []
    const q: any = query(collection(db, "emotions"), where("user", "==", user))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc:any) =>{
      
      let cat = await getCat(doc.data().option)

       const emotion = {
        id: doc.id,
        desc: doc.data().desc,
        option: doc.data().option,
        cat: cat
      }

      d.push(emotion)
    })
    setData(d)
  }

  useEffect(() => {
    getUser();
    getItems();
  }, []);

  return (
    <View style={styles.main} >
      <Text>Home</Text>
      {data.length>0 ?<FlatList
        data={data}
        renderItem={({item}:any)=>{
           return (
            <Card>
              <Card.Image
                width={40}
                height={40}
                source={{uri: `https://cataas.com/cat/${item.cat}`}}  
              />
              <Card.Title>{item.desc}</Card.Title>
              <Card.Divider/>
              <Card.FeaturedSubtitle>{item.option}</Card.FeaturedSubtitle>
            </Card>
           )
        }}
      />: <ActivityIndicator size="large" color="#FFCC00"/>}
      
      <Button title={"Adicionar emoção"} onPress={()=> router.push("addEmocao")}/>
  
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#323232",
        paddingTop: 60
    },
})