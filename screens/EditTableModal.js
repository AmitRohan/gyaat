import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {Text, TextInput, Button} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';
import {ItemStore} from '../utils/ItemStore';

function EditTableModal({navigation, route}) {
  const [items, setItems] = React.useState([]);
  const itemNameInputRef = React.useRef();
  React.useEffect(() => {
    // ON PAGE LOAD
    const unsubscribe = navigation.addListener('focus', () => {
      ItemStore.getItems()
        .then((_items = []) => {
          setItems(_items);
        })
        .catch(_ => setItems([]));
    });

    return unsubscribe;
  }, [navigation]);

  const filterItems = nameToSearch => {
    return items.filter(item => item.name.indexOf(nameToSearch) !== -1);
  };

  const [itemNameQuery, setItemNameQuery] = React.useState('');
  const filteredData = filterItems(itemNameQuery);
  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          ref={itemNameInputRef}
          autoCorrect={false}
          autoFocus={true}
          data={
            filteredData?.length === 1 && filteredData[0].name === itemNameQuery
              ? []
              : filteredData
          }
          value={itemNameQuery}
          onChangeText={setItemNameQuery}
          mode="outlined"
          label="Item Name"
          placeholder="Name"
          renderTextInput={props => <TextInput {...props} />}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({item: {name}}) => (
              <TouchableOpacity onPress={() => setItemNameQuery(name)}>
                <Text style={styles.itemText}>{name}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>

      <View style={styles.restContent}>
        <Text>{route.params.name}</Text>
        <Button
          mode="contained"
          onPress={() => {
            if (itemNameQuery.trim().length === 0) {
              itemNameInputRef.current.focus();
              return;
            }
            TableStore.addItem({
              name: itemNameQuery,
              active: true,
              orders: [],
            }).finally(_ => navigation.goBack());
          }}>
          Add
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Dismiss
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    // Android requiers padding to avoid overlapping
    // with content and autocomplete
    paddingTop: 50,
  },
  restContent: {
    marginTop: 8,
    zIndex: -1,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 99999,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
});
export default EditTableModal;
