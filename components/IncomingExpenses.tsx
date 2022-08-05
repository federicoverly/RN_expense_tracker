import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {Category} from './CategoriesList';

export interface Props {
  selectedCategory: Category | undefined;
}

const IncomingExpenses = ({selectedCategory}: Props) => {
  let allExpenses = selectedCategory ? selectedCategory.expenses : [];

  // filter pending expenses
  let incomingExpenses = allExpenses.filter(a => a.status === 'P');

  console.log(selectedCategory);

  const IncomingExpensesTitle = () => {
    return (
      <View>
        <Text style={{color: COLORS.primary}}>INCOMING EXPENSES</Text>
        <Text style={{color: COLORS.darkgray}}>12 total</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.expenseContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={selectedCategory.icon}
              style={{...styles.image, tintColor: selectedCategory.color}}
            />
          </View>
          <Text style={{color: selectedCategory.color}}>
            {selectedCategory.name}
          </Text>
        </View>
        <View style={{paddingHorizontal: SIZES.padding}}>
          <Text>{item.title}</Text>
          <Text style={{flexWrap: 'wrap', color: COLORS.darkgray}}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <IncomingExpensesTitle />
      {incomingExpenses.length > 0 && (
        <FlatList
          data={incomingExpenses}
          renderItem={item => renderItem(item)}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
      {incomingExpenses.length === 0 && (
        <View style={styles.noExpensesContainer}>
          <Text>No records</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noExpensesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    heigth: 300,
  },
  expenseContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    alignItems: 'center',
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base,
  },
  image: {
    height: 25,
    width: 25,
  },
});

export default IncomingExpenses;
