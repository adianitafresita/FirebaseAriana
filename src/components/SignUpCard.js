import {Alert, StyleSheet, Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import * as React from "react";
import {useState} from "react";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../config/firebase";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

const SignUpCard = () => {

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('logIn');
    }

    //Declaracion de variables
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    //Inicializamos firebase y le pasamos las credenciales de nuestra base.
    const app = initializeApp(firebaseConfig);
    //Obtenemos los metodos de autenticacion asociados a nuestra base.
    const auth = getAuth(app);

    //Funcion para crear una cuenta.
    const handleSignIn = () => {
        //Creamos una cuenta por medio del email y password del usuario.
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                Alert.alert('Éxito', 'Cuenta creada exitosamente');
                goToLogin();
                const user = userCredential.user;
                console.log(user)
                //Se limpia la informacion de los input
                setEmail("")
                setName("")
                setLastName("")
                setPassword("")
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message);
            })
    }

    return(
        <View style={styles.box}>
            <TextInput
                left={<TextInput.Icon icon="account"/>}
                mode='outlined'
                label='Nombre'
                style={styles.input}
                onChangeText={setName}
                activeOutlineColor={'#199797'}
                outlineColor={'#cbf6de'}
            />
            <TextInput
                left={<TextInput.Icon icon="account-edit"/>}
                label='Apellido'
                mode="outlined"
                style={styles.input}
                onChangeText={setLastName}
                activeOutlineColor={'#199797'}
                outlineColor={'#cbf6de'}
            />
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
            <Button style={styles.button} mode="contained" onPress={()=>{handleSignIn()}}>
                Registrar sesión
            </Button>
            <View style={styles.row}>
                <Text>¿Ya tienes una cuenta?</Text>
                <Text onPress={()=>{goToLogin()}} style={styles.logIn}>Iniciar sesión</Text>
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

export default SignUpCard;