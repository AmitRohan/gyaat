import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {UserStore} from '../utils/UserStore';

function NewUserModal({navigation}) {
  const userNameInputRef = React.useRef();
  const userNumberInputRef = React.useRef();
  const addUserButtonRef = React.useRef();
  const [userName, setUserName] = React.useState('');
  const [userNumber, setUserNumber] = React.useState(0);

  return (
    <View>
      <TextInput
        ref={userNameInputRef}
        autoFocus={true}
        placeholder="Name"
        label="Name"
        mode="outlined"
        returnKeyType="next"
        onChangeText={text => setUserName(text)}
        onSubmitEditing={() => {
          userNumberInputRef.current.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        ref={userNumberInputRef}
        keyboardType="numeric"
        mode="outlined"
        label="Mobile Number"
        placeholder="Mobile Number"
        onChangeText={text => setUserNumber(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (userName.trim().length === 0) {
            userNameInputRef.current.focus();
            return;
          }
          UserStore.addItem({name: userName, number: userNumber}).finally(_ => {
            navigation.goBack();
          });
        }}>
        Add
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>
        Dismiss
      </Button>
    </View>
  );
}

export default NewUserModal;
