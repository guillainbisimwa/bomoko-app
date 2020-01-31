import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Card, Button } from "../components";
import { nowTheme, articles } from '../constants';
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>
          <Card item={articles[0]} horizontal />
            <Block flex row>
              <Card
                item={articles[1]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Card item={articles[2]} />
            </Block>
            <Card item={articles[3]} horizontal />
            <Card item={articles[4]} full />
          </Block>
          
        </ScrollView>
        <Block style={styles.fab}>
          <GaButton
            round
            onlyIcon
            shadowless
            icon="plus"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 1.625}
            color="error"
            style={[styles.social]}
            //position="bottomRight"
          />
        </Block>
        </Block>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  },
  fab: {
    position: 'absolute',
    right: 0,
    marginBottom:theme.SIZES.BASE * 1.75,
    bottom: 0,position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
});

export default Home;
