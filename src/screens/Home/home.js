import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db,auth } from '../../firebase/config';

class Home extends Component {
    constructor(){
        super()
        this.state={
      listaposts: []
        }
    }

componentDidMount(){
    //traer datos
    db.collection('posts').onSnapshot(
        posteos => {
            let postsaMostrar = [];
            posteos.forEach(Unpost => {
                postsaMostrar.push({
                    id: Unpost.id,
                    data: Unpost.data()
                })
                this.setState({
                    listaposts: postsaMostrar,
                    loading: false
                })
            })
        })
}


    logout(){
        auth.signOut();
         //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View>
                <Text>HOME</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text> Ir a login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text> Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                    <Text> Ir a register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Miperfil")}>
                    <Text> Ir a Mi Perfil</Text>
                </TouchableOpacity>
            </View>
            

        )
    }
}



export default Home;
