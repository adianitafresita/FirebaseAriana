import {Text, View, StyleSheet, TextInput, Alert} from "react-native";
import * as React from 'react';
import { Button } from 'react-native-paper';
import {useState} from "react";
import LoginCard from "../components/LoginCard";
import {useNavigation} from "@react-navigation/native";

const Login = () => {

    return(
      <View style={styles.container}>
          <Text style={styles.title}>Inicia sesión</Text>
        <LoginCard/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
        paddingHorizontal: 30
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 5,
        color: "#199797"
    },
    subtitle: {
        textAlign: "center",
        marginBottom: 30,
        width: 280
    },
});


export default Login;
