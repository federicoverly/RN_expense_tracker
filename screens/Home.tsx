import React from 'react';
import {StyleSheet, View} from 'react-native';
import CategoriesSection from '../components/CategoriesSection';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import {COLORS} from '../constants';

export const Home = () => {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar />

      {/* Header section */}
      <Header />

      {/* Category section */}
      <CategoriesSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
