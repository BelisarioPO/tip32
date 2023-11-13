import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { db } from '../../firebase/config';
import { useRoute } from '@react-navigation/native';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchResults: [],
      todosUsuariosCDM: [],
    };
  }

componentDidMount(){

  db.collection('users').onSnapshot(
    usuarios => {
      let todosUsuarios = [];
      usuarios.forEach((doc) => {
        const data = doc.data();
        todosUsuarios.push({
          id: doc.id,
          userName: data.userName,
        });
      });

      this.setState({ todosUsuariosCDM: todosUsuarios })
      console.log(this.state.todosUsuariosCDM)
    }
  )
}


  searchUsers = (text) => {

    this.state.todosUsuariosCDM.forEach(unUser => {

      if (this.state.searchQuery.length==0){
        this.setState({
          searchResults: []
        })
      }
      if (unUser.userName.includes(this.state.searchQuery)){
        if (this.state.searchResults.includes(unUser))
        {null}
        else{this.state.searchResults.push(unUser)}
      }

    })

  }

  render() {
    console.log(this.state.todosUsuariosCDM);
    return (
      <View>
        <TextInput
          placeholder="Buscar usuario por user name"
          onChangeText={(text) => (this.searchUsers(text), this.setState({searchQuery:text}))}
          value={this.state.searchQuery}
        />
        {this.state.searchResults.length === 0 ? (
          <Text>El user name no existe</Text>
        ) : (
          <FlatList
            data={this.state.searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.userName}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

export default SearchUser;
