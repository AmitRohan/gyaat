import * as React from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {ItemStore} from '../utils/ItemStore';

function NewItemModal({navigation}) {
  const itemPriceInputRef = React.useRef();
  const itemNameInputRef = React.useRef();
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState(0);
  return (
    <View>
      <TextInput
        ref={itemNameInputRef}
        autoFocus={true}
        returnKeyType="next"
        placeholder="Name"
        label="Name"
        mode="outlined"
        onChangeText={text => setItemName(text)}
        onSubmitEditing={() => {
          itemPriceInputRef.current.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        ref={itemPriceInputRef}
        keyboardType="numeric"
        mode="outlined"
        label="Price"
        placeholder="10"
        onChangeText={text => setItemPrice(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (itemName.trim().length === 0) {
            itemNameInputRef.current.focus();
            return;
          }
          if (itemPrice === 0) {
            itemPriceInputRef.current.focus();
            return;
          }

          ItemStore.getItems().then(allItems => {
            var id = 1 + (allItems.pop() || {id: 0}).id;
            ItemStore.addItem({id, name: itemName, price: itemPrice}).finally(
              _ => {
                navigation.goBack();
              },
            );
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

export default NewItemModal;
