import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, SIZES} from '../constants';
import {Category} from './CategoriesList';

export interface ChartData {
  label: string;
  y: number;
  expenseCount: number;
  color: string;
  name: string;
  id: number;
}

interface Props {
  data: ChartData[];
  selectedCategory: Category | undefined;
  setSelectedCategoryByName: (name: string) => void;
}

const ExpenseSummary = ({
  data,
  selectedCategory,
  setSelectedCategoryByName,
}: Props) => {
  const renderItem = ({item}: {item: ChartData}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.touchableOpacity,
          backgroundColor:
            selectedCategory && selectedCategory.name === item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectedCategoryByName(categoryName);
        }}>
        <View style={styles.rowContainer}>
          <View
            style={{
              ...styles.backgroundLine,
              backgroundColor:
                selectedCategory && selectedCategory.name === item.name
                  ? COLORS.white
                  : item.color,
            }}
          />
          <Text
            style={{
              ...styles.text,
              color:
                selectedCategory && selectedCategory.name === item.name
                  ? COLORS.white
                  : COLORS.primary,
            }}>
            {item.name}
          </Text>
        </View>

        <View style={styles.expenseContainer}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name === item.name
                  ? COLORS.white
                  : COLORS.primary,
            }}>
            {item.y} - EUR - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{padding: SIZES.padding}}>
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundLine: {
    width: 20,
    heigth: 30,
    borderRadius: 5,
  },
  text: {
    marginLeft: SIZES.base,
    color: 'black',
  },
  expenseContainer: {
    justifyContent: 'center',
  },
});
export default ExpenseSummary;
