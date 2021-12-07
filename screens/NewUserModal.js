import * as React from 'react';
import {Text, View, Button} from 'react-native';

function NewUserModal({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>NewUserModal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default NewUserModal;
