import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {Text, TextInput, Button, Card} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';
import {ItemStore} from '../utils/ItemStore';

function EditTableModal({navigation, route}) {
  const [items, setItems] = React.useState([]);
  const [table, setTable] = React.useState(route.params.table);
  const itemNameInputRef = React.useRef();
  const itemQuantityInputRef = React.useRef();
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

  const [itemNameQuery, setItemNameQuery] = React.useState({name: ''});
  const [itemCount, setItemCount] = React.useState(0);

  const filteredData = filterItems(itemNameQuery);

  const getOrdersUI = () => {
    const cardUI = ({item}) => {
      const amt = item.item.price * item.quantity;
      return (
        <Card style={styles.listItem}>
          <Card.Title
            title={item.item.name}
            subtitle={item.item.price + 'x' + item.quantity + '=' + amt}
          />
        </Card>
      );
    };
    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={table.orders}
        renderItem={cardUI}
      />
    );
  };
  const getTableData = () => {
    return (
      <View>
        <Text>User : {table.name}</Text>
        {getOrdersUI()}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          ref={itemNameInputRef}
          autoCorrect={false}
          autoFocus={true}
          data={
            filteredData?.length === 1 &&
            filteredData[0].name === itemNameQuery.name
              ? []
              : filteredData
          }
          value={itemNameQuery.name}
          onChangeText={setItemNameQuery}
          mode="outlined"
          label="Item Name"
          placeholder="Name"
          returnKeyType="next"
          onSubmitEditing={() => {
            itemQuantityInputRef.current.focus();
          }}
          blurOnSubmit={false}
          renderTextInput={props => <TextInput {...props} />}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({item}) => (
              <TouchableOpacity onPress={() => setItemNameQuery(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>

      <TextInput
        ref={itemQuantityInputRef}
        placeholder="0"
        label="Quantity"
        mode="outlined"
        keyboardType="numeric"
        daata={itemCount}
        returnKeyType="next"
        onChangeText={text => setItemCount(text)}
      />

      <View style={styles.restContent}>
        <Button
          mode="contained"
          onPress={() => {
            if (itemNameQuery.name.trim().length === 0) {
              itemNameInputRef.current.focus();
              return;
            }

            if (itemCount === 0) {
              itemQuantityInputRef.current.focus();
              return;
            }
            var orders = table.orders;
            orders.push({
              item: itemNameQuery,
              quantity: itemCount,
            });
            setTable({orders});
          }}>
          Add
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            setItemNameQuery({name: ''});
            setItemCount(0);
            // itemNameInputRef.current.focus();
          }}>
          Reset
        </Button>
        {getTableData()}
        <Button
          mode="contained"
          onPress={() => {
            if (itemNameQuery.name.trim().length === 0) {
              itemNameInputRef.current.focus();
              return;
            }

            if (itemCount === 0) {
              itemQuantityInputRef.current.focus();
              return;
            }
            // TableStore.addOrderToTable({
            //   name: itemNameQuery,
            //   active: true,
            //   orders: [],
            // }).finally(_ => navigation.goBack());
          }}>
          Update
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
