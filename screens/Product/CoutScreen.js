import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';
import Block from './Block';
import Text from './Text';
import { Avatar, TextInput } from 'react-native-paper';

const CoutScreen = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [editedName, setEditedName] = useState(props.item.name);
  const [editedAmount, setEditedAmount] = useState(props.item.amount);

  const handleEdit = () => {
    setIsEditing(true);
    setEditBtn(false)
  };

  const showEditBtn = (val) => {
    setEditBtn(!val);
  };

  const handleCancel = () => {
    // Handle trash icon click event
    setIsEditing(false);
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };

  const handleAmountChange = (text) => {
    setEditedAmount(text);
  };

  return (
    <TouchableOpacity
      onLongPress={() => props.admin?showEditBtn(editBtn):''}
    
      style={{
        width: '90%',
        borderRadius: 15,
        margin: 5,
        backgroundColor: editBtn ? COLORS.lightGray : COLORS.white,
        elevation: editBtn ? 2 : 0,
      }}
    >
      <Block row style={styles.container}>
        <Avatar.Text
          size={44}
          label={editBtn ? 'v' : props.count}
          style={{ marginRight: 10, backgroundColor: editBtn ? COLORS.red : COLORS.purple }}
        />
        <Block flex m_l={10} style={styles.containerText}>
          <Block>
            {isEditing ? (
              <TextInput
                label="Description"
                value={editedName}
                onChangeText={handleNameChange}
                mode="outlined"
                style={styles.input}
                required
              />
            ) : (
              <Text numberOfLines={1} semibold>
                {props.item.name}
              </Text>
            )}
          </Block>

          <Block m_t={5} row space="between" center>
            <Block>
              {isEditing ? (
                <TextInput
                  label="Somme"
                  value={`${editedAmount}`}
                  onChangeText={handleAmountChange}
                  mode="outlined"
                  style={[styles.input, { width: 170 }]}
                  required
                />
              ) : (
                <View style={{ flex:1, flexDirection:'row', justifyContent:"space-between", width:!editBtn?'80%':'100%' }}>

                <Text numberOfLines={1} color={COLORS.peach}>
                  {props.item.amount} {props.currency}
                </Text>
                
                {
                  !editBtn?  <Text numberOfLines={1} bold color={COLORS.peach}>
                  {((props.item.amount/props.totAmount)*100).toFixed(0)} % SUR CR 
                    </Text>:<></>
                }

                </View>
              
              )}
            </Block>
            <Block row >
              {isEditing ? (
                <>
                  <TouchableOpacity style={{ backgroundColor:COLORS.peach, borderRadius:20,padding:3,
                  margin: 3 }} onPress={handleCancel}>
                    <Ionicons name="close" size={35} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor:COLORS.darkgreen, borderRadius:20,padding:3,
                  margin: 3 }} onPress={()=>{
                      setEditBtn(false);
                      handleCancel();
                      props.handleUpdateItem(props.item, editedAmount, editedName)
                    }}>
                    <Ionicons name="checkmark-outline" size={35} color={COLORS.white}  />
                  </TouchableOpacity>
                </>
              ) : editBtn ? (
                <>
                  <TouchableOpacity onPress={()=>{
                    handleEdit();
                    }}>
                    <Ionicons
                      name="create"
                      size={30}
                      color={COLORS.blue}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                      setEditBtn(false)
                      props.handleTrash(props.item)
                    }
                    }>
                    <Ionicons name="trash" size={30} color={COLORS.peach} />
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
            </Block>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,

    padding: 4,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  containerText: {
    width: SIZES.width - 200,
    overflow: 'hidden',
    marginRight: 50,
  },
});

export default CoutScreen;
