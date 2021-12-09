import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import {ItemStore} from '../utils/ItemStore';

function NewItemModal({navigation}) {
  const itemPriceInputRef = React.useRef();
  const itemNameInputRef = React.useRef();
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState(0);
  const [snackBarMsg, setSnackBarMsg] = React.useState('');
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const toggleSnackBar = msg => {
    setSnackBarMsg(msg);
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 1500);
  };

  return (
    <View style={styles.container}>
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
            toggleSnackBar('Need name');
            itemNameInputRef.current.focus();
            return;
          }
          if (itemName.trim().length === 0 || itemPrice === 0) {
            toggleSnackBar('Need price > 0');
            itemPriceInputRef.current.focus();
            return;
          }

          var addItemToDB = (allItems = []) => {
            var id = 1 + (allItems ? allItems.pop() : {id: 0}).id;
            ItemStore.addItem({
              id,
              name: itemName,
              price: itemPrice,
              createdAt: new Date().getTime(),
            }).finally(_ => {
              navigation.goBack();
            });
          };
          ItemStore.getItems().then(addItemToDB).catch(addItemToDB);
        }}>
        Add
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>
        Dismiss
      </Button>

      <Snackbar visible={showSnackBar}>{snackBarMsg}</Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {height: '100%'},
});

export default NewItemModal;
