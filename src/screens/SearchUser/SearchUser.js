import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { db } from '../../firebase/config';
import { useRoute } from '@react-navigation/native';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchResultsUserName: [],
      searchResultsOwner: [],
      todosUsuariosCDM: [],
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((usuarios) => {
      let todosUsuarios = [];
      usuarios.forEach((doc) => {
        const data = doc.data();
        todosUsuarios.push({
          id: doc.id,
          userName: data.userName,
          owner: data.owner, 
        });
      });

      this.setState({ todosUsuariosCDM: todosUsuarios });
    });
  }

  search = (text) => {
    const searchResultsUserName = [];
    const searchResultsOwner = [];

    this.state.todosUsuariosCDM.forEach((unUser) => {
      if (text.length === 0) {
        this.setState({
          searchResultsUserName: [],
          searchResultsOwner: [],
        });
      }

      if (unUser.userName.includes(text)) {
        if (!searchResultsUserName.includes(unUser)) {
          searchResultsUserName.push(unUser);
        }
      }

      // Agrega la lógica para la búsqueda por 'owner'
      if (unUser.owner && unUser.owner.includes(text)) {
        if (!searchResultsOwner.includes(unUser)) {
          searchResultsOwner.push(unUser);
        }
      }
    });

    this.setState({
      searchQuery: text,
      searchResultsUserName,
      searchResultsOwner,
    });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Buscar usuario por user name o email"
          onChangeText={(text) => this.search(text)}
          value={this.state.searchQuery}
        />
        {this.state.searchResultsUserName.length === 0 && this.state.searchResultsOwner.length === 0 ? (
          <Text>El user name o email no existe</Text>
        ) : (
          <FlatList
            data={
              this.state.searchResultsUserName.length > 0
                ? this.state.searchResultsUserName
                : this.state.searchResultsOwner
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text><Text>{item.userName} || {item.owner}</Text></Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

export default SearchUser;
