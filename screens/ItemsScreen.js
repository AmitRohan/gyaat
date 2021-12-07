import * as React from 'react';
import {Text, View, Button} from 'react-native';

function ItemsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ItemsScreen!</Text>
      <Button
        onPress={() => navigation.navigate('New Item', {msg: 'HI'})}
        title="Add Item"
      />
    </View>
  );
}

export default ItemsScreen;
