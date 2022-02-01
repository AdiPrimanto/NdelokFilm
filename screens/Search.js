/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movie, tv]) => {
        const data = [...movie, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
    // searchMovieTv(query, 'movie')
    //   .then(res => {
    //     setSearchResults(res);
    //   })
    //   .catch(() => {
    //     setError(true);
    //   });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder={'Search Movie or TV Show'}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItem}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length === 0 && (
            <View style={styles.noResults}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItem: {
    padding: 5,
  },
  noResults: {
    paddingLeft: 20,
  },
  empty: {
    paddingLeft: 20,
  },
});

export default Search;
