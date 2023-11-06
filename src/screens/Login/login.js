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
    //Recordarme
    componentDidMount(){
        auth.onAuthStateChanged(user => console.log(user))
    }
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
         .then((response) => {
             this.setState({loggedIn: true});

             this.props.navigation.navigate('Home')
         })
         .catch(error => {
           this.setState({error: 'Credenciales inválidas.'})
         })
      }
      canLogin() {
        const { email, password } = this.state;
        return email !== '' && password !== '';
    }
     
      render(){
        return(
            <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}  disabled={!this.canLogin()} >
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>No tengo cuenta. Registrarme.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})




export default Login;