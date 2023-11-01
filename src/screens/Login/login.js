import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            loggedIn:''
        }
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
         .then((response) => {
             this.setState({loggedIn: true});
         })
         .catch(error => {
           this.setState({error: 'Credenciales inválidas.'})
         })
      }
     

}
export default Login;