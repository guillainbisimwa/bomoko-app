import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';
import Block from './Block';
import Text from './Text';
import { Avatar, TextInput } from 'react-native-paper';

const CoutScreen = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.item.name);
  const [editedAmount, setEditedAmount] = useState(props.item.amount);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTrash = () => {
    // Handle trash icon click event
  };

  const handleCancel = () => {
    // Handle trash icon click event
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };

  const handleAmountChange = (text) => {
    setEditedAmount(text);
  };

  return (
    <Block m_b={25} row style={styles.container}>
      <Avatar.Text size={44} label={props.item.id} style={{ marginRight: 10 }} />
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
            <Text numberOfLines={1} grey_one size={22} bold>
              {props.item.name}
            </Text>
          )}
        </Block>

        <Block m_t={5} row space="between" center>
          <Block>
            {isEditing ? (
              <TextInput
                label="Amount"
                value={`${editedAmount}`}
                onChangeText={handleAmountChange}
                mode="outlined"
                style={[styles.input, { width: 200 }]}
                required
              />
            ) : (
              <Text numberOfLines={1} grey_one size={22} bold>
                {props.item.amount}
              </Text>
            )}
          </Block>
          <Block row>
            {isEditing ? (
              <>
                <TouchableOpacity onPress={handleTrash}>
                  <Ionicons name="close" size={30} color={COLORS.blue} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleTrash}>
                  <Ionicons name="trash" size={30} color={COLORS.peach} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={handleEdit}>
                <Ionicons name="create" size={30} color={COLORS.blue} style={{ marginRight: 12 }} />
              </TouchableOpacity>
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
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
