import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Miperfil from './src/screens/Miperfil/Miperfil'
import Camara from './src/screens/Camara/Camara';
import SearchUser from './src/screens/SearchUser/SearchUser';



const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
        <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
        <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name='Miperfil' component={Miperfil} options={ { headerShown: false } }/>
        <Stack.Screen name='Camara' component={Camara} options={ { headerShown: false } }/>
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
