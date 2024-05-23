import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Overlay, LinearProgress  } from "@rneui/themed";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { router } from 'expo-router';

export default function Index() {
  const [user, setUser] = useState(false);
  const [visible, setVisible] = useState(false);



  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) setUser(true);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const accessHome = async () => {
    if (!user) {
      const newId = uuid.v4();
      await AsyncStorage.setItem("user", JSON.stringify(newId));
      setVisible(true);
      setUser(true);
      setTimeout(() => {
        setVisible(false);
      }, 2300);
    } else {
      router.navigate('/home')
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar animated={true}  hidden={true}/>
      <Text style={styles.title}>
        Bem vindo ao <Text style={styles.highlight}>Cat Mood</Text>
      </Text>
      <View style={styles.btnContainer}>
        <Text style={styles.btnLabel}>
          {" "}
          {!user
            ? "Primeira vez por aqui ? Aperte o botão para criar seu usuário!"
            : "Acesse suas recordações"}{" "}
        </Text>
        <Button
          title="Acessar"
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
          onPress={accessHome}
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
        <Text style={styles.overlayText} >Criando um usuário!</Text>
        <LinearProgress style={{ marginVertical: 10, height: 20, borderRadius: 20 }} color="#FFCC00" />
      </Overlay>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#323232",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    maxWidth: 300,
    textAlign: "center"
  },
  highlight: {
    color: "#FFCC00",
    fontWeight: "bold",
  },
  btnContainer:{
    margin: 16,
    alignItems: "center",
    gap: 20
  },
  btn: {
    backgroundColor: "#FFCC00",
    width: 300,
  },
  btnTitle: {
    color: "#000",
    fontSize: 25,
  },
  btnLabel: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  overlay:{
    backgroundColor: "#323232",
    width: 300,
    height: 200,
    justifyContent: "space-around",
    borderRadius: 10
  },
  overlayText:{
    color: "#FFCC00",
    textAlign: "center",
    fontSize: 25
  }
});
