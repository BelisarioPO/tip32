import { Camera } from 'expo-camera'
import react, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Touchable } from 'react-native';
import {db, storage } from '../../firebase/config';

class Camara extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permisos:false, // permisos de acceso al hardware para usar la camara
            urlFoto: "", //aca va la url temporal interna de la foto.
            mostrarCamara: true 
        }
        this.metodosDeCamara = "" // referenciar algo raro no se
    }
    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch(e => console.log(e))
    }


    takePicture() {
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri, //Es una uri interna temporal de la foto.
                    showCamera: false
                })
            })
    }

    savePhoto(){
        fetch(this.state.photo)
         .then(res=>res.blob())
         .then(image =>{
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                         })
                 })
         })
         .catch(e=>console.log(e))
       }


render(){
    return(
        <View>
<Camera
   style={styles.cameraBody}
   type={Camera.Constants.Type.back}
   ref={reference => this.camera = reference}
/>
<TouchableOpacity>
    <Text>Sacar Foto</Text>
</TouchableOpacity >

</View>
    )
}

}









export default Camara;