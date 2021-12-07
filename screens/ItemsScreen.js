import * as React from 'react';
import {Text, View, Button, StyleSheet, FlatList} from 'react-native';
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
    return (
      <FlatList
        data={items}
        renderItem={({item}) => {
          console.log(item);
          return <Text style={styles.listItem}>{item.name}</Text>;
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('New Item', {msg: 'HI'})}
        title="Add Item"
      />
      {getAllItems()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default ItemsScreen;
