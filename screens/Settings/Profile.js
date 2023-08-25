import React, { useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Block } from '../../components';

const Profile = ({ route, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log();
  console.log("route.params.food", route.params.user);
  console.log();
  const renderCover = () => {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
          <ImageBackground
            source={require('./../../assets/img/cover.png')}
            resizeMode="cover"
            style={{ width: SIZES.width, height: 170, justifyContent: 'flex-end' }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 170,
              }}
            ></LinearGradient>
          </ImageBackground>
      </ScrollView>
    );
  };



  const renderProfilePic = () => {
    return (
      <Image />
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex={1}>
        <Block style={{ height: 180 }}>
          {renderCover()}
        </Block>
        {renderProfilePic()}

      
        
      </Block>



      

     

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
});

export default Profile;
