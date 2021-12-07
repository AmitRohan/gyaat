import * as React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {TextInput} from 'react-native-paper';

function NewTableModal({navigation}) {
  
  const filterData = dataToSearch => {
    return allItems.filter(item => item.name.indexOf(dataToSearch) !== -1);
  };

  const [query, setQuery] = React.useState('');
  const [allItems, setAllMovies] = React.useState([]);
  const filteredData = filterData(query);
  return (
    <View>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          autoCorrect={false}
          data={
            filteredData?.length === 1 && filteredData[0].compareTitle(query)
              ? [] // Close suggestion list in case movie title matches query
              : filteredData
          }
          onChangeText={setQuery}
          // renderTextInput={TextInput}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({item}) => <Text>{item}</Text>,
          }}
        />
      </View>

      {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
export default NewTableModal;
