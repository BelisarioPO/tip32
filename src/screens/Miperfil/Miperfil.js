import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db,auth } from '../../firebase/config';

class Miperfil extends Component{
    constructor(){
        super();
        this.state={
            userName:'',
            userEmail:'',
            userMiniBio:'',
            userPfp:'',
            //Contador de posteos del Usuario

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

}

export default Miperfil