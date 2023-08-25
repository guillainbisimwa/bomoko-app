import React, { useRef, useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Block } from '../../components';
import { StatusBar } from "expo-status-bar";

const Profile = ({ route, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from API
    fetch(`https://bomoko-backend.onrender.com/auth/${route.params.userId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(route.params.userId);
        setUserDetails(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, []);

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
      <Image source={{ uri: userDetails?.profile_pic }} style={styles.profilePic} />
    );
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color={COLORS.peach} style={styles.loadingIndicator} />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.gray} />
      <Block flex={1}>
        <Block style={{ height: 180 }}>
          {renderCover()}
        </Block>
        {renderProfilePic()}

        {/* Other profile details */}
        
      </Block>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: -75,
    borderWidth: 5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white
  },
});

export default Profile;
