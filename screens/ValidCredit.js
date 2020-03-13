import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView, 
  NetInfo,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';

import { Button, Icon, Input, ListCLient} from '../components';
import { Images, nowTheme } from '../constants';

import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 4;


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class ValidCredit extends React.Component {
  constructor(props) {
    super(props);
    dataGroups = [];
    dataGroups002 = [];
    const GroupsLocalStorage = AsyncStorage.getItem('GroupsLocalStorage')
    .then(async (value) => {
      //console.log("************************Get Value >> ", JSON.parse(value));
      dataGroups = await JSON.parse(value);
     
      this.state = {
        groups: await dataGroups,
      };
   }).done();

    // this.state = {
    //   st : ""
    // };
  }

  render() {
    const { navigation } = this.props;
    const {
      groups,
    } = this.state;

    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                

              <ScrollView showsVerticalScrollIndicator={false}>
                <Block  middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Comming soon ...
                      </Text>
                      <Block flex>
                    
                    {groups.map((item, index) => {
                      return <Block key={index} flex row>
                      <ListCLient item={item} horizontal/>
                    </Block>
                    })}   

                    </Block>
                    </Block>
            </ScrollView>

              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  




});

export default ValidCredit;
