import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../../screens/Home/Home';
import SubirPost from '../../screens/SubirPost/SubirPost'

const Tab = createBottomTabNavigator();

function Header (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}  options={ { headerShown: false }}/>
            <Tab.Screen name='SubirPost' component={SubirPost}  options={ { headerShown: false }}/>
             
        </Tab.Navigator>
    )
}

export default Header;