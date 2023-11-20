import react, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import { db, auth } from '../../firebase/config';
import Posteo from "../../components/Posteo/Posteo"

class Home extends Component {
    constructor() {
        super()
        this.state = {
            listaposts: []
        }
    }

    componentDidMount() {
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

                    })
                })
            })
    }


    logout() {
        auth.signOut();
        //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerText}>HOME</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.buttonText}> Ir a login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}> Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.buttonText}> Ir a register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Miperfil")}>
                    <Text style={styles.buttonText}> Ir a Mi Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("SearchUser")}>
                    <Text style={styles.buttonText}>Buscar Usuario</Text>
                </TouchableOpacity>
                <Text style={styles.listHeader}>Lista de Posts</Text>
                {
                    this.state.listaposts.length === 0
                        ?
                        <Text>Cargando...</Text>
                        :
                        <FlatList style={styles.flatList}
                            data={this.state.listaposts}
                            keyExtractor={unPost => unPost.id}
                            renderItem={({ item }) => <Posteo infoPost={item} navigation={this.props.navigation}/>}
                        />
                }
            </ScrollView> 
            //QUERIDOS PROFESORES, SOY FEDERICO CINQUE. YA SE QUE NUNCA LLEGAMOS A DAR 
            //SCROLLVIEW Y QUE ESTA SACADO DE INTERNET! PERO SEGUI EL CONSEJO DE GASTON DE ASIGNARLE
            //FLEX 1 AL CONTAINER PRINCIPAL Y AUN ASI NO PODIA SCROLEAR PARA VER MIS POSTS
            //ESTA FUE MI UNICA SOLUCION. LO VI EN UN VIDEO DE YOUTUBE. LO IMPORTE Y LO IMPLEMENTE
            //SOLO EN LA LINEA 41 Y 70. PERDON DESDE YA! 

            


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#eaeaea',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 6,
        borderRadius: 4,
        alignItems: 'center',
        width: '50%', // Ajusta el ancho deseado aquí
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    flatList: {
        width: '100%',
    },
});


export default Home;
