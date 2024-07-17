import {Alert, StyleSheet, Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import * as React from "react";
import {useState} from "react";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../config/firebase";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

const LoginCard = () => {

    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('Home');
    }
    const goToSignUp = () => {
        navigation.navigate('signUp');
    }

    //Declaracion de variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Inicializamos firebase y le pasamos las credenciales de nuestra base.
    const app = initializeApp(firebaseConfig);
    //Obtenemos los metodos de autenticacion asociados a nuestra base.
    const auth = getAuth(app);


    //Funcion para crear una cuenta.
    const handleLogin = () => {
        //Creamos una cuenta por medio del email y password del usuario.
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                Alert.alert('Éxito', 'Sesión iniciada exitosamente');
                const user = userCredential.user;
                console.log(user)
                //Se limpia la informacion de los input
                setEmail("")
                setPassword("")
                goToHome();
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message);
            })
    }

    return(
        <View style={styles.box}>
            <TextInput
                left={<TextInput.Icon icon="email"/>}
                mode="outlined"
                label='Email'
                style={styles.input}
                onChangeText={setEmail}
                activeOutlineColor={'#199797'}
                outlineColor={'#cbf6de'}
            />
            <TextInput
                left={<TextInput.Icon icon="lock"/>}
                mode="outlined"
                style={styles.input}
                label='Contraseña'
                secureTextEntry={true}
                onChangeText={setPassword}
                activeOutlineColor={'#199797'}
                outlineColor={'#cbf6de'}
            />
            <Button style={styles.button} mode="contained" onPress={()=>{handleLogin()}}>
                Iniciar sesión
            </Button>
            <View style={styles.row}>
                <Text>¿Aún no tienes una cuenta?</Text>
                <Text onPress={()=>{goToSignUp()}} style={styles.logIn}>Registrarme</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 8,
        backgroundColor: '#d1f8ec',
        width: 280
    },
    button: {
        marginTop: 30,
        marginBottom: 12,
        backgroundColor: '#199797',
        padding: 5,
        borderRadius: 25
    },
    logIn: {
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: '#199797'
    },
    row: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center"
    }
});

export default LoginCard;