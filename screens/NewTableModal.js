import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {Text, TextInput, Button, Snackbar} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';
import {UserStore} from '../utils/UserStore';

function NewTableModal({navigation}) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    // ON PAGE LOAD
    const unsubscribe = navigation.addListener('focus', () => {
      UserStore.getItems()
        .then((_users = []) => {
          setUsers(_users);
        })
        .catch(_ => setUsers([]));
    });

    return unsubscribe;
  }, [navigation]);

  const filterUserName = nameToSearch => {
    return users.filter(item => item.name.indexOf(nameToSearch) !== -1);
  };

  const [userNameQuery, serUserNameQuery] = React.useState('');
  const filteredData = filterUserName(userNameQuery);

  const [snackBarMsg, setSnackBarMsg] = React.useState('');
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const toggleSnackBar = msg => {
    setSnackBarMsg(msg);
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          autoCorrect={false}
          autoFocus={true}
          data={
            filteredData?.length === 1 && filteredData[0].name === userNameQuery
              ? []
              : filteredData
          }
          value={userNameQuery}
          onChangeText={serUserNameQuery}
          mode="outlined"
          label="User Name"
          placeholder="Name"
          renderTextInput={props => <TextInput {...props} />}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({item: {name}}) => (
              <TouchableOpacity onPress={() => serUserNameQuery(name)}>
                <Text style={styles.itemText}>{name}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>

      <View style={styles.restContent}>
        <Button
          mode="contained"
          onPress={() => {
            if (userNameQuery.trim().length === 0) {
              toggleSnackBar('Need name');
              return;
            }

            var addTableToDB = (allTables = []) => {
              var id = 1 + (allTables ? allTables.pop() : {id: 0}).id;
              TableStore.addItem({
                id,
                name: userNameQuery,
                active: true,
                orders: [],
              }).finally(_ => navigation.goBack());
            };
            TableStore.getItems().then(addTableToDB).catch(addTableToDB);
          }}>
          Add
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
export default NewTableModal;
