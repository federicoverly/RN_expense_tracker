import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, icons, SIZES} from '../constants';

const Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}>
      <Text style={{color: COLORS.primary}}>My expenses</Text>
      <Text style={{color: COLORS.darkgray}}>Summary</Text>
      <View style={styles.calendarContainer}>
        <View style={styles.iconContainer}>
          <Image source={icons.calendar} style={styles.icon} />
        </View>
        <View style={{marginLeft: SIZES.padding}}>
          <Text style={{color: COLORS.primary}}>11 Nov.</Text>
          <Text style={{color: COLORS.darkgray}}>18% more than last month</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 20, height: 20, tintColor: COLORS.lightBlue},
});

export default Header;
