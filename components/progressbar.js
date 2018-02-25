import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';



const ProgressBar = () => (
  <View style={styles.progressBar}>
    <ActivityIndicator size="large" color="#EA0000" />
  </View>
);


const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center'
  }
});


export default ProgressBar;