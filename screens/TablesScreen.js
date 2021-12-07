import * as React from 'react';
import {Text, View, Button} from 'react-native';

function TablesScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TablesScreen!</Text>
      <Button
        onPress={() => navigation.navigate('New Table', {msg: 'HI'})}
        title="Add Table"
      />
    </View>
  );
}

export default TablesScreen;
