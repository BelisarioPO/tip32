import react, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import Posteo from "../../components/Posteo/Posteo"

class Miperfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userMiniBio: '',
            userPfp: '',
            texto: '',
            fotoUrl: '',
            listaposts: []

            //Contador de posteos del Usuario

        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            infoUser => {    
                infoUser.forEach(UnDato => {
                    let info = UnDato.data()
                    if (info.owner === auth.currentUser.email) {
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
        db.collection('posts').onSnapshot(
            postUser => {    
                let postsaMostrar = [];
                postUser.forEach(Unpost => {
                    let info = Unpost.data()
                    if (info.owner === auth.currentUser.email) {
                        postsaMostrar.push({
                            id: Unpost.id,
                            data: Unpost.data()
                        })
                        this.setState({
                            listaposts: postsaMostrar,
                        })
                    }
                })
                
            }
        )
    }

    render() {
        console.log(this.state);
        return(
        <View style={styles.container}>
            <Image style={styles.imagen} source={this.state.userPfp} resizeMode='contain'/>
            <Text style={styles.headerText}>{this.state.userName}</Text>
            <Text style={styles.bioText}>{this.state.userMiniBio}</Text>
            {
                    this.state.listaposts.length === 0
                        ?
                        <Text>Cargando...</Text>
                        :
                        <FlatList style={styles.flatList}
                            data={this.state.listaposts}
                            keyExtractor={unPost => unPost.id}
                            renderItem={({ item }) => <Posteo infoPost={item}/>}
                        />
                }

            
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')}>
                   <Text style={styles.goBackText}>Volver al home</Text>
                </TouchableOpacity>

        </View>)
        
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    imagen: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#333',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bioText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    postText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    postImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    goBackText: {
        color: '#356',
        textDecorationLine: 'underline',
    },
});

export default Miperfil;