import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/utils';
import axios from 'axios';


const product = [
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
              "title": "Validation",
              "details": "Votre produit Vin de banane a été validé à l'équipe Afintech!",
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d613b4488c829a98fa07f"
          },
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
          },
          {
              "user": {
                  "_id": "64f91551149778f65a1876b2",
                  "name": "test",
                  "email": "test@me.com",
                  "mobile": "123456789",
                  "username": "test",
                  "role": "user",
                  "cover_url": "",
                  "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
                  "status": "PENDING"
              },
              "admission_req": "PENDING",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-09-07T02:32:47.211Z",
              "_id": "64f939dc2af643e42a14cb7e"
          }
      ],
      "__v": 0,
      "tauxInt": 5
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
              "timestamp": "2023-09-07T02:32:47.211Z",
              "_id": "64f937dd2af643e42a14bd11"
          },
          {
              "user": {
                  "_id": "64f91551149778f65a1876b2",
                  "name": "test",
                  "email": "test@me.com",
                  "mobile": "123456789",
                  "username": "test",
                  "role": "user",
                  "cover_url": "",
                  "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
                  "status": "PENDING"
              },
              "admission_req": "PENDING",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-09-07T02:32:47.211Z",
              "_id": "64f939d12af643e42a14ca59"
          }
      ],
      "__v": 0,
      "tauxInt": 5
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
          },
          {
              "user": {
                  "_id": "64f91729149778f65a18778e",
                  "name": "Joel KIKANDI",
                  "email": "test2@me.com",
                  "mobile": "12345678",
                  "username": "Joel KIKANDI",
                  "role": "user",
                  "cover_url": "",
                  "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1695388290/ytst0twfz6jloqd4muem.jpg",
                  "status": "PENDING"
              },
              "admission_req": "PENDING",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-09-07T01:08:06.819Z",
              "_id": "64f922b8e0ea792a71df5367"
          },
          {
              "user": {
                  "_id": "64f91551149778f65a1876b2",
                  "name": "test",
                  "email": "test@me.com",
                  "mobile": "123456789",
                  "username": "test",
                  "role": "user",
                  "cover_url": "",
                  "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
                  "status": "PENDING"
              },
              "admission_req": "PENDING",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-09-07T02:32:47.211Z",
              "_id": "64f939b72af643e42a14c792"
          }
      ],
      "__v": 0,
      "tauxInt": 5
  },
  {
      "_id": "650d65fe4488c829a98fa98f",
      "name": "SOMILARIS ",
      "detail": "Faire de bouillie infantile mélangée du soja, millet, arachide, riz, sésame maïs. \n",
      "images": [
          "https://res.cloudinary.com/micity/image/upload/v1695376309/e1iss16h4odhnsudyjmw.jpg",
          "",
          "https://res.cloudinary.com/micity/image/upload/v1695376852/sucwcu2p7bnfi9fsqlz9.jpg"
      ],
      "docs": [],
      "location": [
          "Goma",
          "",
          ""
      ],
      "amount": 4000,
      "initialAmount": 300,
      "type": "produit",
      "currency": "USD",
      "tauxInt": 20,
      "timeline": [
          {
              "title": "Validation",
              "details": "Votre produit SOMILARIS  a été validé à l'équipe Afintech!",
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d6d6c4488c829a98fbce5"
          },
          {
              "title": "Validation",
              "details": "Votre produit SOMILARIS  a été validé à l'équipe Afintech!",
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d6d574488c829a98fbc07"
          },
          {
              "title": "Soumission",
              "details": "Votre produit a été soumis à l'équipe Afintech et est en attente de validation",
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d6d344488c829a98fba11"
          },
          {
              "title": "Creation du produit : SOMILARIS ",
              "details": "Le produit : SOMILARIS - cree par Mapenzi Nadia ",
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d65fe4488c829a98fa990"
          }
      ],
      "status": "SUBMITED",
      "startDate": "2023-09-21T22:00:00.000Z",
      "endDate": "2023-10-31T21:59:59.000Z",
      "timestamp": "2023-09-22T09:30:01.226Z",
      "owner": {
          "_id": "650d633d4488c829a98fa41b",
          "name": "Mapenzi Nadia ",
          "email": "cirezifood@gmail.com ",
          "mobile": "0992798802",
          "username": "Mapenzi Nadia ",
          "role": "user",
          "cover_url": "",
          "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
          "status": "PENDING"
      },
      "likes": [],
      "stars": [],
      "couts": [
          {
              "name": "Paiement Salaire journaliers ",
              "amount": 400,
              "validated": false,
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d6b2c4488c829a98fb100"
          },
          {
              "name": "Matière première ",
              "amount": 2000,
              "validated": false,
              "timestamp": "2023-09-22T09:30:01.226Z",
              "_id": "650d69ba4488c829a98fac0a"
          }
      ],
      "membres": [
          {
              "user": {
                  "_id": "64f91729149778f65a18778e",
                  "name": "Joel KIKANDI",
                  "email": "test2@me.com",
                  "mobile": "12345678",
                  "username": "Joel KIKANDI",
                  "role": "user",
                  "cover_url": "",
                  "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1695388290/ytst0twfz6jloqd4muem.jpg",
                  "status": "PENDING"
              },
              "admission_req": "ACCEPTED",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-09-22T09:30:01.225Z",
              "_id": "650d6cb94488c829a98fb7ce"
          },
          {
              "user": {
                  "_id": "64e9fbf726c94721a918d2f4",
                  "name": "Guy BISIMWA",
                  "email": "guy@test.me",
                  "mobile": "+243841550213",
                  "username": "Guy BISIMWA",
                  "role": "user",
                  "cover_url": "",
                  "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693055937/vtx23mj5orxhmobvr9hj.jpg",
                  "status": "PENDING"
              },
              "admission_req": "ACCEPTED",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-09-22T09:30:01.225Z",
              "_id": "650d6dd64488c829a98fbfc5"
          }
      ],
      "__v": 0
  }
]

export const loadProductsFromStorage = createAsyncThunk('products/loadFromStorage', async () => {
  try {
    // Retrieve data from AsyncStorage
    const productsData = await AsyncStorage.getItem('products');
    if (productsData) {
      // Parse the data as JSON
      const products = JSON.parse(productsData);
      return products;
    } else {
      return [...product];
    }
  } catch (error) {
    console.error('Error loading products from AsyncStorage:', error);
    throw error;
  }
});

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of products. 
// Then we define a new slice with an initial state containing 
// an empty list of products, isLoading flag, and an error message if any.

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      BASE_URL +'api/product',
    );
    //console.log("response.data ------->>", response.data);
    return response.data;
  }
);

export const postProduct = createAsyncThunk(
  "product/add",
  async ({  
    name,
    detail,
    location,
    amount,
    images,
    initialAmount,
    type,
    currency,
    timeline,
    startDate,
    endDate,
    owner,
    tauxInt
  }) => {
    console.log(BASE_URL);
    const response = await axios.post( BASE_URL +'api/product', {
      name,
      detail,
      location,
      amount,
      images,
      initialAmount,
      type,
      currency,
      timeline,
      startDate,
      endDate,
      owner,
      tauxInt
    });
    console.log("Add prod---?????? ok==",response.data);
    
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({
    id,
    name,
    detail,
    location,
    status,
    amount,
    images,
    initialAmount,
    type,
    currency,
    timeline,
    startDate,
    endDate,
    couts,
    membres,
    owner,
    tauxInt
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    
    const response = await axios.put(url, { // Use PUT request for updating
        name,
        detail,
        location,
        status,
        amount,
        images,
        initialAmount,
        type,
        currency,
        timeline,
        startDate,
        endDate,
        couts,
        membres,
        owner,
        tauxInt
    });

    console.log("Edit prod---?????? ok==", response.data);
    return response.data;
  }
);

export const soumettreProduct = createAsyncThunk(
  "product/soumettre",
  async ({
    id,
    name,
    detail,
    location,
    status,
    amount,
    images,
    initialAmount,
    type,
    couts,
    currency,
    timeline,
    startDate,
    endDate,
    membres,
    owner,
    tauxInt
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    
    const response = await axios.put(url, { // Use PUT request for updating
      name,
      detail,
      location,
      status,
      amount,
      images,
      initialAmount,
      type,
      currency,
      timeline,
      startDate,
      endDate,
      couts,
      membres,
      owner,
      tauxInt
    });

    console.log("Soummetre prod---?????? ok==", { // Use PUT request for updating
        membres,
    });

    return response.data;
  }
);


export const delProduct = createAsyncThunk(
  "product/delete",
  async ({
    id
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    const response = await axios.delete(url);
    console.log("Delete prod---?????? ok==", response.data);
    return response.data;
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false,
    isLoadingAdhesion: false,
    successAdhesion:"",
    isLoadingAdd: false,
    error: '',
    lastSaved: null,
    success: false,
    successUpdate: false,
  },
  reducers: {
    // addProduct: (state, action) => {
    //   state.products = action.payload;
    //   AsyncStorage.setItem('products', JSON.stringify(action.payload));
    // },
    // resetAllProducts: (state, action) => {
    //   state.products = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadProductsFromStorage.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    .addCase(postProduct.pending, (state) => {
      state.isLoading = true;
      state.isLoadingAdd = true;
      
      state.error = null;
    })
    .addCase(postProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoadingAdd = false;
      
      state.lastSaved = action.payload;
      state.error = null;
      state.success = action.payload.message;

    })
    .addCase(postProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingAdd = false;
      
      state.error = action.error.message;
    })
    .addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      console.log("?????? ok==",action.error.message);

      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(editProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;
      state.successUpdate = true;
    })
    .addCase(editProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(delProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(delProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;

    })
    .addCase(delProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "action.error.message";
    })
    .addCase(soumettreProduct.pending, (state) => {
      state.isLoading = true;
      state.isLoadingAdhesion = true;
      state.error = null;
      console.log("pending");
    })
    .addCase(soumettreProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoadingAdhesion = false;
      state.lastSaved = action.payload;
      state.error = null;
      state.successAdhesion = "Adhesion avec success";
      console.log("action.payload", action.payload);
    

    })
    .addCase(soumettreProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingAdhesion = false;
      state.error = action.error.message;
      console.log("error",  action.error.message);
      
    });
  },
});

//export const { addProduct, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
