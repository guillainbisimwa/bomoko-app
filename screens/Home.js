import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { AuthScreen } from './AuthScreen/AuthScreen';

import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';

const Home = ({ navigation }) => {
  const catList = useSelector((state) => state.categories.categories);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(catList.filter((value, key) => value.cat === 'income'));
  }, [catList]);
  const [Cat, setCat] = useState('income');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showMoreToggle, setShowMoreToggle] = useState(false);
  const [date, setDate] = useState(new Date());

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 3,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', width: 50 }}
          onPress={() => {
            console.log('Menu');
            navigation.navigate(AuthScreen);
          }}
        >
          <Image
            source={icons.income}
            style={{
              width: 35,
              height: 35,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
          onPress={() => console.log('search')}
        >
          <Image
            source={icons.search}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          zIndex: 10,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ paddingBottom: SIZES.padding * 3 }}>
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>BOMOKO Cash</Text>
          <Text style={{ ...FONTS.h3, color: COLORS.gray }}>(Portefeuil electronique)</Text>
        </View>

        <View
          style={{
            margin: SIZES.padding,
            zIndex: 10,
            position: 'absolute',
            top: SIZES.padding * 2.6,
            width: '100%',
            backgroundColor: COLORS.secondary,
            paddingTop: SIZES.padding,
            borderRadius: SIZES.radius,
            ...styles.shadow,
          }}
        >
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
            <View
              style={{
                backgroundColor: COLORS.lightGray,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow,
              }}
            >
              <Image
                source={icons.expense}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: COLORS.lightGray,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow,
              }}
            >
              <Image
                source={icons.income}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: COLORS.lightGray,
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow,
              }}
            >
              <Image
                source={icons.more}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.black,
                }}
              />
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              width: '95%',
              alignSelf: 'center',
              marginVertical: SIZES.padding / 2,
              borderColor: COLORS.white,
            }}
          >
            <View
              style={{ marginHorizontal: SIZES.padding / 1, marginVertical: SIZES.padding / 2 }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
                BALANCE TOTALE AU {date.toLocaleDateString('fr-FR')}
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>{totalSumDC()} USD</Text>
            </View>
          </View>
        </View>

        {/* <View style={{ flexDirection: 'row', marginTop: SIZES.padding, alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: COLORS.lightGray,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={icons.calendar}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightBlue
                            }}
                        />
                    </View>

                    <View style={{ marginLeft: SIZES.padding }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>{date.toLocaleDateString('fr-FR')}</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>18% plus que le mois passé</Text>
                    </View>
                </View> */}
      </View>
      // </>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: SIZES.padding,
          paddingTop: SIZES.padding * 3.4 + SIZES.padding,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.lightGray2,
          // zIndex: -10,
        }}
      >
        {/* Title */}
        <View>
          <Text
            style={{ color: Cat == 'expense' ? COLORS.secondary : COLORS.darkgreen, ...FONTS.h3 }}
          >
            {Cat == 'income' ? 'Crédit (Entrée)' : 'Débit (Sortie)'}
          </Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{totalSum()} USD</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Cat == 'income' ? COLORS.darkgreen : null,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            onPress={() => {
              setCat('income');
              setCategories(catList.filter((value, key) => value.cat === 'income'));
              setSelectedCategory(null);
            }}
          >
            <Image
              source={icons.income}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: Cat == 'income' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Cat == 'expense' ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: SIZES.base,
            }}
            onPress={() => {
              setCat('expense');
              setCategories(catList.filter((value, key) => value.cat === 'expense'));
              setSelectedCategory(null);
            }}
          >
            <Image
              source={icons.expense}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: Cat == 'expense' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item);
          //console.log(item)
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
            tintColor: item.color,
          }}
        />
        <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{}}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>
      </View>
    );
  }

  function renderIncomingExpensesTitle() {
    const sumCat =
      selectedCategory &&
      selectedCategory.data.reduce((sum, nbr) => {
        return sum + nbr.total;
      }, 0);

    return (
      <View style={{ height: 80, backgroundColor: COLORS.lightGray2, padding: SIZES.padding }}>
        {/* Title */}
        <Text style={{ ...FONTS.h3, color: COLORS.primary }}>
          {' '}
          {Cat === 'income' ? 'MES ENTREES' : 'MES SORTIES'}{' '}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>
            {' '}
            {selectedCategory && selectedCategory.name} totale :{' '}
          </Text>
          <Text style={{ ...FONTS.h4, color: Cat === 'income' ? COLORS.darkgreen : COLORS.red }}>
            {selectedCategory && sumCat.toFixed(2)} USD
          </Text>
        </View>
      </View>
    );
  }

  function renderIncomingExpenses() {
    let allExpensesCat = selectedCategory ? selectedCategory.data : [];

    let incomingExpenses = allExpensesCat;

    const renderItem = (item) => (
      <View
        style={{
          marginRight: SIZES.padding,
          marginLeft: SIZES.padding,
          marginVertical: SIZES.padding / 3.7,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding / 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: COLORS.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}
            >
              <Image
                source={selectedCategory.icon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: selectedCategory.color,
                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h3, color: selectedCategory.color }}>
                {selectedCategory && selectedCategory.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  overflow: 'hidden',
                  ...FONTS.body5,
                  flexWrap: 'wrap',
                  color: COLORS.darkgray,
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>

          <View style={{ width: '25%', alignItems: 'flex-end' }}>
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>
              {' '}
              {Cat === 'income' ? '+' : '-'} {item.total.toFixed(2)} USD{' '}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.calendar}
                style={{
                  width: 12,
                  height: 12,
                  tintColor: COLORS.darkgray,
                  marginRight: 7,
                  marginTop: 3,
                }}
              />
              <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );

    return (
      <View>
        {/* {renderIncomingExpensesTitle()} */}

        {incomingExpenses.length > 0 && (
          <View>
            {incomingExpenses.map((value, key) => {
              return renderItem(value, key);
            })}
          </View>
        )}

        {incomingExpenses.length == 0 && renderAllIncomingExpenses()}
      </View>
    );
  }

  function renderAllIncomingExpenses() {
    var fin = [];
    let category = categories.map((v, k) => {
      var el = v.data.map((vv, kk) => {
        // {"cat": "income", "color": "#8e44ad", "data":  "icon": 23, "id": 1, "name": "Vente"}

        // console.log({ ...vv, cat: v.cat, color: v.color, icon: v.icon, id: 1, name: v.name });
        return { ...vv, cat: v.cat, color: v.color, icon: v.icon, id: 1, name: v.name };
      });
      console.log('-------------');

      //console.log(...el);
      fin.push(...el);
      //console.log('return', el);

      return el[0];
    });

    // console.log(' ==> ', fin);
    // console.log(' ==> ');

    let incomingExpenses = fin;

    const renderItem = (item, cat) => (
      <View
        style={{
          marginRight: SIZES.padding,
          marginLeft: SIZES.padding,
          marginVertical: SIZES.padding / 3.7,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding / 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: COLORS.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}
            >
              <Image
                source={item.icon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: item.color,
                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h3, color: item.color }}>{item && item.name}</Text>
              <Text
                numberOfLines={1}
                style={{
                  overflow: 'hidden',
                  ...FONTS.body5,
                  flexWrap: 'wrap',
                  color: COLORS.darkgray,
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>

          <View style={{ width: '25%', alignItems: 'flex-end' }}>
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>
              {' '}
              {Cat === 'income' ? '+' : '-'} {item.total.toFixed(2)} USD{' '}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.calendar}
                style={{
                  width: 12,
                  height: 12,
                  tintColor: COLORS.darkgray,
                  marginRight: 7,
                  marginTop: 3,
                }}
              />
              <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );

    return (
      <View>
        {/* {renderIncomingExpensesTitle()} */}

        {incomingExpenses.length > 0 && (
          <View>
            {incomingExpenses.map((value, key) => {
              return renderItem(value, key);
            })}
          </View>
        )}

        {incomingExpenses.length == 0 && (
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
              Aucune {Cat == 'expense' ? 'sortie' : 'entrée'} trouvée
            </Text>
          </View>
        )}
      </View>
    );
  }

  const totalSum = () => {
    var tot = 0;
    categories.map((item) => {
      let confirm = item.data; //.filter(a => a.cat == "expense")
      var total = parseFloat(
        confirm.reduce((a, b) => parseFloat(a) + (parseFloat(b.total) || 0), 0)
      );
      tot += total;
      return total;
    });
    console.log(tot);
    return tot;
  };

  const totalSumDC = () => {
    var totExpense = 0;
    var totIncome = 0;
    catList
      .filter((a) => a.cat == 'expense')
      .map((item) => {
        let confirm = item.data; //.filter(a => a.cat == "expense")
        var total = parseFloat(
          confirm.reduce((a, b) => parseFloat(a) + (parseFloat(b.total) || 0), 0)
        );
        totExpense += total;
        return total;
      });

    catList
      .filter((a) => a.cat == 'income')
      .map((item) => {
        let confirmI = item.data;
        var totalI = parseFloat(
          confirmI.reduce((a, b) => parseFloat(a) + (parseFloat(b.total) || 0), 0)
        );
        totIncome += totalI;
        return totalI;
      });

    return totIncome - totExpense;
  };

  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.data; //.filter(a => a.cat == "expense")
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
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate income data
    let finalChartData = filterChartData.map((item) => {
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

  function setSelectCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0);

    // console.log('Check Chart');
    //console.log(chartData)

    if (Platform.OS == 'ios') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* <VictoryPie
                        
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white",  },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width * 0.8}
                        height={SIZES.width * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    /> */}

          <View style={{ position: 'absolute', top: '42%', left: '42%' }}>
            <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
            <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Credits</Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={SIZES.width} height={SIZES.width} style={{ width: '100%', height: 'auto' }}>
            <VictoryPie
              standalone={false} // Android workaround
              data={chartData}
              labels={(datum) => `${datum.y}`}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? SIZES.width * 0.4
                  : SIZES.width * 0.4 - 10
              }
              innerRadius={70}
              labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
              style={{
                labels: { fill: 'white' },
                parent: {
                  ...styles.shadow,
                },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale={colorScales}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: (props) => {
                            let categoryName = chartData[props.index].name;
                            setSelectCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View style={{ position: 'absolute', top: '42%', left: '43.5%' }}>
            <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
            <Text style={{ ...FONTS.body2, textAlign: 'center' }}>
              {Cat == 'income' ? 'Crédits' : 'Débits'}
            </Text>
          </View>
        </View>
      );
    }
  }

  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name ? item.color : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name ? COLORS.white : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.y} USD - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => `${item.id}`} />
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
        source={require('./../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <View style={{ flex: 1 }}>
        {/* Nav bar section */}
        {renderNavBar()}

        {/* Header section */}
        {renderHeader()}

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 60,
            backgroundColor: COLORS.lightGray2,
            zIndex: 10,
          }}
        >
          <View>
            {/* Category Header Section */}
            {renderCategoryHeaderSection()}

            {renderExpenseSummary()}

            {/* {renderCategoryList()} */}
            {renderIncomingExpenses()}

            {renderChart()}
          </View>
        </ScrollView>
      </View>
    </>
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

export default Home;
