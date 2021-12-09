import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';
import {paletteAll} from '../utils/ColorPallete';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DashboardScreen({navigation}) {
  const [tables, setTables] = React.useState([]);

  React.useEffect(() => {
    // ON PAGE LOAD
    const unsubscribe = navigation.addListener('focus', () => {
      TableStore.getItems()
        .then((_tables = []) => {
          setTables(_tables.filter(table => !table.active));
        })
        .catch(_ => setTables([]));
    });

    return unsubscribe;
  }, [navigation]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };
  const getItemDistributionUI = () => {
    let allOrders = [];
    tables.map(table => {
      allOrders = allOrders.concat(table.orders);
    });
    const dataSet = allOrders
      .map(order => {
        return {
          name: order.item.name,
          price: parseInt(order.item.price),
          quantity: parseInt(order.quantity),
          color: '#ff0066',
        };
      })
      .reduce((pv, cv) => {
        var nV = Object.assign([], pv);
        var isNew = true;
        pv.forEach((v, pos) => {
          if (v.name === cv.name) {
            var modifiedEntry = Object.assign({}, v);
            modifiedEntry.quantity = modifiedEntry.quantity + cv.quantity;
            nV[pos] = modifiedEntry;
            isNew = false;
          }
        });
        if (isNew) {
          nV.push(cv);
        }
        return nV;
      }, [])
      .map(({name, quantity, price}, pos) => {
        return {
          name,
          quantity,
          price,
          color: paletteAll[pos % paletteAll.length],
        };
      });

    var overAllQuantity = dataSet.reduce(
      (pv, cv) => {
        return {
          money: pv.money + cv.quantity * cv.price,
          quantity: pv.quantity + cv.quantity,
        };
      },
      {money: 0, quantity: 0},
    );
    return (
      <View style={styles.pieChartSectionContainer}>
        <View style={styles.titleContainer}>
          <Text>Item Distribution</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.chartContainer}>
            <PieChart
              data={dataSet}
              width={windowWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={'quantity'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              hasLegend={false}
              absolute
            />
          </View>
          <View style={styles.legendContainer}>
            <Text>L1</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
        <Text>{overAllQuantity.quantity} items sold till date</Text>
          <Text>{overAllQuantity.money} earned till date</Text>
        </View>
      </View>
    );
  };

  return <View>{getItemDistributionUI()}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  pieChartSectionContainer: {
    marginTop: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    padding: 10,
  },
  chartContainer: {
    flex: 1,
  },
  legendContainer: {
    flex: 1,
    marginTop: 20,
  },
});

export default DashboardScreen;
