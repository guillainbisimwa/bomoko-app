import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider, FAB, IconButton, Modal, TextInput } from 'react-native-paper';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
import { Button } from 'react-native-paper';
import { addCat, loadCategoriesFromStorage, resetAllCat } from '../redux/catReducer';
import { addDays, parse } from 'date-fns';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Block, Text } from '../components';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { fr, registerTranslation, DatePickerModal, DatePickerInput } from 'react-native-paper-dates'
import AsyncStorage from '@react-native-async-storage/async-storage';


// const filterArrayByDate = (arr, dateCriteria) => {
//   const currentDate = new Date();

//   return arr.filter(item => {
//     return item.data.some(dataItem => {
//       const dataDate = new Date(dataItem.date);

//       // Check if the date is within the specified criteria
//       if (dateCriteria === 'today') {
//         return dataDate.toDateString() === currentDate.toDateString();
//       } else if (dateCriteria === 'thisWeek') {
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

//         return dataDate >= startOfWeek && dataDate <= currentDate;
//       } else if (dateCriteria === 'thisMonth') {
//         return (
//           dataDate.getMonth() === currentDate.getMonth() &&
//           dataDate.getFullYear() === currentDate.getFullYear()
//         );
//       } else if (
//         dateCriteria.startDate &&
//         dateCriteria.endDate &&
//         dataDate >= new Date(dateCriteria.startDate) &&
//         dataDate <= new Date(dateCriteria.endDate)
//       ) {
//         return true;
//       } else if (dateCriteria.selectedDate) {
//         return dataDate.toDateString() === new Date(dateCriteria.selectedDate).toDateString();
//       }

//       // Return false if no criteria match
//       return false;
//     });
//   });
// };

// // Example usage:
// const todayFiltered = filterArrayByDate(arr, 'today');
// const thisWeekFiltered = filterArrayByDate(arr, 'thisWeek');
// const thisMonthFiltered = filterArrayByDate(arr, 'thisMonth');
// const rangeFiltered = filterArrayByDate(arr, {
//   startDate: '2023-11-01',
//   endDate: '2023-11-15',
// });
// const selectedDateFiltered = filterArrayByDate(arr, { selectedDate: '2023-11-10' });




const Home = ({ navigation }) => {
  const catList = useSelector((state) => state.categories.categories);
  //console.log('catList', catList);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const [Cat, setCat] = useState('income');
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    //padding: 20,
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
  };

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const snapPoints = useMemo(() => ["50%", '70%', '80%', '90%'], []);
  const [openDebit, setOpenDebit] = useState(false);
  const [openCredit, setOpenCredit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');
  const [total, setTotal] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [selectedId, setSelectedId] = useState('');

  const [mod, setMod] = useState(false);
  const [supp, setSupp] = useState(false);

  // Dates
  const [openToday, setOpenToday] = useState(false);

  const onDismissSingleToday = useCallback(() => {
    setOpenToday(false);
  }, [setOpenToday]);

  const [dateToday, setDateToday] = useState(undefined);

  const onConfirmSingleToday = useCallback(
    (params) => {
      setOpenToday(false);
      setDateToday(params.date);
    },
    [setOpenToday, setDateToday]
  );

  const [openAll, setOpenAll] = useState(false);

  const [dateRange, setDateRange] = useState({ startDate: undefined, endDate: undefined });

  const [openRange, setOpenRange] = useState(false);

  const onConfirmSingleRange = useCallback(
    ({ startDate, endDate }) => {
      setOpenRange(false);
      setDateRange({ startDate, endDate });
    },
    [setOpenRange, setDateRange]
  );

  const onDismissSingleRange = useCallback(() => {
    setOpenRange(false);
  }, [setOpenRange]);



  const [openMonth, setOpenMonth] = useState(false);

  const onDismissSingleMonth = useCallback(() => {
    setOpenMonth(false);
  }, [setOpenMonth]);

  const [dateMonth, setDateMonth] = useState(undefined);

  const onConfirmSingleMonth = useCallback(
    (params) => {
      setOpenMonth(false);
      setDateMonth(params.date);
    },
    [setOpenMonth, setDateMonth]
  );



  // const bottomSheetDebit = useRef(null);
  // const bottomSheetCredit = useRef(null);
  const bottomSheetDetails = useRef(null);

  const BackdropElement = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.7}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  // const openModalDebit = useCallback(() => {
  //   bottomSheetDebit.current?.present();
  //   setTimeout(() => {
  //     setOpenDebit(true);
  //   }, 5);
  // }, []);

  // const openModalCredit = useCallback(() => {
  //   bottomSheetCredit.current?.present();
  //   setTimeout(() => {
  //     setOpenCredit(true);
  //   }, 5);
  // }, []);

  const updateAsyncStorage = async(updatedArr)=>{
    console.log("Cat", Cat);
    await AsyncStorage.removeItem('categories');
    await dispatch(addCat(updatedArr));

    //await AsyncStorage.setItem('categories', JSON.stringify(updatedArr));

    // await setCategories(updatedArr);
    await setCategories(updatedArr.filter((value, key) => value.cat === 'income'));
    await setCat('income');
  }

  const openModalDetails = useCallback(() => {
    bottomSheetDetails.current?.present();
    setTimeout(() => {
      setOpenDetails(true);
    }, 5);
  }, []);

  const handleClosePressDisplayDetail = useCallback(() => {
    bottomSheetDetails.current?.close();
  }, []);

  const hideModalDisplayDetail = () => handleClosePressDisplayDetail();



  // const renderBottomDebit = () => (
  //   <BottomSheetModal
  //     ref={bottomSheetDebit}
  //     index={1}
  //     backdropComponent={BackdropElement}
  //     snapPoints={snapPoints}
  //     onDismiss={() => setOpenDebit(false)}
  //   >
  //     <BottomSheetScrollView style={{ padding: 17 }}>
  //       <Block row space='between' >
  //         <Text>dEBITS</Text>
  //       </Block>
  //     </BottomSheetScrollView>
  //   </BottomSheetModal>
  // );

  // const renderBottomCredit = () => (
  //   <BottomSheetModal
  //     // style={{ zIndex: 19 }}
  //     ref={bottomSheetCredit}
  //     index={1}
  //     backdropComponent={BackdropElement}
  //     snapPoints={snapPoints}
  //     onDismiss={() => setOpenCredit(false)}
  //   >
  //     <BottomSheetScrollView style={{ padding: 17 }}>
  //       <Block row space='between' >
  //         <Text>CREDIT</Text>
  //       </Block>
  //       {
  //         addIncome()
  //       }
  //     </BottomSheetScrollView>
  //   </BottomSheetModal>
  // );

  const renderBottomDetails = () => (

    <BottomSheetModal
      ref={bottomSheetDetails}
      index={mod ? 1 : 0}
      backdropComponent={BackdropElement}
      snapPoints={snapPoints}
      onDismiss={() => setOpenDetails(false)}
    >
      <BottomSheetScrollView style={{ padding: 17 }}>

        <Block p={17} >
          <Block row space='between'>
            <Block m_b={10} flex={1}>
              <Text bold h2>Details</Text>
              <Text color={supp ? COLORS.red : COLORS.blue}>{supp ? `Voulez-vous vraiment supprimer votre ${selectedItem.name}? ` : mod ? `Voulez-vous vraiment modifer :` : `Details de l'opération.`}</Text>
            </Block>
            <TouchableOpacity
              onPress={() => hideModalDisplayDetail()}
            >
              <IconButton
                icon="close"
                iconColor={COLORS.red}
                size={40}
              />
            </TouchableOpacity>

          </Block>

          {
            mod ?

              <>
                <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={styles.picker}
                    enabled={false}
                  >
                    <Picker.Item label="Selectioner une categorie" value="" />
                    {categories &&
                      categories
                        .map((k, v) => {
                          return <Picker.Item key={k.id} label={k.name} value={k.name} />;
                        })}
                  </Picker>
                </View>
                <TextInput
                  label="Date"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                  mode="outlined"
                  style={styles.input}
                  required
                  keyboardType='default'
                />
                <TextInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  mode="outlined"
                  style={styles.input}
                  required
                />
                <TextInput
                  label="Montant"
                  value={total + ''}
                  onChangeText={setTotal}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.input}
                  required
                />
                <Button
                  elevated
                  buttonColor={COLORS.blue}
                  mode="contained"
                  onPress={() => {
                    console.log('selected.item');
                    console.log('selected.item');
                    console.log('selected.item');
                    console.log('selected.item', selectedItem);

                    const criteria = {
                      "cat": selectedItem.cat,
                      "color": selectedItem.color,
                      "icon": selectedItem.icon,
                      "name": selectedItem.name,
                    };

                    const edited = {
                      "id": selectedItem.id,
                      "date": selectedDate,
                      "description": description,
                      "total": parseFloat(total),
                    };


                    const updatedArr = catList.map(item => {

                      if (
                        item.cat === criteria.cat &&
                        item.color === criteria.color &&
                        item.icon === criteria.icon &&
                        item.name === criteria.name
                      ) {
                          // Update the object in the data array with matching id
                          // item.data = item.data.map(dataItem => {
                          //   if (dataItem.id === edited.id) {
                          //     return { ...dataItem, ...edited };
                          //   }
                          //   return dataItem;
                          // });

                          // Check if name in criteria has changed
                          if (criteria.name !== selectedValue ) {
                            // Push the edited object into the data array of the new name
                            // item.data.push(edited);
                            item.data = item.data.map(dataItem => {
                              console.log(item.data);
                                // return [ ...dataItem, ...edited ];
                            });
                          } else {
                            // Update the object in the data array with matching id
                            item.data = item.data.map(dataItem => {
                              if (dataItem.id === edited.id) {
                                return { ...dataItem, ...edited };
                              }
                              return dataItem;
                            });
                          }
                        }
                      return item;
                    });

                    console.log(JSON.stringify(updatedArr))
                    // setCategories(updatedArr)
                    // dispatch(addCat(updatedArr));
                    updateAsyncStorage(updatedArr);
                    // Close Bottom sheet
                    hideModalDisplayDetail()

                  }}
                  style={{ marginTop: 10 }}
                  icon={({ size, color }) => <FontAwesome name="edit" size={size} color={color} />}
                >
                  Modifier?
                </Button>
              </>

              :
              supp ? <Block>

                <Block style={{ padding: 5 }} row space='between'>
                  {/* <Block flex={1}>
                    <Image
                      source={selectedItem && selectedItem.icon}
                      style={{
                        width: 50,
                        height: 50,
                        tintColor: selectedItem && selectedItem.color,
                        borderRadius: 25, borderWidth: 1,
                        borderColor: selectedItem && selectedItem.color,
                        borderWidth: 1,
                        padding: 5
                      }}
                    />
                  </Block> */}
{/* 
                  <Block flex={4} middle>
                    <Block row space='between'>
                      <Text color={supp ? COLORS.red : COLORS.blue} bold>DATE :</Text>
                      <Text gray>{selectedItem && selectedItem.date}</Text>
                    </Block>

                    <Block row space='between'>
                      <Text color={supp ? COLORS.red : COLORS.blue} bold>TYPE :</Text>
                      <Text gray>{selectedItem && selectedItem.name}</Text>
                    </Block>

                  </Block> */}

                </Block>

                {/* <Block style={{ marginVertical: 8 }} row space='between'>
                  <Text color={supp ? COLORS.red : COLORS.blue} h3 bold>DESCRIPTION</Text>
                  <Text >{selectedItem && selectedItem.description}
                  </Text>
                </Block>

                <Divider />
                <Block style={{ marginVertical: 8 }} row space='between'>
                  <Text color={supp ? COLORS.red : COLORS.blue} h3 bold>SOMME</Text>
                  <Text>{selectedItem && selectedItem.total} USD</Text>
                </Block> */}

                <Button style={{ marginTop: 15 }} mode='contained' buttonColor={COLORS.peach}
                  onPress={() => {
                    // setSupp(true);
                    // setMod(false)
                    // Liste all object here :
                    // console.log('');
                    // console.log('');
                    //console.log('categories', JSON.stringify(categories))

                    // List selected object 
                    //console.log('selectedItem', selectedItem);
                    
                    console.log('selected.item');
                    console.log('selected.item');
                    console.log('selected.item');
                    console.log('selected.item', selectedItem);

                    const criteria = {
                      "cat": selectedItem.cat,
                      "color": selectedItem.color,
                      "icon": selectedItem.icon,
                      "name": selectedItem.name,
                    };

                    const ob = {
                      "id": selectedItem.id,
                      "date": selectedItem.date,
                      "description": selectedItem.description,
                      "total": parseFloat(selectedItem.total),
                    };

                    console.log("catList", catList);
                    console.log()
                    console.log()


                    const updatedArr = catList.map(item => {
                      if (
                        item.cat === criteria.cat &&
                        item.color === criteria.color &&
                        item.icon === criteria.icon &&
                        item.name === criteria.name
                      ) {
                        // Remove the object from data array with the specified date
                        item.data = item.data.filter(dataItem => {
                          console.log(dataItem.id);
                          console.log(ob.id);
                          console.log(dataItem.id !== ob.id);
                          return (
                            dataItem.id !== ob.id
                          );
                        });
                      }
                      return item;
                    });

                  //   const deldArr = (givenArray, idToRemove) => {
                  //     for (let item of givenArray) {
                  //       // Check if the "data" givenArray exists and has elements
                  //       if (item.data && item.data.length > 0) {
                  //         // Find the index of the object with the specified "id" in the "data" givenArray
                  //         const indexToRemove = item.data.findIndex(obj => obj.id === idToRemove);
                    
                  //         // If the object is found, remove it from the "data" givenArray
                  //         if (indexToRemove !== -1) {
                  //           // Ensure that the "data" property is declared using "let"
                  //           item.data = [...item.data.slice(0, indexToRemove), ...item.data.slice(indexToRemove + 1)];
                  //         }
                  //       }
                  //     }
                  //   };
                    

                  // const updatedArr = deldArr( catList, selectedItem.id)

                    console.log("test",JSON.stringify(updatedArr))
                  
                    updateAsyncStorage(updatedArr);
                    
                    // Close Bottom sheet
                    hideModalDisplayDetail()

                  }} >Confirmer la suppression</Button>
              </Block> :
                <View >

                  <Block style={{ padding: 5 }} row space='between'>
                    <Block flex={1}>
                      <Image
                        source={selectedItem && selectedItem.icon}
                        style={{
                          width: 50,
                          height: 50,
                          tintColor: selectedItem && selectedItem.color,
                          borderRadius: 25, borderWidth: 1,
                          borderColor: selectedItem && selectedItem.color,
                          borderWidth: 1,
                          padding: 5
                        }}
                      />
                    </Block>

                    <Block flex={4} middle>
                      <Block row space='between'>
                        <Text bold>DATE :</Text>
                        <Text gray>{selectedItem && selectedItem.date}</Text>
                      </Block>

                      <Block row space='between'>
                        <Text bold>TYPE :</Text>
                        <Text gray>{selectedItem && selectedItem.name}</Text>
                      </Block>

                    </Block>

                  </Block>

                  <Divider />
                  <Block style={{ marginVertical: 8 }} row space='between'>
                    <Text h3 bold>DESCRIPTION</Text>
                    <Text >{selectedItem && selectedItem.description}
                    </Text>
                  </Block>

                  <Divider />
                  <Block style={{ marginVertical: 8 }} row space='between'>
                    <Text h3 bold>SOMME</Text>
                    <Text>{selectedItem && selectedItem.total} USD</Text>
                  </Block>

                  <Divider />
                  <Block row space="between" style={{ marginVertical: 8 }} >
                    <Button mode='outlined' onPress={() => {
                      setSupp(false)
                      setMod(true);
                      setDescription(selectedItem.description);
                      setTotal(selectedItem.total)
                      setSelectedValue(selectedItem.name)
                      setSelectedDate(selectedItem.date)
                      setSelectedId(selectedItem.id)

                    }}>Modifier</Button>
                    <Button mode='contained' buttonColor={COLORS.peach}
                      onPress={() => {
                        setSupp(true);
                        setMod(false)
                      }} >Supprimer </Button>
                  </Block>
                </View>
          }

        </Block>

      </BottomSheetScrollView>
    </BottomSheetModal>
  );


  // SELECTED ITEM
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    // updatedAsyncStorage();

    setCategories(catList.filter((value, key) => value.cat === 'income'));
    setCat('income');
  }, [catList]);
  const [date, setDate] = useState(new Date());

  const updatedAsyncStorage = async () => {
    dispatch(loadCategoriesFromStorage());
    console.log('test1', catList);
    console.log('test', [].length);
  };

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 5,
          justifyContent: 'space-between',
          //alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              //width: 80,
              //justifyContent: 'center',
              //backgroundColor: COLORS.white,
              //borderRadius: 30,
              paddingRight: SIZES.base * 2,
            }}
            onPress={() => {
              console.log('Menu');
              //navigation.navigate(AuthScreen);
              navigation.openDrawer();
            }}
          >
            <Image
              source={icons.menu}
              style={{
                width: SIZES.base * 4,
                height: SIZES.base * 3,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>

          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Afintech</Text>
        </View>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
          onPress={() => console.log('search')}
        >
          <Image
            source={icons.search}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
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
          paddingBottom: SIZES.padding,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 1,
        }}
      >
        <View style={{}}>
          <Text style={{ ...FONTS.h3, color: COLORS.gray }}>(Portefeuil electronique)</Text>
        </View>

        <View style={{}}>

          <Text style={{
            ...FONTS.h1, color: COLORS.yellow, textAlign: 'center',
            fontWeight: 'bold', marginTop: 10
          }}> {totalSumDC()} USD </Text>
        </View>

        <View style={styles.date}>
          <TouchableOpacity
            onPress={() => {
              setDate(addDays(date, -1))
            }}>
            <IconButton
              icon="arrow-left-circle"
              iconColor={COLORS.white}
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => showModal(true)}>
            <Text color={COLORS.white} style={{ paddingTop: 10 }}>{date.toLocaleDateString('fr-FR')}</Text>
            <IconButton
              icon="arrow-down"
              iconColor={COLORS.black}
              size={12}
              style={{ marginLeft: -5 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setDate(addDays(date, 1))
          }}>
            <IconButton
              icon="arrow-right-circle"
              iconColor={COLORS.white}
              size={20}
            />
          </TouchableOpacity>

        </View>


        <View
          style={{
            margin: SIZES.padding,
            // zIndex: 10,
            position: 'absolute',
            top: SIZES.padding * 4.6,
            width: '100%',
            backgroundColor: '#eef2f7', //   lightGray: ,

            //paddingTop: SIZES.padding,
            borderRadius: SIZES.radius,
            ...styles.shadow,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%', padding: '1%', justifyContent: 'space-between' }}>
            {renderIncomingExpensesTitle('income')}
            {renderIncomingExpensesTitle('expense')}
          </View>

        </View>


      </View>
      // </>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          //padding: SIZES.padding,
          paddingTop: SIZES.padding * 2.5,
        }}
      >
      </View>
    );
  }

  // function renderCategoryList() {
  //   const renderItem = ({ item }) => (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setSelectedCategory(item);
  //         //console.log(item)
  //       }}
  //       style={{
  //         flex: 1,
  //         flexDirection: 'row',
  //         margin: 5,
  //         paddingVertical: SIZES.radius,
  //         paddingHorizontal: SIZES.padding,
  //         borderRadius: 5,
  //         backgroundColor: COLORS.white,
  //         ...styles.shadow,
  //       }}
  //     >
  //       <Image
  //         source={item.icon}
  //         style={{
  //           width: 20,
  //           height: 20,
  //           tintColor: item.color,
  //         }}
  //       />
  //       <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>
  //         {item.name}
  //       </Text>
  //     </TouchableOpacity>
  //   );

  //   return (
  //     <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
  //       <Animated.View style={{}}>
  //         <FlatList
  //           data={categories}
  //           renderItem={renderItem}
  //           keyExtractor={(item) => `${item.id}`}
  //           numColumns={2}
  //         />
  //       </Animated.View>
  //     </View>
  //   );
  // }

  function renderIncomingExpensesTitle(myCat) {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 8,
          height: 80,
          backgroundColor: myCat === Cat ? COLORS.white : 'transparent',
          // padding: SIZES.padding,
          // elevation: 0,
          width: '100%',
          margin: '2%',
          justifyContent:'center',
          alignItems:'center'
        }}
        onPress={() => {
          setCat(myCat);
          setCategories(catList.filter((value, key) => value.cat === myCat));
          setSelectedCategory(null);
        }}
      >
        {/* Title */}
        <Text style={{ ...FONTS.h3, color: COLORS.primary }}>
          {' '}
          {myCat === 'income' ? 'ENTREES' : 'SORTIES'}{' '}
        </Text>

        <Text style={{ ...FONTS.h4, color: myCat === 'income' ? COLORS.darkgreen : COLORS.red }}>
          {totalSumDCHome(myCat).toFixed(2) && totalSumDCHome(myCat).toFixed(2)} USD
        </Text>
      </TouchableOpacity>
    );
  }

  function renderIncomingExpenses() {
    let allExpensesCat = selectedCategory ? selectedCategory.data : [];

    let incomingExpenses = allExpensesCat;

    const renderItem = (item) => (
      <TouchableOpacity
        onPress={() => {
          const { data, ...objectWithoutData } = selectedCategory;
          const newItem = { ...objectWithoutData, ...item }
          setSelectedItem(newItem);
          console.log(newItem);

          setMod(false)
          setSupp(false)
          openModalDetails();
        }}
      >
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
      </TouchableOpacity>
    );

    return (
      <View>

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
    categories.map((v, _k) => {
      var el = v.data.map((vv, _kk) => {
        return { ...vv, cat: v.cat, color: v.color, icon: v.icon, name: v.name };
      });
      fin.push(...el);
      return el[0];
    });

    let incomingExpenses = fin;

    const renderItem = (item, cat) => (
      <TouchableOpacity
        onPress={() => {
          console.log('item', item);
          setSelectedItem(item);
          setMod(false)
          setSupp(false)
          // showModal(true);
          openModalDetails()
        }}
      >
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
                <Text numberOfLines={1} style={{ ...FONTS.h3, color: item.color }}>{item && item.name}</Text>
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
              <Text style={{ ...FONTS.h5, color: Cat === 'income' ? COLORS.darkgreen : COLORS.red }}>
                {' '}
                {Cat === 'income' ? '+' : '-'} {item.total} $
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
      </TouchableOpacity>
    );

    return (
      <View>

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

  // const totalSum = () => {
  //   var tot = 0;
  //   categories.map((item) => {
  //     let confirm = item.data; //.filter(a => a.cat == "expense")
  //     var total = parseFloat(
  //       confirm.reduce((a, b) => parseFloat(a) + (parseFloat(b.total) || 0), 0)
  //     );
  //     tot += total;
  //     return total;
  //   });
  //   // console.log(tot);
  //   return tot;
  // };

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

  const totalSumDCHome = (myCat) => {
    // console.log(myCat);
    var tot = 0;
    catList
      .filter((a) => a.cat == myCat)
      .map((item) => {
        let confirm = item.data;
        var total = parseFloat(
          confirm.reduce((a, b) => parseFloat(a) + (parseFloat(b.total) || 0), 0)
        );
        tot += total;
        return total;
      });
    // console.log('tot', tot);
    return tot;
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
    // console.log(chartData)

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
          // console.log('*****************', item);
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
    <BottomSheetModalProvider>
      <ImageBackground
        style={{
          flex: 1, position: 'absolute',
          height: '100%', width: '100%'
        }}
        source={require('./../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <View style={{ flex: 1 }}>
        {/* Nav bar section */}
        {renderNavBar()}

        {/* Header section */}


        <ScrollView
          contentContainerStyle={{
            // paddingBottom: 60,
            //backgroundColor: COLORS.lightGray2,
            // zIndex: 100,
          }}
        >
          {renderHeader()}
          <View style={{ backgroundColor: COLORS.lightGray2, }}>
            {/* Category Header Section */}
            {renderCategoryHeaderSection()}

            {renderExpenseSummary()}

            {/* {renderCategoryList()} */}
            {renderIncomingExpenses()}

            {renderChart()}
          </View>
        </ScrollView>
      </View>

      <Modal
        style={{ zIndex: 99 }}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>

          <Card.Content>
            <Text variant="titleLarge">Choisir la date</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                setOpenRange(true);
              }}>
                <FontAwesome name="calendar" size={70} color={COLORS.black} />
                <Text>Plage de dates</Text>
                <DatePickerModal
                  style={{ display: 'none' }}
                  locale="fr"
                  mode="range"
                  visible={openRange}
                  onDismiss={onDismissSingleRange}
                  startDate={dateRange.startDate}
                  endDate={dateRange.endr}
                  onConfirm={onConfirmSingleRange}
                />

              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setOpenToday(true)}>
                <FontAwesome name="calendar-o" size={70} color={COLORS.black} />
                <Text>Ajourdh'ui</Text>

                <DatePickerModal
                  style={{ display: 'none' }}
                  locale="fr"
                  mode="single"
                  visible={openToday}
                  onDismiss={onDismissSingleToday}
                  date={dateToday}

                  presentationStyle="pageSheet"
                  onConfirm={onConfirmSingleToday}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setOpenMonth(true)}>
                <FontAwesome name="calendar-plus-o" size={70} color={COLORS.black} />
                <Text>Ce mois</Text>
                <DatePickerModal
                  style={{ display: 'none' }}
                  locale="fr"
                  mode="single"
                  visible={openMonth}
                  onDismiss={onDismissSingleMonth}
                  date={dateMonth}

                  presentationStyle="pageSheet"
                  onConfirm={onConfirmSingleMonth}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setOpenAll(true)}>
                <FontAwesome name="calendar-check-o" size={70} color={COLORS.black} />
                <Text>Tous</Text>

              </TouchableOpacity>
            </View>


          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModal}>Annuler</Button>
          </Card.Actions>
        </Card>
      </Modal>


      <FAB.Group
        open={open}
        visible
        variant="tertiary"
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'plus-circle',
            label: 'Crédit (Entrée)',
            //onPress: () => openModalCredit(),
            onPress: () => navigation.navigate('Income', { cat: catList }),
          },
          {
            icon: 'minus-circle',
            label: 'Débit (Sortie)',
            // onPress: () => openModalDebit(),
            onPress: () => navigation.navigate('Expense', { cat: catList }),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
            console.log('catList', catList);
          }
        }}
      />
      {/* {
        renderBottomCredit()
      }
      {
        renderBottomDebit()
      } */}
      {
        renderBottomDetails()
      }
    </BottomSheetModalProvider>
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
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdownContainer: {
    borderWidth: 1.4,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
  },
  hasErrors: {
    borderBottomColor: COLORS.purple,
  },

});

export default Home;
