import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {Text, TextInput, Button, Card, Snackbar} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';
import {ItemStore} from '../utils/ItemStore';
import merge from 'deepmerge';

function EditTableModal({navigation, route}) {
  const [snackBarMsg, setSnackBarMsg] = React.useState('');
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const toggleSnackBar = msg => {
    setSnackBarMsg(msg);
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 1500);
  };

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

  const addOrderToTableInState = () => {
    if (itemNameQuery.name.trim().length === 0) {
      toggleSnackBar('Need name');
      itemNameInputRef.current.focus();
      return;
    }

    if (itemCount.trim().length === 0 || itemCount === 0) {
      toggleSnackBar('Need quantity > 0');
      itemQuantityInputRef.current.focus();
      return;
    }

    var orders = table.orders;
    orders.push({
      item: itemNameQuery,
      quantity: itemCount,
    });
    var newTable = Object.assign({}, table);
    newTable.orders = orders;
    setTable(newTable);
  };

  const updateTableInDBFromState = (tableToSet = table) => {
    const updateDataInTable = (allTables = []) => {
      var newTables = (allTables || []).map(_table => {
        if (_table.id === tableToSet.id) {
          return merge(_table, tableToSet);
        }
        return _table;
      });
      TableStore.updateItem(newTables).finally(_ => navigation.goBack());
    };
    TableStore.getItems().then(updateDataInTable).catch(updateDataInTable);
  };

  const closeTableInDB = () => {
    var newTable = Object.assign({}, table);
    newTable.active = false;
    setTable(newTable);
    updateTableInDBFromState(newTable);
  };

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
            addOrderToTableInState();
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
            updateTableInDBFromState();
          }}>
          Update
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            closeTableInDB();
          }}>
          Close Table
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Dismiss
        </Button>
      </View>
      <Snackbar visible={showSnackBar}>{snackBarMsg}</Snackbar>
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
