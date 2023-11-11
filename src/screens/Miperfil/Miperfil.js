import react, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db, auth } from '../../firebase/config';

class Miperfil extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userEmail: '',
            userMiniBio: '',
            userPfp: '',
            //Contador de posteos del Usuario

        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            infoUser => {    
                infoUser.forEach(UnDato => {
                    let info = UnDato.data()
                    if (info.owner === auth.currentUser.email) {
                        console.log(info.userName, info.owner)
                        this.setState({
                            userName: info.userName,
                            userEmail: info.owner,
                            userMiniBio: info.miniBio,
                            userPfp: info.fotoPerfil
                        })
   
                    }
                })
                
            }
        )


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
const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: "#FFF",
        flex: 1
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton: {
        color: '#356'
    },

    imagen: {
        height: 400,
    }
})

export default Miperfil;