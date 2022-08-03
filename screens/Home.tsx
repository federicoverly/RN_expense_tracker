import React from 'react';
import {View} from 'react-native';
import CategoriesSection from '../components/CategoriesSection';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import {COLORS} from '../constants';

export const Home = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightGray2}}>
      {/* Navbar */}
      <Navbar />

      {/* Header section */}
      <Header />

      {/* Category section */}
      <CategoriesSection />
    </View>
  );
};
