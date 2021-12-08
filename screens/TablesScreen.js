import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Card, FAB, Paragraph} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';

function TablesScreen({navigation}) {
  const [tables, setTables] = React.useState([]);

  React.useEffect(() => {
    // ON PAGE LOAD
    const unsubscribe = navigation.addListener('focus', () => {
      TableStore.getItems()
        .then((_tables = []) => {
          setTables(_tables.filter(table => table.active));
        })
        .catch(_ => setTables([]));
    });

    return unsubscribe;
  }, [navigation]);

  const getTablesUI = () => {
    const cardUI = ({item}) => {
      var tableBill = item.orders.reduce(
        (pv, cv) => {
          var nv = Object.assign({}, pv);
          nv.q += parseInt(cv.quantity);
          nv.p += cv.quantity * cv.item.price;
          return nv;
        },
        {q: 0, p: 0},
      );

      return (
        <Card
          style={styles.listItem}
          onPress={() => navigation.navigate('Edit Table', {table: item})}>
          <Card.Title title={item.name} subtitle={tableBill.q + ' Items'} />
          <Card.Content>
            <Paragraph>{'Rs ' + tableBill.p}</Paragraph>
          </Card.Content>
        </Card>
      );
    };
    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={tables}
        renderItem={cardUI}
      />
    );
  };

  return (
    <View style={styles.container}>
      {getTablesUI()}
      <FAB
        style={styles.fab}
        accessibilityLabel="Add New Tables"
        icon={require('../assets/icons/tables.png')}
        onPress={() => navigation.navigate('New Table', {msg: 'HI'})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  list: {
    padding: 12,
    paddingBottom: 50,
    marginTop: 6,
  },
  listItem: {
    marginBottom: 6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TablesScreen;
