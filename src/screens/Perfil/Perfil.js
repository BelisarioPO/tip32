import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db,auth } from '../../firebase/config';

class Perfil extends Component{
    constructor(){
        super();
        this.state={
            userName:'',
            userEmail:'',
            userMiniBio:'',
            userPfp:'',
            //Cantidad de Posts
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            infoUser =>{
                let infoGuardar = [];
                infoUser.forEach(UnDato =>{
                    infoGuardar.push({
                        userName: UnDato.userName, //Se usa currentUser?
                        userEmail: UnDato.owner,
                        userMiniBio: UnDato.miniBio,
                        userPfp: UnDato.fotoPerfil
                    })
                })
            }
        )
        this.setState({
            userName: infoGuardar.userName,
            userEmail: infoGuardar.owner,
            userMiniBio: infoGuardar.miniBio,
            userPfp: infoGuardar.fotoPerfil
        })
        console.log(this.state);
    }

    render() {
        return(
        <View style={styles.formContainer}>
            <Image style={styles.imagen} source={this.state.userPfp} resizeMode='contain'/>
            <Text style={styles.textButton}>{this.state.userName}</Text>
            <Text style={styles.textButton}>{this.state.userMiniBio}</Text>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')}>
                   <Text>Volver al home</Text>
                </TouchableOpacity>
        </View>)
    }
}

export default Perfil