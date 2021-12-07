import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;