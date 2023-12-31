import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import logo from "../../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export default function BemVindo() {
  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(true);

  // Efeito colateral para escutar as alterações na conexão à internet
  useEffect(() => {
    // Adiciona um ouvinte para atualizações de conexão
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Atualiza o estado com o status atual da conexão
      setIsConnected(state.isConnected);

      if (isConnected == false) {
        Alert.alert("Sem conexão com a internet!");
      }
    });

    // Função de limpeza que será executada quando o componente for desmontado
    return () => {
      // Remove o ouvinte para evitar vazamentos de memória.  Usubscribe é uma palavra usada em React para se referir à função de limpeza no useEffect.
      unsubscribe();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/background.gif")}
      style={styles.container}
    >
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={logo}
          style={styles.imagem}
        />
      </View>
      <Animatable.View
        delay={600}
        style={styles.containerForm}
        animation="fadeInUp"
      >
        <Text style={styles.slogan} animation="fadeInUp">
          Bem Vindo ao Game Hub: Onde a Diversão Começa e a Aventura Não Tem
          Limites!
        </Text>
        <Text style={styles.texto}>Faça o Login para começar:</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.botaoTexto}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  container: {
    flex: 1,
    resizeMode: "center",
  },
  containerLogo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 2,
    backgroundColor: "#1f1f24d7",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
  },
  texto: {
    fontSize: 20,
    color: "#f2f2f2",
    marginBottom: 30,
  },
  slogan: {
    fontSize: 26,
    fontWeight: "500",
    color: "#f2f2f2",
    marginVertical: 15,
  },
  imagem: {
    width: 250,
    height: 200,
  },
  botao: {
    borderRadius: 10,
    backgroundColor: "#088DBC",
    padding: 10,
  },
  botaoTexto: {
    fontSize: 20,
    color: "#f2f2f2",
    textAlign: "center",
  },
});
