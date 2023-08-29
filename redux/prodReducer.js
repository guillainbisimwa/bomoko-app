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
          "email": "Gb@test.com",
          "mobile": "0987654321",
          "username": "Gb",
          "role": "user",
          "status": "PENDING"
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
                  "name": "Ar",
                  "email": "ar@test.me",
                  "mobile": "12345678",
                  "username": "Ar",
                  "role": "user",
                  "status": "PENDING"
              },
              "admission_req": "PENDING",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-08-25T12:29:23.564Z",
              "_id": "64e8a309b0dba99bbc028c32"
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
          "email": "Gb@test.com",
          "mobile": "0987654321",
          "username": "Gb",
          "role": "user",
          "status": "PENDING"
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
                  "email": "Patrickabedi02@gmail.com",
                  "mobile": "0993328512",
                  "username": "Patrick",
                  "role": "user",
                  "status": "PENDING"
              },
              "admission_req": "REJECTED",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-08-15T11:57:43.195Z",
              "_id": "64db68740e0caf8add78ae9d"
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
          "email": "Patrickabedi02@gmail.com",
          "mobile": "0993328512",
          "username": "Patrick",
          "role": "user",
          "status": "PENDING"
      },
      "couts": [],
      "likes": [],
      "stars": [],
      "membres": [
          {
              "user": {
                  "_id": "64c96038e199bcbfe1e02654",
                  "name": "Gb",
                  "email": "Gb@test.com",
                  "mobile": "0987654321",
                  "username": "Gb",
                  "role": "user",
                  "status": "PENDING"
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
          "email": "Gb@test.com",
          "mobile": "0987654321",
          "username": "Gb",
          "role": "user",
          "status": "PENDING"
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
                  "email": "Patrickabedi02@gmail.com",
                  "mobile": "0993328512",
                  "username": "Patrick",
                  "role": "user",
                  "status": "PENDING"
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
          "email": "Gb@test.com",
          "mobile": "0987654321",
          "username": "Gb",
          "role": "user",
          "status": "PENDING"
      },
      "couts": [],
      "likes": [],
      "stars": [],
      "membres": [
          {
              "user": {
                  "_id": "64d3a7a1774f3daebb477a53",
                  "name": "Patrick",
                  "email": "Patrickabedi02@gmail.com",
                  "mobile": "0993328512",
                  "username": "Patrick",
                  "role": "user",
                  "status": "PENDING"
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
          "email": "Gb@test.com",
          "mobile": "0987654321",
          "username": "Gb",
          "role": "user",
          "status": "PENDING"
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
                  "email": "Patrickabedi02@gmail.com",
                  "mobile": "0993328512",
                  "username": "Patrick",
                  "role": "user",
                  "status": "PENDING"
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
                  "name": "Ar",
                  "email": "ar@test.me",
                  "mobile": "12345678",
                  "username": "Ar",
                  "role": "user",
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
                  "email": "Patrickabedi02@gmail.com",
                  "mobile": "0993328512",
                  "username": "Patrick",
                  "role": "user",
                  "status": "PENDING"
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
                  "email": "Gb@test.com",
                  "mobile": "0987654321",
                  "username": "Gb",
                  "role": "user",
                  "status": "PENDING"
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
                  "name": "Ar",
                  "email": "ar@test.me",
                  "mobile": "12345678",
                  "username": "Ar",
                  "role": "user",
                  "status": "PENDING"
              },
              "admission_req": "PENDING",
              "contribution_amount": 0,
              "contribution_status": "PENDING",
              "timestamp": "2023-08-25T10:19:53.208Z",
              "_id": "64e88686ff4fb6e53966fcb3"
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
    owner 
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
      owner 
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
    amount,
    images,
    initialAmount,
    type,
    currency,
    timeline,
    startDate,
    endDate,
    owner
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    
    const response = await axios.put(url, { // Use PUT request for updating
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
      owner
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
    owner
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
      owner
    });

    console.log("Soummetre prod---?????? ok==", { // Use PUT request for updating
      couts,
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
    products: [...product],
    isLoading: false,
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
      state.error = null;
    })
    .addCase(postProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;
      state.success = action.payload.message;

    })
    .addCase(postProduct.rejected, (state, action) => {
      state.isLoading = false;
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
      state.error = null;
    })
    .addCase(soumettreProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;

    })
    .addCase(soumettreProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

//export const { addProduct, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
