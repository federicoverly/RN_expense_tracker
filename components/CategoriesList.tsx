import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, icons, SIZES} from '../constants';
import IncomingExpenses from './IncomingExpenses';

export interface Expense {
  id: number;
  title: string;
  description: string;
  location: string;
  total: number;
  status: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string | number | any;
  color: string;
  expenses: Expense[];
}

export interface Props {
  categories: Category[];
}

const CategoriesList = ({categories}: Props) => {
  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115),
  ).current;
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [showMoreToggle, setShowMoreToggle] = useState<boolean>(false);
  const renderItem = ({item}: {item: Category}) => {
    return (
      <TouchableOpacity
        style={[styles.categoryContainer, styles.shadow]}
        onPress={() => setSelectedCategory(item)}>
        <Image
          source={item.icon}
          style={{...styles.categoryImage, tintColor: item.color}}
        />
        <Text style={{marginLeft: SIZES.base, color: COLORS.primary}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{paddingHorizontal: SIZES.padding - 5}}>
      <Animated.View style={{height: categoryListHeightAnimationValue}}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          numColumns={2}
        />
      </Animated.View>
      <TouchableOpacity
        style={styles.moreContainer}
        onPress={() => {
          if (showMoreToggle) {
            Animated.timing(categoryListHeightAnimationValue, {
              toValue: 115,
              duration: 300,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.timing(categoryListHeightAnimationValue, {
              toValue: 240,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }
          setShowMoreToggle(!showMoreToggle);
        }}>
        <Text>{showMoreToggle ? 'LESS' : 'MORE'}</Text>
        <Image
          source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
          style={styles.moreIcon}
        />
      </TouchableOpacity>
      <View>
        <IncomingExpenses selectedCategory={selectedCategory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  categoryImage: {
    width: 20,
    height: 20,
  },
  moreContainer: {
    flexDirection: 'row',
    marginVertical: SIZES.base,
    justifyContent: 'center',
  },
  moreIcon: {
    marginLeft: 5,
    height: 15,
    width: 15,
    alignSelf: 'center',
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
export default CategoriesList;
