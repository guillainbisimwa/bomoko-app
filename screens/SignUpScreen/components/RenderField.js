import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
//Colors
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';

export default renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  setShowPass,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <View>
        <TextInput
          placeholder={label}
          autoCapitalize="none"
          mode="outlined"
          clearButtonMode={passIcon ? 'never' : 'always'}
          selectionColor={COLORS.darkgreen}
          theme={{ colors: { primary: COLORS.darkgreen } }}
          left={
            <TextInput.Icon
              name={icon}
              size={24}
              color={COLORS.peach}
              style={{ paddingRight: 10 }}
            />
          }
          style={{
            fontSize: 14,
            backgroundColor: 'transparent',
            marginVertical: 5,
            // paddingHorizontal: 5,
          }}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {passIcon ? (
          <MaterialCommunityIcons
            name={showPass ? 'eye' : 'eye-off'}
            size={24}
            color={COLORS.peach}
            onPress={() => {
              setShowPass((prev) => !prev);
            }}
            style={{
              position: 'absolute',
              top: '40%',
              right: 10,
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}
      </View>
      {touched && error && (
        <Text style={{ color: 'red', marginHorizontal: 15, marginTop: 5 }}>{error}</Text>
      )}
    </View>
  );
};
