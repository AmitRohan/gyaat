import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

function TablesScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>TablesScreen!</Text>
      <FAB
        style={styles.fab}
        accessibilityLabel="Add New Tables"
        icon={require('../assets/icons/tables.png')}
        onPress={() => navigation.navigate('New Table', {msg: 'HI'})}
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

export default TablesScreen;
