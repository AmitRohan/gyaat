import * as React from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {Button, Text} from 'react-native-paper';
import {TableStore} from '../utils/TableStore';
import {paletteAll} from '../utils/ColorPallete';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const today = new Date();
const yesterday = new Date(today.getTime());

yesterday.setDate(today.getDate() - 1);
today.setDate(yesterday.getDate() + 2);

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

  const [startDate, setStartDate] = React.useState(yesterday);
  const [endDate, setEndDate] = React.useState(today);
  const [showStartDate, setShowStartDate] = React.useState(false);
  const [showEndDate, setShowEndDate] = React.useState(false);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const openStartDatepicker = () => {
    setShowStartDate(true);
  };

  const openEndDatepicker = () => {
    setShowEndDate(true);
  };

  const barChartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,

    fillShadowGradient: '#ccc',
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => '#023047',
    labelColor: (opacity = 1) => '#333',
    strokeWidth: 2,

    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };
  const pieChartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };
  const getFiltersUI = () => {
    return (
      <View style={styles.filterContainer}>
        <View style={styles.filterButton}>
          <Button onPress={openStartDatepicker} mode="contained">
            Start date : {startDate.toDateString()}
          </Button>
        </View>
        {showStartDate && (
          <DateTimePicker
            testID="startDatePicker"
            value={startDate}
            maximumDate={endDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onStartDateChange}
          />
        )}
        <View style={styles.filterButton}>
          <Button onPress={openEndDatepicker} mode="contained">
            End date : {endDate.toDateString()}
          </Button>
        </View>
        {showEndDate && (
          <DateTimePicker
            testID="endDatePicker"
            value={endDate}
            minimumDate={startDate}
            maximumDate={today}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </View>
    );
  };
  const getItemDistributionUI = () => {
    let allOrders = [];
    tables.map(table => {
      allOrders = allOrders.concat(table.orders);
    });
    const filteredOrders = allOrders.filter(order => {
      var orderTime = new Date(order.createdAt);
      return (
        orderTime.getTime() >= startDate.getTime() &&
        orderTime.getTime() <= endDate.getTime()
      );
    });
    const dataSet = filteredOrders
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

    var mostSellingItem = '';
    var leastSellingItem = '';
    var minQ = Math.min(...dataSet.map(_ => _.quantity));
    var maxQ = Math.max(...dataSet.map(_ => _.quantity));
    dataSet.forEach(data => {
      if (data.quantity === maxQ) {
        mostSellingItem += data.name + ' ';
      }
      if (data.quantity === minQ) {
        leastSellingItem += data.name + ' ';
      }
    });

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
              chartConfig={pieChartConfig}
              accessor={'quantity'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              hasLegend={false}
              absolute
            />
          </View>
          <View style={styles.legendContainer}>
            {dataSet.map(data => {
              return (
                <Text key={data.name}>
                  {' '}
                  <View
                    style={{
                      backgroundColor: data.color,
                      height: 10,
                      width: 10,
                      borderRadius: 10,
                    }}
                  />{' '}
                  {data.name + ' (' + data.quantity + ')'}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{overAllQuantity.quantity} items sold till date</Text>
          <Text>{overAllQuantity.money} earned till date</Text>
          <Text>Most Sold Item : {mostSellingItem} </Text>
          <Text>Least Sold Item : {leastSellingItem} </Text>
        </View>
      </View>
    );
  };

  const getDateDistributionUI = () => {
    let allOrders = [];
    tables.forEach(table => {
      allOrders = allOrders.concat(table.orders);
    });
    const filteredOrders = allOrders.filter(order => {
      var orderTime = new Date(order.createdAt);
      return (
        orderTime.getTime() >= startDate.getTime() &&
        orderTime.getTime() <= endDate.getTime()
      );
    });
    const barChartDataSet = filteredOrders
      .map(order => {
        return {
          quantity: parseInt(order.quantity),
          createdAt: new Date(new Date(order.createdAt).setHours(12, 0, 0, 0)),
          color: '#ff0066',
        };
      })
      .reduce((pv, cv) => {
        var nV = Object.assign([], pv);
        var isNew = true;
        pv.forEach((v, pos) => {
          if (v.createdAt.getTime() === cv.createdAt.getTime()) {
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
      .map(({quantity, createdAt}, pos) => {
        return {
          quantity,
          createdAt,
        };
      });

    var mostSellingItem = '';
    var leastSellingItem = '';
    var minQ = Math.min(...barChartDataSet.map(_ => _.quantity));
    var maxQ = Math.max(...barChartDataSet.map(_ => _.quantity));
    barChartDataSet.forEach(data => {
      if (data.data === maxQ) {
        mostSellingItem += data.createdAt.toDateString() + ' ';
      }
      if (data.data === minQ) {
        leastSellingItem += data.createdAt.toDateString() + ' ';
      }
    });

    var chartData = {
      labels: barChartDataSet.map(data => '' + data.createdAt.toDateString()),
      datasets: [
        {
          data: barChartDataSet.map(data => data.quantity),
        },
      ],
    };

    return (
      <View style={styles.pieChartSectionContainer}>
        <View style={styles.titleContainer}>
          <Text>Day wise Distribution</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={windowWidth}
              height={220}
              chartConfig={barChartConfig}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              hasLegend={false}
              absolute
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>Most Sold Date : {mostSellingItem} </Text>
          <Text>Least Sold Date : {leastSellingItem} </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
      {getFiltersUI()}
      {getItemDistributionUI()}
      {getDateDistributionUI()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  filterButton: {
    paddingTop: 10,
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
