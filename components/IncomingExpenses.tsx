import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, icons, SIZES} from '../constants';
import {Category, Expense} from './CategoriesList';

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

  const renderItem = ({item, index}: {item: Expense; index: number}) => {
    return (
      <View
        style={{
          ...styles.renderItemContainer,
          ...styles.shadow,
          marginLeft: index === 0 ? SIZES.padding : 0,
        }}>
        <View style={styles.expenseContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={selectedCategory?.icon}
              style={{...styles.image, tintColor: selectedCategory?.color}}
            />
          </View>
          <Text style={{color: selectedCategory?.color}}>
            {selectedCategory?.name}
          </Text>
        </View>
        <View style={{paddingHorizontal: SIZES.padding}}>
          <Text>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.locationTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <Image source={icons.pin} style={styles.locationIcon} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.priceContainer,
            backgroundColor: selectedCategory?.color,
          }}>
          <Text style={styles.confirmText}>
            CONFIRM {item.total.toFixed(2)} EUR
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
  renderItemContainer: {
    width: 300,
    marginRight: SIZES.padding,
    marginVertical: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  itemDescription: {
    flexWrap: 'wrap',
    color: COLORS.darkgray,
  },
  locationTitle: {
    marginTop: SIZES.padding,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.darkgray,
    marginRight: 5,
  },
  locationText: {
    marginBottom: SIZES.base,
    color: COLORS.darkgray,
  },
  priceContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomStartRadius: SIZES.radius,
    borderBottomEndRadius: SIZES.radius,
  },
  confirmText: {
    color: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default IncomingExpenses;
