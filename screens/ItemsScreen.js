import * as React from 'react';
import {Text, View, Button} from 'react-native';
import {ItemStore} from '../utils/ItemStore';

function ItemsScreen({navigation}) {
  const [items, setItems] = React.useState([]);

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
