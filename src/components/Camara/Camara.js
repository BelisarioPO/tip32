import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';


class Camara extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos:false,
            urlInternaFoto: '',
            mostrarCamara: true,
        }
        this.metodosDeCamara = ''
    }

    componentDidMount(){
       Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisos: true
                })
            } )
            .catch( e => console.log(e)) 
    }

    SacarFoto(){
        console.log('sacando foto...');
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlInternaFoto: photo.uri,
                    mostrarCamara: false
                })
            })
            .catch(e=>console.log(e))
    }

    guardarFoto(){
        fetch(this.state.urlInternaFoto)
            .then( res => res.blob())
            .then( image => {

                const ruta = storage.ref(`photos/${Date.now()}.jpg`);
                ruta.put( image )
                    .then(()=>{
                        ruta.getDownloadURL() 
                            .then( url => {
                                this.props.traerUrlDeFoto(url)
                                this.setState({
                                    urlInternaFoto: '',
                                    mostrarCamara: true
                                })
                            } )
                    })

            })
            .catch( e => console.log(e))
    }
    borrarFoto(){



        this.setState({
            mostrarCamara: true,
            urlInternaFoto: '',
        });
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.permisos ? (
                    this.state.mostrarCamara === false ? (
                        <React.Fragment>
                            <Image
                                source={{ uri: this.state.urlInternaFoto }}
                                style={styles.cameraBody}
                            />
                            <TouchableOpacity onPress={() => this.guardarFoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.borrarFoto()}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Camera
                                type={Camera.Constants.Type.front}
                                ref={(metodosDeCamara) =>
                                    (this.metodosDeCamara = metodosDeCamara)
                                }
                                style={styles.cameraBody}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.SacarFoto()}
                            >
                                <Text>Sacar Foto</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    )
                ) : (
                    <Text>La cámara no tiene permisos</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
    },
    cameraBody: {
        flex:7
    },
    button:{
        flex:2,
    }
})

export default Camara