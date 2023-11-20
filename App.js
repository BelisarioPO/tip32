import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './src/components/Header/Header'
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Miperfil from './src/screens/Miperfil/Miperfil'
import SearchUser from './src/screens/SearchUser/SearchUser';
import Comentarios from './src/screens/Comentarios/Comentarios';
import Posteo from './src/components/Posteo/Posteo'



const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
        <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name="Header" component={Header} options={ {headerShown: false} }/>
        <Stack.Screen name='Miperfil' component={Miperfil} options={ { headerShown: false } }/>
        <Stack.Screen name='Comentarios' component={Comentarios} options={ { headerShown: false } }/>
        <Stack.Screen name='Posteo' component={Posteo} options={ { headerShown: false } }/>
        <Stack.Screen name="SearchUser" component={SearchUser} />
      </Stack.Navigator>
    </NavigationContainer>

);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
});
