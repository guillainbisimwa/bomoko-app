import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import Icon from './Icon';
import nowTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            name="home"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
            />
        );
      case 'Profile':
        return (
          <Icon
            name="user-circle"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
            />
        );
     
      case 'Mes Credits':
        return (
          <Icon
            name="money"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
        case 'Parametres':
        return (
          <Icon
            name="cog"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
        case 'Deconnexion':
        return (
          <Icon
            name="sign-out"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
        case 'Langue':
        return (
          <Icon
            name="language"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
        case 'Apropos':
        return (
          <Icon
            name="info-circle"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      
      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            style={{ fontFamily: 'montserrat-regular', textTransform: 'uppercase', fontWeight: '300' }}
            size={12}
            bold={focused ? true : false}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
          >
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white'
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white'
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
