import react, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Posteo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false,
            cantidadDeLikes: this.props.infoPost.data.likes
        }
    }

    componentDidMount() {
        if (this.props.infoPost.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
    }


    likear() {
        db.collection('posts').doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(res => {
                this.setState({
                    like: true,
                    cantidadDeLikes: this.props.infoPost.data.likes.length
                })
            })
            .catch(e => console.log(e))


    }

    unLike() {
        db.collection('posts').doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(res => {
                this.setState({
                    like: false,
                    cantidadDeLikes: this.props.infoPost.data.likes.length
                })
            })
            .catch(e => console.log(e))
    }


    render() {
        console.log(this.props);
        return (
            <View style={styles.postContainer}>
                <Text style={styles.title}>Datos del Post</Text>
                <Text style={styles.text}>Email: {this.props.infoPost.data.owner}</Text>
                <Text style={styles.text}>Texto: {this.props.infoPost.data.textoPost}</Text>
                <Text style={styles.text}>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                <Image style={styles.imagen} source={this.props.infoPost.data.fotoUrl} resizeMode='contain' />

                {/* If ternario */}
                {this.state.like ?
                    <TouchableOpacity style={styles.buttonLiked} onPress={() => this.unLike()}>
                        <Text style={styles.buttonText}>Quitar Like</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                        <Text style={styles.buttonText}>Like</Text>
                    </TouchableOpacity>
                }


            </View>
        )
    }
}
const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    imagen: {
        height: 100,
        width: 100,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        alignItems: 'center',
        width: '20%'
    },
    buttonLiked: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        alignItems: 'center',
        width: '20%'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});



export default Posteo;
