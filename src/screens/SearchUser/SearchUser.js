import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { db } from '../../firebase/config';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchResults: [],
    };
  }

  searchUsers = () => {
    const { searchQuery } = this.state;
    const usersDb = db.collection('users');

    usersDb
      .where('userName', '==', searchQuery) // Filtrar por user name
      .get()
      .then((querySnapshot) => {
        const results = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          results.push({
            id: doc.id,
            userName: data.userName,
          });
        });

        if (results.length > 0) {
          this.setState({ searchResults: results });
        } else {
          this.setState({ searchResults: [] });
        }
      })
      .catch((error) => {
        console.error('Error al buscar usuarios:', error);
      });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Buscar usuario por user name"
          onChangeText={(text) => this.setState({ searchQuery: text })}
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
