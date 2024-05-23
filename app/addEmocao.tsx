import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, ButtonGroup, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "@/service/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function addEmocao() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  const options = ["Triste", "Entediado", "Feliz", "Apaixonado"];

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const addItem = async()=>{
    try{
        const docRef = await addDoc(collection(db, "emotions"),{
            user: user,
            desc: input,
            option: options[selectedIndex]
        })
        alert("Criado com sucesso!")
    }
    catch(e){
        console.log(e)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Adicione uma emoção</Text>
      <Input
        label={"O que aconteceu"}
        labelStyle={{color: "#fff"}}
        inputContainerStyle = {{borderColor: "#FFCC00"}}
        value={input}
        onChangeText={(input) => {
          setInput(input);
        }}
      />
      <ButtonGroup
        buttons={options}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{backgroundColor: "#FFCC00"}}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <Button title={"Criar"} onPress={addItem} buttonStyle={styles.btn} titleStyle={{fontSize: 20}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#323232",
    paddingTop: 60,
    gap: 50,
  },
  title:{
    fontSize: 35,
    color: "#fff",
    textAlign:"center"
  },
  btn:{
    backgroundColor: "#FFCC00",
    width: 200
  }
});
