import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';
import Block from './Block';
import Text from './Text';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

import { ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Badge, Button, Card, Divider, FAB, Menu, Modal, Provider, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logoutUser } from '../../redux/authReducer';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Product from './Product';

const ProductScreen = ({ navigation, route }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);
  const [badgePanding, setBadgePanding] = useState(0);

  console.log(route);
  
  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabType, setActiveJobType] = useState("Tous");

  const dispatch = useDispatch();

  const jobTypes = ["Tous", "Disponible", "En cours",  "Financé"];

  const p = [
    {
        "_id": "64d204296c29b6d54ee75022",
        "name": "Vin de banane",
        "detail": "Le vin de banane est un vin de fruit fabriqué exclusivement à partir de bananes. Elle est différente de la bière de banane, qui a une longue tradition et une grande importance culturelle en Afrique de l'Est.",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1691485110/bnegx1m5vt46jftsea8o.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1692044202/dxhobsdneboaoabt8qjt.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 2000,
        "initialAmount": 250,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Soumission",
                "details": "Votre produit a été soumis à l'équipe BOMOKO Cash. Et\n      est en attente de validation",
                "timestamp": "2023-08-14T22:38:08.241Z",
                "_id": "64daba16eef17e68383f8ebb"
            },
            {
                "title": "Soumission",
                "details": "Votre produit a été soumis à l'équipe BOMOKO Cash.",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64da9bea64059cce459e0e60"
            },
            {
                "title": "Creation du produit : Vin de banane",
                "details": "Le produit : Vin de banane- cree par Gb",
                "timestamp": "2023-08-08T09:00:21.457Z",
                "_id": "64d204296c29b6d54ee75023"
            }
        ],
        "status": "SUBMITED",
        "startDate": "2023-09-02T00:00:00.000Z",
        "endDate": "2023-09-29T23:59:59.000Z",
        "timestamp": "2023-08-08T09:00:21.457Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "guillain@test.com",
            "mobile": "+243987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
        },
        "couts": [
            {
                "name": "fanstport",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-20T09:38:37.967Z",
                "_id": "64e1e93828239ac1a37c0c4e"
            },
            {
                "name": "Facture d'electricute",
                "amount": 20,
                "validated": false,
                "timestamp": "2023-08-20T09:38:37.967Z",
                "_id": "64e1e93828239ac1a37c0c4f"
            },
            {
                "name": "descc puur le test ",
                "amount": 1,
                "validated": false,
                "timestamp": "2023-08-20T09:38:37.967Z",
                "_id": "64e1e93828239ac1a37c0c50"
            },
            {
                "name": "desc 3",
                "amount": 200,
                "validated": false,
                "timestamp": "2023-08-20T09:38:37.967Z",
                "_id": "64e1e79428239ac1a37c0b92"
            }
        ],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "_id": "64e885f6ff4fb6e53966fc7d",
                    "name": "arrrrr",
                    "email": "arrrrrr@test.me",
                    "mobile": "+123456789090",
                    "username": "Arrrrr",
                    "role": "user",
                    "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "status": "PENDING"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-25T12:29:23.564Z",
                "_id": "64e8a309b0dba99bbc028c32"
            },
            {
                "user": {
                    "_id": "64c9920ac8285d09d37accf5",
                    "name": "Ryanna ADASA",
                    "email": "ryanna@test.me",
                    "mobile": "9876543210",
                    "username": "Ryanna ADASA",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693690790/pgnpjhgoytihsa8pi97p.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T20:21:03.419Z",
                "_id": "64f3a436994cee490ce8a617"
            },
            {
                "user": {
                    "_id": "64c8e9e64b2d32dee269983a",
                    "name": "Justin MUHIRE",
                    "email": "guy@gmail.com",
                    "mobile": "0978532756",
                    "username": "Justin MUHIRE",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T22:30:06.590Z",
                "_id": "64f3bd7bccfd3ede2b36c22d"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64d27322622db34d1e0729a5",
        "name": "Semoule de Maïs",
        "detail": "Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. ",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1691513317/tjvirnrgx0xv5pnifa7h.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691513366/ljd4wqhatnf4zlp76qbf.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691513422/ypdcwcfrmhzvjb6bakvu.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "Bukavu",
            "Kinshasa"
        ],
        "amount": 200,
        "initialAmount": 0,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Soumission",
                "details": "Votre produit a été soumis à l'équipe BOMOKO Cash.",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64da9c9264059cce459e0e7b"
            },
            {
                "title": "Creation du produit : Semoule de Maïs",
                "details": "Le produit : Semoule de Maïs- cree par Gb",
                "timestamp": "2023-08-08T16:53:54.035Z",
                "_id": "64d27322622db34d1e0729a6"
            }
        ],
        "status": "SUBMITED",
        "startDate": "2023-08-31T22:00:00.000Z",
        "endDate": "2023-09-30T21:59:59.000Z",
        "timestamp": "2023-08-08T16:53:54.035Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "guillain@test.com",
            "mobile": "+243987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
        },
        "couts": [
            {
                "name": "TRnasport",
                "amount": 198,
                "validated": false,
                "timestamp": "2023-08-20T11:10:16.048Z",
                "_id": "64e1f880e6e0b5852c0ff401"
            }
        ],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "status": "PENDING",
                    "_id": "64c63ebfb3d187924479edf7",
                    "name": "Josh Brain",
                    "email": "bvenceslas@gmail.com",
                    "mobile": "0790183836",
                    "username": "bvenceslas",
                    "role": "user"
                },
                "admission_req": "ACCEPTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:23:55.983Z",
                "_id": "64db626764660ca6cfdadc3e"
            },
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "REJECTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:57:43.195Z",
                "_id": "64db68740e0caf8add78ae9d"
            },
            {
                "user": {
                    "_id": "64e885f6ff4fb6e53966fc7d",
                    "name": "arrrrr",
                    "email": "arrrrrr@test.me",
                    "mobile": "+123456789090",
                    "username": "Arrrrr",
                    "role": "user",
                    "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "status": "PENDING"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-26T10:02:26.850Z",
                "_id": "64e9f88b26c94721a918d0af"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64d3a9b8774f3daebb477a80",
        "name": "Safisha cleaning ",
        "detail": "Le nettoyage de bureaux est une étape obligatoire dans une entreprise, et ce, régulièrement. C’est pourquoi l’enseigne a besoin d’une équipe de professionnels pour couvrir ce besoin. Le plus pratique est en effet de faire appel à une société spécialisée dans le nettoyage industriel. Cette dernière est à même de garantir la propreté des bureaux au quotidien. Il suffit juste de bien constituer le contrat, de se convenir au tarif et à l’heure du travail sans oublier le nombre de professionnels requis pour effectuer les tâches. Voici les règles de base d’un nettoyage de bureaux. Elles sont importantes pour se conformer aux normes de la propreté au sein d’une société.",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1691592951/oos5zwmtdho8vhg1mxoo.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691592968/uhwfisqpq3ngxje7oymn.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691592987/fkaffkpfn2w3pu5mclgy.png"
        ],
        "docs": [],
        "location": [
            "",
            "",
            "Kinshasa"
        ],
        "amount": 20000,
        "initialAmount": 1500,
        "type": "service",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du service : Safisha cleaning ",
                "details": "Le service : Safisha cleaning - cree par Patrick",
                "timestamp": "2023-08-09T14:24:41.178Z",
                "_id": "64d3a9b8774f3daebb477a81"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-08-09T22:00:00.000Z",
        "endDate": "2023-09-21T21:59:59.000Z",
        "timestamp": "2023-08-09T14:24:41.178Z",
        "owner": {
            "_id": "64d3a7a1774f3daebb477a53",
            "name": "Patrick",
            "email": "patrickabedi02@gmail.com",
            "mobile": "0993328512",
            "username": "Patrick",
            "role": "user",
            "status": "PENDING",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
        },
        "couts": [
            {
                "name": "desss",
                "amount": 33,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e977155b5d14af4c5618"
            },
            {
                "name": "1desc",
                "amount": 145,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e8f2155b5d14af4c5528"
            },
            {
                "name": "1desc",
                "amount": 145,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e8f2155b5d14af4c5529"
            },
            {
                "name": "1desc",
                "amount": 145,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e8f2155b5d14af4c552a"
            },
            {
                "name": "1desc",
                "amount": 145,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e8f2155b5d14af4c552b"
            },
            {
                "name": "second ",
                "amount": 200,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e8f2155b5d14af4c552c"
            },
            {
                "name": "jnnew",
                "amount": 189,
                "validated": false,
                "timestamp": "2023-09-01T13:35:34.483Z",
                "_id": "64f1e8f2155b5d14af4c552d"
            }
        ],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "_id": "64c96038e199bcbfe1e02654",
                    "name": "Gb",
                    "email": "guillain@test.com",
                    "mobile": "+243987654321",
                    "username": "Gb",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-14T22:38:08.155Z",
                "_id": "64dab6a1eef17e68383f8df3"
            },
            {
                "user": {
                    "status": "PENDING",
                    "_id": "64c63ebfb3d187924479edf7",
                    "name": "Josh Brain",
                    "email": "bvenceslas@gmail.com",
                    "mobile": "0790183836",
                    "username": "bvenceslas",
                    "role": "user"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:23:55.983Z",
                "_id": "64db61e564660ca6cfdadbf8"
            },
            {
                "user": {
                    "_id": "64e885f6ff4fb6e53966fc7d",
                    "name": "arrrrr",
                    "email": "arrrrrr@test.me",
                    "mobile": "+123456789090",
                    "username": "Arrrrr",
                    "role": "user",
                    "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "status": "PENDING"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-29T14:40:41.852Z",
                "_id": "64ee0744b99c1b08a6591370"
            },
            {
                "user": {
                    "_id": "64c9920ac8285d09d37accf5",
                    "name": "Ryanna ADASA",
                    "email": "ryanna@test.me",
                    "mobile": "9876543210",
                    "username": "Ryanna ADASA",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693690790/pgnpjhgoytihsa8pi97p.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T20:21:03.419Z",
                "_id": "64f3a440994cee490ce8a630"
            },
            {
                "user": {
                    "_id": "64f498871846d53a62ee2cd5",
                    "name": "MAPENZI NADIA CIREZI",
                    "email": "cirezifood@gmail.com",
                    "mobile": "+243992798802",
                    "username": "MAPENZI NADIA CIREZI",
                    "role": "user",
                    "cover_url": "",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693751712/f8uuukhdphnyxbjnqycy.jpg",
                    "status": "PENDING"
                },
                "admission_req": "ACCEPTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-03T14:19:55.303Z",
                "_id": "64f4a1631846d53a62ee33c1"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64da0c1a00f1523673ecfbb3",
        "name": "FIRE SECURITY EDRC",
        "detail": "\nLe gardiennage de domicile est un service permettant de surveiller et protéger les biens mobiliers et immobiliers de son habitation contre tout acte de malveillance et intrusion",
        "images": [
            "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/add-product/assets/img/serv.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1692520820/lqhynymk0bwpzoygxdff.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 500000,
        "initialAmount": 200000,
        "type": "service",
        "currency": "FC",
        "timeline": [
            {
                "title": "Soumission",
                "details": "Votre service a été soumis à l'équipe BOMOKO Cash.",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64da9ba164059cce459e0e47"
            },
            {
                "title": "Creation du service : FIRE SECURITY EDRC",
                "details": "Le service : FIRE SECURITY EDRC- cree par Gb",
                "timestamp": "2023-08-14T11:00:46.376Z",
                "_id": "64da0c1a00f1523673ecfbb4"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-09-01T00:00:00.000Z",
        "endDate": "2023-10-31T23:59:59.000Z",
        "timestamp": "2023-08-14T11:00:46.376Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "guillain@test.com",
            "mobile": "+243987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
        },
        "couts": [
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e7723faf1fdf6d3db801a2"
            },
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e7723faf1fdf6d3db801a3"
            },
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e7723faf1fdf6d3db801a4"
            },
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e7723faf1fdf6d3db801a5"
            },
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e7723faf1fdf6d3db801a6"
            },
            {
                "name": "desc 1",
                "amount": 200,
                "validated": false,
                "timestamp": "2023-08-20T09:38:37.967Z",
                "_id": "64e1e38528239ac1a37c0a82"
            }
        ],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "REJECTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:23:55.983Z",
                "_id": "64db630464660ca6cfdadca2"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64da89799295ebb4d19b38ef",
        "name": "test ser2",
        "detail": "desc",
        "images": [
            "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/add-product/assets/img/serv.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 200000,
        "initialAmount": 0,
        "type": "service",
        "currency": "FC",
        "timeline": [
            {
                "title": "Soumission",
                "details": "Votre service a été soumis à l'équipe BOMOKO Cash.",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64da9dac64059cce459e0e9a"
            },
            {
                "title": "Creation du service : test ser",
                "details": "Le service : test ser- cree par Gb",
                "timestamp": "2023-08-14T19:15:05.747Z",
                "_id": "64da89799295ebb4d19b38f0"
            },
            {
                "title": "Soumission",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64da9a8564059cce459e0e01"
            },
            {
                "title": "Soumission",
                "details": "Votre service a été soumis à l'équipe BOMOKO Cash.",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64da9b1a64059cce459e0e28"
            }
        ],
        "status": "SUBMITED",
        "startDate": "2023-08-30T00:00:00.000Z",
        "endDate": "2023-08-31T23:59:59.000Z",
        "timestamp": "2023-08-14T19:15:05.747Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "guillain@test.com",
            "mobile": "+243987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
        },
        "couts": [],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "ACCEPTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:57:43.195Z",
                "_id": "64db68650e0caf8add78ae94"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64daa2c864059cce459e0eee",
        "name": "la bourse aux livres",
        "detail": "Notre service est adapté aux personnes qui possèdent de vieux livres dont ils n’ont plus l’utilité. Après avoir dévalisé les librairies, vous souhaitez faire de la place chez vous et gagner de l’argent ? La Bourse aux Livres s’occupe de la vente de vos anciens livres et vous reverse votre argent en cash. Cela vous permet de profiter de vos gains comme bon vous semble. Vous pouvez racheter des romans comme choisir d’économiser pour un voyage, c’est à vous de décider.\n",
        "images": [
            "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/add-product/assets/img/prod.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 1000000,
        "initialAmount": 0,
        "type": "produit",
        "currency": "FC",
        "timeline": [
            {
                "title": "Soumission",
                "details": "Votre produit a été soumis à l'équipe BOMOKO Cash. Et\n      est en attente de validation",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64daaaa964059cce459e1007"
            },
            {
                "title": "Creation du produit : la bourse aux livres",
                "details": "Le produit : la bourse aux livres- cree par Gb",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64daa2c864059cce459e0eef"
            }
        ],
        "status": "SUBMITED",
        "startDate": "2023-09-01T00:00:00.000Z",
        "endDate": "2023-09-28T23:59:59.000Z",
        "timestamp": "2023-08-14T20:35:00.301Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "guillain@test.com",
            "mobile": "+243987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
        },
        "couts": [
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e771beaf1fdf6d3db80155"
            },
            {
                "name": "text",
                "amount": 1234,
                "validated": false,
                "timestamp": "2023-08-24T15:03:53.962Z",
                "_id": "64e771beaf1fdf6d3db80156"
            }
        ],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "status": "PENDING",
                    "_id": "64c63ebfb3d187924479edf7",
                    "name": "Josh Brain",
                    "email": "bvenceslas@gmail.com",
                    "mobile": "0790183836",
                    "username": "bvenceslas",
                    "role": "user"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:23:55.983Z",
                "_id": "64db628964660ca6cfdadc45"
            },
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:57:43.195Z",
                "_id": "64db68610e0caf8add78ae89"
            },
            {
                "user": {
                    "_id": "64e885f6ff4fb6e53966fc7d",
                    "name": "arrrrr",
                    "email": "arrrrrr@test.me",
                    "mobile": "+123456789090",
                    "username": "Arrrrr",
                    "role": "user",
                    "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "status": "PENDING"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-25T12:29:23.564Z",
                "_id": "64e8a063b0dba99bbc028a95"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64daa47564059cce459e0f55",
        "name": "Livres d'Occasion ",
        "detail": "Notre service est adapté aux personnes qui possèdent de vieux livres dont ils n’ont plus l’utilité. Après avoir dévalisé les librairies, vous souhaitez faire de la place chez vous et gagner de l’argent ? La Bourse aux Livres s’occupe de la vente de vos anciens livres et vous reverse votre argent en cash. Cela vous permet de profiter de vos gains comme bon vous semble. Vous pouvez racheter des romans comme choisir d’économiser pour un voyage, c’est à vous de décider.\n",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1692050519/i0lrbvoi27wnm48l8xyd.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "Bukavu",
            ""
        ],
        "amount": 1000000,
        "initialAmount": 0,
        "type": "produit",
        "currency": "FC",
        "timeline": [
            {
                "title": "Creation du produit : Livres d'Occasion ",
                "details": "Le produit : Livres d'Occasion - cree par bvenceslas",
                "timestamp": "2023-08-14T20:35:00.301Z",
                "_id": "64daa47564059cce459e0f56"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-10-01T00:00:00.000Z",
        "endDate": "2023-12-20T23:59:59.000Z",
        "timestamp": "2023-08-14T20:35:00.301Z",
        "owner": {
            "status": "PENDING",
            "_id": "64c63ebfb3d187924479edf7",
            "name": "Josh Brain",
            "email": "bvenceslas@gmail.com",
            "mobile": "0790183836",
            "username": "bvenceslas",
            "role": "user"
        },
        "couts": [
            {
                "name": "Transport maritime",
                "amount": 2000,
                "validated": false,
                "timestamp": "2023-08-20T12:13:32.128Z",
                "_id": "64e209cf62f8e53cc1a47f78"
            }
        ],
        "likes": [],
        "stars": [],
        "membres": [
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T11:23:55.983Z",
                "_id": "64db62f564660ca6cfdadc9b"
            },
            {
                "user": {
                    "_id": "64c96038e199bcbfe1e02654",
                    "name": "Gb",
                    "email": "guillain@test.com",
                    "mobile": "+243987654321",
                    "username": "Gb",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-15T21:19:26.722Z",
                "_id": "64dbec6d7fd36ac2f2674d72"
            },
            {
                "user": {
                    "_id": "64e885f6ff4fb6e53966fc7d",
                    "name": "arrrrr",
                    "email": "arrrrrr@test.me",
                    "mobile": "+123456789090",
                    "username": "Arrrrr",
                    "role": "user",
                    "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                    "status": "PENDING"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-25T10:19:53.208Z",
                "_id": "64e88686ff4fb6e53966fcb3"
            },
            {
                "user": {
                    "_id": "64c8e9e64b2d32dee269983a",
                    "name": "Justin MUHIRE",
                    "email": "guy@gmail.com",
                    "mobile": "0978532756",
                    "username": "Justin MUHIRE",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T22:30:06.590Z",
                "_id": "64f3bd92ccfd3ede2b36c28e"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64e93549b895d09317d18a10",
        "name": "Design Digital",
        "detail": "Le design de services repose sur la scénarisation créative d’une succession d’événements, d’actions et de résultats. Il s’agit d’une activité de conception qui organise des informations et des situations afin d’en augmenter l’efficacité, la perception et la qualité. ",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1693140043/wsh5qicyg4vfrhbvuxuq.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1693140119/bpavldhaxl9rfhrkrpxn.png",
            "https://res.cloudinary.com/micity/image/upload/v1693140167/w962wtcnabbuwfmoqxu1.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 3000,
        "initialAmount": 1000,
        "type": "service",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du service : Design",
                "details": "Le service : Design- cree par Ar",
                "timestamp": "2023-08-25T21:19:30.040Z",
                "_id": "64e93549b895d09317d18a11"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-12-01T00:00:00.000Z",
        "endDate": "2023-12-31T23:59:59.000Z",
        "timestamp": "2023-08-25T21:19:30.040Z",
        "owner": {
            "_id": "64e885f6ff4fb6e53966fc7d",
            "name": "arrrrr",
            "email": "arrrrrr@test.me",
            "mobile": "+123456789090",
            "username": "Arrrrr",
            "role": "user",
            "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
            "status": "PENDING"
        },
        "likes": [],
        "stars": [],
        "couts": [
            {
                "name": "Frais de services divers (publicité canal+, frais marketing ",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a42f"
            },
            {
                "name": "Location camion de distribution",
                "amount": 33.33,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a430"
            },
            {
                "name": "Salaire chargé de marketing",
                "amount": 10,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a431"
            },
            {
                "name": "Salaire des autres agents ADMIN",
                "amount": 25,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a432"
            },
            {
                "name": "- SF PRODUIT FINI",
                "amount": -95,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a433"
            },
            {
                "name": "+ SI PRODUIT FINI",
                "amount": 88,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a434"
            },
            {
                "name": "Paiement Impôts et Taxes du mois",
                "amount": 3,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a435"
            },
            {
                "name": "Paiement Loyer PME PAIN DOUCE",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a436"
            },
            {
                "name": "Paiement salaire GESTIONNAIRE",
                "amount": 20,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef4b835e3a3347de4a437"
            },
            {
                "name": "Paiement M-O Occasionnelle  ",
                "amount": 20,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef32f35e3a3347de4a22a"
            },
            {
                "name": "Salaire mensuel Chimiste (100$ le mois pour 20 000 pains)",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef32f35e3a3347de4a22b"
            },
            {
                "name": "Salaire mensuel chef production (120$ le mois pour 20 000 pains)",
                "amount": 6,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef32f35e3a3347de4a22c"
            },
            {
                "name": "Amortissement (1200$ l'an pour 20 000 pain le mois)",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef32f35e3a3347de4a22d"
            },
            {
                "name": "Paiement facture eau REGIDESO (25$ le mois pour 20 000 pains 210g)",
                "amount": 2.5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef32f35e3a3347de4a22e"
            },
            {
                "name": "SALAIRE MENSUEL MAGASINIER (100$ le mois pour 20 000 pains)",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eef32f35e3a3347de4a22f"
            },
            {
                "name": "- SF Fourn LEVURE GRAND PATISSIER",
                "amount": -2.5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeeeb035e3a3347de4a11b"
            },
            {
                "name": "- SF Fourn SUCRE BRUN ",
                "amount": -28.33,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeed6d35e3a3347de4a087"
            },
            {
                "name": "-  SF  MP FARINE DE FROMENT AZAM",
                "amount": -99.35,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeed6d35e3a3347de4a088"
            },
            {
                "name": "+ SI Fourn LEVURE GRAND PATISSIER",
                "amount": 0,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a001"
            },
            {
                "name": "+ SI Fourn SUCRE BRUN ",
                "amount": 30,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a002"
            },
            {
                "name": "+  SI  MP FARINE DE FROMENT AZAM",
                "amount": 8,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a003"
            },
            {
                "name": "Combustible Charbon de bois",
                "amount": 40,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a004"
            },
            {
                "name": "Fourn CASH POWER",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a005"
            },
            {
                "name": "Fourn At non stockable (SEL, AROMES, …)",
                "amount": 20,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a006"
            },
            {
                "name": "LEVURE GRAND PATISSIER",
                "amount": 5,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a007"
            },
            {
                "name": "FOURN SUCRE BRUN",
                "amount": 60,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeecfb35e3a3347de4a008"
            },
            {
                "name": "MP FARINE FROMANT AZAM",
                "amount": 300,
                "validated": false,
                "timestamp": "2023-08-30T07:12:00.696Z",
                "_id": "64eeec2a35e3a3347de49f57"
            }
        ],
        "membres": [
            {
                "user": {
                    "_id": "64c96038e199bcbfe1e02654",
                    "name": "Gb",
                    "email": "guillain@test.com",
                    "mobile": "+243987654321",
                    "username": "Gb",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
                },
                "admission_req": "ACCEPTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-08-27T11:43:12.601Z",
                "_id": "64eb3dee29abb365fe46bf40"
            },
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-01T11:33:48.783Z",
                "_id": "64f1ccb32ecc419194198565"
            },
            {
                "user": {
                    "_id": "64f315bbc91e949012f1e6f7",
                    "name": "Guillain magadju",
                    "email": "gmagadju@gmail.com ",
                    "mobile": "+243973394335",
                    "username": "Guillain magadju",
                    "role": "user",
                    "cover_url": "",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693652404/mir6orhmk3qnq9qslmes.jpg",
                    "status": "PENDING"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T10:48:45.761Z",
                "_id": "64f31679c91e949012f1e838"
            },
            {
                "user": {
                    "_id": "64c9920ac8285d09d37accf5",
                    "name": "Ryanna ADASA",
                    "email": "ryanna@test.me",
                    "mobile": "9876543210",
                    "username": "Ryanna ADASA",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693690790/pgnpjhgoytihsa8pi97p.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T20:21:03.419Z",
                "_id": "64f3a44a994cee490ce8a671"
            },
            {
                "user": {
                    "_id": "64c8e9e64b2d32dee269983a",
                    "name": "Justin MUHIRE",
                    "email": "guy@gmail.com",
                    "mobile": "0978532756",
                    "username": "Justin MUHIRE",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T22:30:06.590Z",
                "_id": "64f3bd8accfd3ede2b36c281"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64f31751c91e949012f1e993",
        "name": "Vente des mangues ",
        "detail": "Mangue d’uvira",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1693652690/vkzsipngoe8bllxqce0y.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1693653117/zqor8jet6ol4ojg7gmhj.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 500,
        "initialAmount": 200,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du produit : Vente des mangues ",
                "details": "Le produit : Vente des mangues - cree par Guillain magadju",
                "timestamp": "2023-09-02T10:48:45.762Z",
                "_id": "64f31751c91e949012f1e994"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-09-11T22:00:00.000Z",
        "endDate": "2023-09-30T21:59:59.000Z",
        "timestamp": "2023-09-02T10:48:45.762Z",
        "owner": {
            "_id": "64f315bbc91e949012f1e6f7",
            "name": "Guillain magadju",
            "email": "gmagadju@gmail.com ",
            "mobile": "+243973394335",
            "username": "Guillain magadju",
            "role": "user",
            "cover_url": "",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693652404/mir6orhmk3qnq9qslmes.jpg",
            "status": "PENDING"
        },
        "likes": [],
        "stars": [],
        "couts": [
            {
                "name": "Achats emballages",
                "amount": 22,
                "validated": false,
                "timestamp": "2023-09-02T10:48:45.762Z",
                "_id": "64f3184ec91e949012f1ec1b"
            },
            {
                "name": "Transport ",
                "amount": 65,
                "validated": false,
                "timestamp": "2023-09-02T10:48:45.762Z",
                "_id": "64f3184ec91e949012f1ec1c"
            },
            {
                "name": "Acquisition mangues ",
                "amount": 450,
                "validated": false,
                "timestamp": "2023-09-02T10:48:45.762Z",
                "_id": "64f3184ec91e949012f1ec1d"
            }
        ],
        "membres": [
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "ACCEPTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T10:48:45.761Z",
                "_id": "64f31788c91e949012f1ea45"
            },
            {
                "user": {
                    "_id": "64c96038e199bcbfe1e02654",
                    "name": "Gb",
                    "email": "guillain@test.com",
                    "mobile": "+243987654321",
                    "username": "Gb",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T10:48:45.761Z",
                "_id": "64f31905c91e949012f1edaa"
            },
            {
                "user": {
                    "_id": "64c9920ac8285d09d37accf5",
                    "name": "Ryanna ADASA",
                    "email": "ryanna@test.me",
                    "mobile": "9876543210",
                    "username": "Ryanna ADASA",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693690790/pgnpjhgoytihsa8pi97p.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T20:21:03.419Z",
                "_id": "64f3a452994cee490ce8a680"
            },
            {
                "user": {
                    "_id": "64c8e9e64b2d32dee269983a",
                    "name": "Justin MUHIRE",
                    "email": "guy@gmail.com",
                    "mobile": "0978532756",
                    "username": "Justin MUHIRE",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
                },
                "admission_req": "PENDING",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-02T22:30:06.590Z",
                "_id": "64f3bd83ccfd3ede2b36c23e"
            }
        ],
        "__v": 0
    },
    {
        "_id": "64f49cce1846d53a62ee2f33",
        "name": "Somilaris",
        "detail": "Farine infantile composé du Maïs, soja, millet, arachide, riz et sésame ",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1693751804/mzkeb6m1yxcmhut2fxp3.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1693751823/fmi9nxc48srpk8u7skl8.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 1500,
        "initialAmount": 200,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Soumission",
                "details": "Votre produit a été soumis à l'équipe BOMOKO Cash et est en attente de validation",
                "timestamp": "2023-09-03T14:19:55.304Z",
                "_id": "64f4a13f1846d53a62ee32d8"
            },
            {
                "title": "Creation du produit : Somilaris",
                "details": "Le produit : Somilaris- cree par MAPENZI NADIA CIREZI",
                "timestamp": "2023-09-03T14:19:55.304Z",
                "_id": "64f49cce1846d53a62ee2f34"
            }
        ],
        "status": "SUBMITED",
        "startDate": "2023-09-30T22:00:00.000Z",
        "endDate": "2023-10-31T21:59:59.000Z",
        "timestamp": "2023-09-03T14:19:55.304Z",
        "owner": {
            "_id": "64f498871846d53a62ee2cd5",
            "name": "MAPENZI NADIA CIREZI",
            "email": "cirezifood@gmail.com",
            "mobile": "+243992798802",
            "username": "MAPENZI NADIA CIREZI",
            "role": "user",
            "cover_url": "",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693751712/f8uuukhdphnyxbjnqycy.jpg",
            "status": "PENDING"
        },
        "likes": [],
        "stars": [],
        "couts": [
            {
                "name": "Achat matiere première ",
                "amount": 800,
                "validated": false,
                "timestamp": "2023-09-03T14:19:55.304Z",
                "_id": "64f4a0d61846d53a62ee313f"
            }
        ],
        "membres": [
            {
                "user": {
                    "_id": "64d3a7a1774f3daebb477a53",
                    "name": "Patrick",
                    "email": "patrickabedi02@gmail.com",
                    "mobile": "0993328512",
                    "username": "Patrick",
                    "role": "user",
                    "status": "PENDING",
                    "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
                },
                "admission_req": "ACCEPTED",
                "contribution_amount": 0,
                "contribution_status": "PENDING",
                "timestamp": "2023-09-03T14:19:55.303Z",
                "_id": "64f4a1fc1846d53a62ee3650"
            }
        ],
        "__v": 0
    }
]

  const onChangeSearch = query => setSearchQuery(query);

   // Function to handle screen reload
   const reloadScreen = (value) => {
    // You can put your screen reload logic here
    console.log('Screen reloaded');
    const parsedValue = JSON.parse(value);
    if (parsedValue.user && parsedValue.user.user) {
      setConnectedUser(parsedValue.user.user);
      setLoading(false)
      console.log('Async State:', parsedValue.user.user);
    }
  };

   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // Data found, reload the screen
            reloadScreen(value);
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };

      // Fetch data when the screen gains focus
      fetchData();

      // Return a cleanup function
      return () => {
        // You can perform cleanup here if needed
        console.log('Cleanup function');
      };
    }, []) // Empty dependency array to run this effect only once when the screen mounts
  );

  
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  // Modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
  };
  
  const handleLogin = () => {
    closeMenu();
    navigation.navigate('AuthScreen');
  };
  
  const handleLogout = async() => {
    closeMenu();
    setConnectedUser(null);
    dispatch(logoutUser());

    navigation.navigate('AuthScreen');
  };
  

  const onRefresh = async () => {

    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }

    setRefreshing(loading);
  };

  console.log();
  console.log();

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 3,
          justifyContent: 'space-between',
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
              paddingRight: SIZES.base * 2,
            }}
            onPress={() => {
              console.log('Menu');
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
          
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>African Fintech</Text>
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>(Produits et Services)</Text>
        </View>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
          onPress={() => {
            console.log('shopping');
          }}
        >
          <Image
            source={icons.shopping}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
            <Badge style={{ position:"absolute", top:2, right:-8 }}>{badgePanding}</Badge>

        </TouchableOpacity>
        { 
      
      <View
        style={{
          justifyContent: 'center', alignItems: 'flex-end', width: 50
        }}>
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={

            <TouchableOpacity
            style={{  justifyContent: 'center', width: 40 }}
            onPress={openMenu}
          >
            {connectedUser?.profile_pic ? (
        <Image
          source={{ uri: connectedUser?.profile_pic }}
          style={{ width: 40, height: 40, borderRadius:20, borderWidth:1,
             borderColor: COLORS.white}}
        />
      ) : (
        <LottieView
          style={{
            width: 40,
            marginTop: 0,
          }}
          source={require('./../../assets/json/animation_lksuvej7.json')}
          autoPlay
          loop
        />
      )}
          </TouchableOpacity>
          }>
            {
              connectedUser?.username?
              <Menu.Item leadingIcon="account" onPress={() => {
                //console.log('User --', user.user.username);
                console.log('User --', connectedUser.userId);
                navigation.navigate('Profile', {
                  userId: connectedUser.userId,
                })
    
              }}
               title={connectedUser?.username} />
               :<></>
            }
          
          <Divider />

          {
              connectedUser?.username?
              <Menu.Item leadingIcon="logout" onPress={handleLogout} title="Deconnexion" />
                :
              <Menu.Item leadingIcon="login" onPress={handleLogin} title="Se connecter" />

            }
        </Menu>
      </View>
      }       
      </View>
      </View>
    );
  }

  const tabTop = () => (

    <View style={styles.tabsContainer}>
    <FlatList
      data={jobTypes}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.tab(activeTabType, item)}
          onPress={() => {
            setActiveJobType(item);
          }}
        >
          <Text style={styles.tabText(activeTabType, item)}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      contentContainerStyle={{ columnGap: SIZES.base*1.5 }}
      horizontal
    />
  </View>
  )
  

  if (loading) {
    return <ActivityIndicator size="large" />
  }
  else {
    return (
   
      <Provider>
       
      <ImageBackground
        style={{  position: 'absolute', height: '100%', width: '100%' }}
        source={require('./../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
       <Block flex  >
     
        {/* Nav bar section */}
        {renderNavBar()}
  
        <Block flex color="grey">
        
        <Block flex color="grey" p={15}>
          <View style={{ paddingTop: 5 }} 
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
            <Block flex={false}>
             
              <Searchbar
                placeholder="Rechecher un produit/service"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </Block>
            {
              loading?<ActivityIndicator size="large" />: <></>
            }
            {
              tabTop()
            }
             <ScrollView style={{ flexGrow: 1, height:'80%' }} showsHorizontalScrollIndicator={false}>
              {
                p.map((product,index)=>
                <Product prod={product} navigation={navigation} />)
              }
              </ScrollView>
            
           </View>
        </Block>
      </Block>

      <Modal
        style={{ zIndex: 99 }}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Vous devez d'abord vous connecter</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModal}>Annuler</Button>
            <Button buttonColor={COLORS.red}
             onPress={() => {
              hideModal()
              navigation.navigate('AuthScreen')
            }} >Se Connecter</Button>
          </Card.Actions>
        </Card>
      </Modal>

        <FAB icon="plus" variant="tertiary" style={styles.fab} 
        onPress={() => {
          console.log()
    
          if(!connectedUser) {
            showModal(true);
          }
          else {
            navigation.navigate('AddProduct', { owner: connectedUser?.userId,
              username: connectedUser?.username });
          }
       
        }} />
     
      
      </Block>
      <Block></Block>
      </Provider>
    );
  };
  }
 

const styles = StyleSheet.create({
 
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.base*2,
  },
  tab: (activeTabType, item) => ({
    paddingHorizontal:SIZES.base*2,
    paddingVertical:SIZES.base,
    borderRadius: SIZES.radius*2,
    borderWidth: 1,
    marginBottom:SIZES.base*2,
    borderColor: activeTabType === item ? COLORS.secondary : COLORS.gray,
    backgroundColor: activeTabType === item ? COLORS.secondary : COLORS.lightGray2,
    elevation:2,
  }),
  tabText: (activeTabType, item) => ({
    color: activeTabType === item ? COLORS.white : COLORS.black,
    fontWeight: 'bold',
  }),
  fab: {
    position: 'absolute',
    margin: 16,
    //backgroundColor: '#ff0000',
    right: 0,
    bottom: 0,
  },
});

export default ProductScreen;
