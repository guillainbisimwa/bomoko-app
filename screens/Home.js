import React from "react";
import { StyleSheet, Dimensions, ScrollView, ToastAndroid } from "react-native";
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Card2 as Card, Button } from "../components";
import { nowTheme, articles } from '../constants';
const { width } = Dimensions.get("screen");

const art = [
  {
    date_creation: "1 janv 2020",
    date_debut: "1580482174597",
    date_fin: "1 mars 2020",
    details: "Volontaires vendeuse de SAMAKI",
    etat: 0,
    id_responsable: "e70c5d03-0cc6-4fbf-abf1-e498b34a232b",
    nom_group: "GOMA UNITY",
    somme: 110,
    type:"group",
    image: require("../assets/img/agri.jpg")
  },
  {
    date_creation: "23 janv 2020",
    date_debut: "1580482174597",
    date_fin: "24 mars 2020",
    details: "Agriculteurs du cafe arabicca a Masisi territoite au centre et au sud",
    etat: 1,
    id_responsable: "e70c5d03-0cc6-4fbf-abf1-e498b34a232b",
    nom_group: "FECOPA",
    somme: 50,
    type:"group",
    image: require("../assets/img/agri.jpg")
  },
  {
    date_creation: "05 janv 2020",
    date_debut: "1580482174597",
    date_fin: "06 mars 2020",
    details: "Cambiste de BIRERE",
    etat: 0,
    id_responsable: "e70c5d03-0cc6-4fbf-abf1-e498b34a232b",
    nom_group: "FOREX GOMA",
    somme: 80,
    type:"group",
    image: require("../assets/img/pic4.jpg")
  }
];

class Home extends React.Component {
  renderArticles = () => {
    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>

            {art.map((item, index) => {
              return <Block key={index} flex row>
              <Card item={item} horizontal />
            </Block>
            })}   
            
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
    justifyContent: 'center',
    elevation: 5
  },
});

export default Home;
