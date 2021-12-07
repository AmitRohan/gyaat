import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {UserStore} from '../utils/UserStore';

function UsersScreen({navigation}) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    // ON PAGE LOAD
    const unsubscribe = navigation.addListener('focus', () => {
      UserStore.getItems()
        .then((_items = []) => {
          setUsers(_items);
        })
        .catch(_ => setUsers([]));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>UsersScreen!</Text>
      <FAB
        style={styles.fab}
        accessibilityLabel="Add New User"
        icon={require('../assets/icons/users.png')}
        onPress={() => navigation.navigate('New User', {msg: 'HI'})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 12,
    paddingBottom: 50,
    marginTop: 6,
  },
  listItem: {
    marginBottom: 6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default UsersScreen;
