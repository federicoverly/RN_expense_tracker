import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, icons, SIZES} from '../constants';

const Navbar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => console.log('Back')}>
        <Image source={icons.back_arrow} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.iconContainer, alignItems: 'flex-end'}}
        onPress={() => console.log('More')}>
        <Image source={icons.more} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    justifyContent: 'center',
    width: 50,
  },
  icon: {width: 30, height: 30, tintColor: COLORS.primary},
});

export default Navbar;
