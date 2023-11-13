import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Posteo extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.infoPost.data.likes
        }
    }

    componentDidMount(){
        if(this.props.infoPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }


   likear(){
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: true,
            cantidadDeLikes: this.props.infoPost.data.likes.length
        })
    })
    .catch( e => console.log(e))


   }

   unLike(){
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: false,
            cantidadDeLikes: this.props.infoPost.data.likes.length
        })
    })
    .catch( e => console.log(e))
   }
   

    render(){
        console.log(this.props);
        return(
            <View>
                <Text>Datos del Post</Text>
                <Text> Email: {this.props.infoPost.data.owner}</Text>
                <Text>Texto: {this.props.infoPost.data.textoPost}</Text>
                <Text>cantidad de likes: {this.state.cantidadDeLikes}</Text>
                <Image style={styles.imagen} source={this.props.infoPost.data.fotoUrl} resizeMode='contain'/>

                {/* If ternario */}
                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unLike()}>
                    QuitarLike
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.likear()}>
                    Like
                </TouchableOpacity>
                }
                
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imagen: {
        height: 100,
        width:100
    }
})



export default Posteo;
