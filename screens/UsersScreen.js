import * as React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {UserStore} from '../utils/UserStore';

function UsersScreen({navigation}) {
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

  const getUsers = () => {
    const cardUI = ({item}) => {
      return (
        <Card style={styles.listItem}>
          <Card.Title title={item.name} />
        </Card>
      );
    };
    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={users}
        renderItem={cardUI}
      />
    );
  };

  return (
    <View style={styles.container}>
      {getUsers()}
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
