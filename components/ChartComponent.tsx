import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {COLORS, SIZES} from '../constants';
import {Category} from './CategoriesList';
import ExpenseSummary from './ExpenseSummary';

interface Props {
  categories: Category[];
}

const ChartComponent = ({categories}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  function processCategorDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map(item => {
      let confirmExpenses = item.expenses.filter(a => a.status === 'C');
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map(item => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  }

  let chartData = processCategorDataToDisplay();
  let colorScale = chartData.map(item => item.color);
  let totalExpenseCount = chartData.reduce(
    (a, b) => a + (b.expenseCount || 0),
    0,
  );

  const setSelectedCategoryByName = (name: string) => {
    let category = categories.filter(a => a.name === name);
    setSelectedCategory(category[0]);
  };
  return (
    <>
      <View style={styles.container}>
        <VictoryPie
          data={chartData}
          colorScale={colorScale}
          labels={datum => `${datum.y}`}
          radius={({datum}) =>
            selectedCategory && selectedCategory.name === datum.name
              ? SIZES.width * 0.4
              : SIZES.width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({innerRadius}) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: {fill: COLORS.white},
            parent: {
              ...styles.shadow,
            },
          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: props => {
                        let categoryName = chartData[props.index].name;
                        setSelectedCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.alignText}>{totalExpenseCount}</Text>
          <Text style={styles.alignText}>Expenses</Text>
        </View>
      </View>
      {chartData.length > 0 && (
        <ExpenseSummary
          data={chartData}
          selectedCategory={selectedCategory}
          setSelectedCategoryByName={setSelectedCategoryByName}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  alignText: {
    textAlign: 'center',
    fontSize: 18,
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

export default ChartComponent;
