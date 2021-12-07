import * as React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

function UsersScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
