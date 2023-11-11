import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/Camara/Camara';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class SubirPost extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           fotoUrl:'',
        }
    }

    crearPost(owner, textoPost, fotoUrl, createdAt){
        db.collection('posts').add({
            owner: owner,
            textoPost: textoPost,
            fotoUrl:fotoUrl,
            likes:[],
            createdAt: createdAt
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }

    traerUrlDeFoto(url){
        this.setState({
            fotoUrl:url
        })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Subir Posteo Demencial</Text>
                {/* Corregir estilos para que se vea bien la cámara */}
                <MyCamera style={styles.camera} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        flex:6
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
    },
    camera:{
        height: 900,
        width: 900,
    }
})

export default SubirPost;