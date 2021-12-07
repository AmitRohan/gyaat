import * as React from 'react';
import {Text, View, Button, TextInput} from 'react-native';

function NewItemModal({navigation}) {
  const itemPriceInputRef = React.useRef();
  const addItemButtonRef = React.useRef();
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState(0);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>NewItemsModal!</Text>
      <TextInput
        autoFocus={true}
        style={{height: 40}}
        onKe
        placeholder="Name"
        onChangeText={text => setItemName(text)}
        onSubmitEditing={() => {
          itemPriceInputRef.current.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        ref={itemPriceInputRef}
        style={{height: 40}}
        keyboardType="numeric"
        placeholder="Price"
        onChangeText={text => setItemPrice(text)}
      />
      <Button
        ref={addItemButtonRef}
        onPress={() => {
          console.log('Item Added', itemName, itemPrice);
          navigation.goBack();
        }}
        title="Add"
      />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default NewItemModal;
