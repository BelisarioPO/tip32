import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db,auth } from '../../firebase/config';
import firebase from 'firebase'

class Comentarios extends Component{
    constructor(){
        super()
        this.state={
            cajaComentarios:[],
            infoUsuarioLogueado:[],
            textoComentario: '',
            comentarioNulo: '',
        }
    }

    componentDidMount(){
        db.collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot(doc=> {
                const comentarios = doc.data().Comentarios
                this.setState({
                    cajaComentarios: comentarios
                })
                console.log(comentarios);
            })
        
        db.collection('user').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
            let infoUsuarioLogueado = [];
            docs.forEach((doc) => {
                infoUsuarioLogueado.push({
                    data: doc.data()
                })
            })
        });
    }

    comentario(textoComentario){
        if (textoComentario !== '') {
            const comentario = {
                usuario: this.state.infoUsuarioLogueado[0]?.data.username,
                email: auth.currentUser.email,
                createdAt: Date.now(),
                texto: textoComentario
            }
            db.collection('posts').doc(this.props.route.params.id).update({
                Comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
            })
            .then(()=>{
                this.setState({
                    textoComentario: ''
                })
            })
            .catch(e => console.log(e))
        } else {
            this.setState({comentarioNulo: 'Escribi algo facha, vacio no te lo puedo mandar'})
        }
    }

    render(){
        return(
            <React.Fragment>
                <View>
                    <Text>Comentarios Demenciales</Text>
                    <FlatList
                        data= {this.state.cajaComentarios}
                        keyExtractor={(item)=>item.createdAt.toString()}
                        renderItem={({item}) => 
                        <View>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('users', {user:item.email})}>
                                <Text>{item.usuario}</Text>
                            </TouchableOpacity>
                            <Text>{item.texto}</Text>
                        </View>
                    }
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Deja tu Comentario'
                        onChangeText={texto => this.setState({textoComentario:texto})}
                        value={this.state.textoComentario}
                    />

                    <TouchableOpacity onPress={()=> this.comentario(this.state.textoComentario)}>
                        <Text style={styles.textButton}>Comentar</Text>
                    </TouchableOpacity>
                    {this.state.comentarioNulo != '' ? <Text>{this.state.comentarioNulo}</Text>: false}
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor:'#28a745',
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

export default Comentarios

//Buenas, Soy Belisario, Si bien logre conectar las pantallas y componentes para que se pueda entrar y comentar algo no logro, por mucho que intente, mostrar los comentarios. Ya intente de todo y si bien comprendo para que sirve cada metodo y propiedad que uso no comprendo en donde me equivoco.
//Sin embargo logre una gran parte de la logica en donde no te deberia dejar comentar algo vacio y cada post tiene su seccion de comentarios individual. 
//Intente solucionarlo con Gaston el miercoles y no pude