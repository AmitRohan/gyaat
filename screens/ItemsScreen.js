import * as React from 'react';
import {Text, View, Button, StyleSheet, FlatList} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {ItemStore} from '../utils/ItemStore';

function ItemsScreen({navigation}) {
  const [items, setItems] = React.useState([]);

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

  const getAllItems = () => {
    const cardUI = ({item}) => {
      return (
        <Card style={styles.listItem}>
          <Card.Title title={item.name} subtitle={'Price :' + item.price} />
        </Card>
      );
    };
    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        renderItem={cardUI}
      />
    );
  };

  return (
    <View style={styles.container}>
      {getAllItems()}
      <FAB
        style={styles.fab}
        accessibilityLabel="Add New Items"
        icon={require('../assets/icons/items.png')}
        onPress={() => navigation.navigate('New Item', {msg: 'HI'})}
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

export default ItemsScreen;
