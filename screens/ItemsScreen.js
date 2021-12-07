import * as React from 'react';
import {Text, View, Button} from 'react-native';
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
    return items.map((item, pos) => <Text key={pos}>{item.name}</Text>);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {getAllItems()}
      <Button
        onPress={() => navigation.navigate('New Item', {msg: 'HI'})}
        title="Add Item"
      />
    </View>
  );
}

export default ItemsScreen;
