import * as React from 'react';
import {Text, View, Button} from 'react-native';

function UsersScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>UsersScreen!</Text>
      <Button
        onPress={() => navigation.navigate('New User', {msg: 'HI'})}
        title="Add User"
      />
    </View>
  );
}

export default UsersScreen;
