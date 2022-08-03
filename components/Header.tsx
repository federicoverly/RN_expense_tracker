import React from 'react';
import {Image, Text, View} from 'react-native';
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: COLORS.lightGray,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={icons.calendar}
            style={{width: 20, height: 20, tintColor: COLORS.lightBlue}}
          />
        </View>
        <View style={{marginLeft: SIZES.padding}}>
          <Text style={{color: COLORS.primary}}>11 Nov.</Text>
          <Text style={{color: COLORS.darkgray}}>18% more than last month</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
