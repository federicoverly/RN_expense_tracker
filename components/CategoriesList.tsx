import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../constants';

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
  icon: string;
  color: string;
  expenses: Expense[];
}

export interface Props {
  categories: Category[];
}

const CategoriesList = ({categories}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>({});
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
        onPress={() => setSelectedCategory(item)}>
        <Image
          source={item.icon}
          style={{width: 20, height: 20, tintColor: item.color}}
        />
        <Text style={{marginLeft: SIZES.base, color: COLORS.primary}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{paddingHorizontal: SIZES.padding - 5}}>
      <View>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
