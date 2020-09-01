import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SqliteTestComponent from './components/SqliteTestComponent';

import * as SQLite from 'expo-sqlite';
//(window as any).Expo = Object.freeze({ ...(window as any).Expo, SQLite });

export default function App() {
  return (
    <View style={styles.container}>
      <SqliteTestComponent/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
});
