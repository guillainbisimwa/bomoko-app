// Import necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../constants/utils';

const avecs2 =[
    {
        "cycle": {
            "name": "Hebdomadaire",
            "number": 8
        },
        "nbrPart": {
            "max": 5,
            "min": 1
        },
        "frais_Social": {
            "somme": 0
        },
        "_id": "65020c768655d8acbb923a60",
        "name": "Sambaza(Fretins Frais)",
        "detail": "Garanties sécurité (à modifier dans le module Réassurance) Politique de livraison (à modifier dans le module RéassurancePolitique retours (à modifier dans le module Réassurance)",
        "images": [],
        "docs": [],
        "location": [
            "GOMA"
        ],
        "amount": 50,
        "currency": "USD",
        "timeline": [
            {
                "title": "Demande d'Adhesion",
                "details": "test veut adherer dans le groupe Sambaza(Fretins Frais)",
                "timestamp": "2023-09-13T19:58:43.964Z",
                "_id": "65021a7fa98a3e8c20cc97fe"
            },
            {
                "title": "Soumission",
                "details": "Votre groupe Sambaza(Fretins Frais) a été soumis à l'équipe African Fintech et est en attente de validation",
                "timestamp": "2023-09-13T19:58:43.964Z",
                "_id": "65021896a98a3e8c20cc9709"
            }
        ],
        "status": "SUBMITED",
        "owner": {
            "_id": "64f91729149778f65a18778e",
            "name": "test2",
            "email": "test2@me.com",
            "mobile": "12345678",
            "username": "test2",
            "role": "user",
            "cover_url": "",
            "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
            "status": "PENDING"
        },
        "socialSolidarity": [],
        "membres": [
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:19:31.746Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "carnet": [],
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020c768655d8acbb923a61"
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "carnet": [],
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020c768655d8acbb923a62"
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
                "user": {
                    "_id": "64c8ed6b4b2d32dee269984d",
                    "name": "Guy1",
                    "email": "guy@gmail.comm",
                    "mobile": "09785327566",
                    "username": "Guy1",
                    "role": "user",
                    "status": "PENDING"
                },
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Gardeurs des clés",
                "carnet": [],
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020c768655d8acbb923a63"
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "carnet": [],
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020c768655d8acbb923a64"
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Secrétaire",
                "carnet": [],
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020c768655d8acbb923a65"
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Trésorier",
                "carnet": [],
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020c768655d8acbb923a66"
            },
            {
                "adhesion": {
                    "status": "SUBMITTED",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "temoins": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "65021a7fa98a3e8c20cc97fd",
                "contribution": [],
                "demandeCredit": [],
                "calendar_remboursement": [],
                "carnet": []
            }
        ],
        "interest": "5",
        "frais_Adhesion": 10,
        "debut_octroi_credit": "2023-10-10T12:00:00.000Z",
        "fin_octroi_credit": "2024-10-10T12:00:00.000Z",
        "startDate": "2023-10-01T12:00:00.000Z",
        "endDate": "2024-12-01T12:00:00.000Z",
        "timestamp": "2023-09-13T19:19:31.837Z",
        "__v": 0,
        "reunion": [

{
  "status": "FINISHED",
  "dateStart": "2023-09-10T19:19:31.746Z",
  "dateEnd": "2023-09-09T20:19:31.746Z",
  "_id": "65020c768655d8acbb923a21",
  "chat": [
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
      "message": 'Ici le message test de chat',
          "timestamp": "2023-09-13T19:58:43.964Z",
          "_id": "65021a7fa98a3e8c20cc97fe"
      },
      
  ],
  
  "attendees": [
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:19:31.746Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a61"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a62"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
          "user": {
              "_id": "64c8ed6b4b2d32dee269984d",
              "name": "Guy1",
              "email": "guy@gmail.comm",
              "mobile": "09785327566",
              "username": "Guy1",
              "role": "user",
              "status": "PENDING"
          },
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Gardeurs des clés",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a63"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a64"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Secrétaire",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a65"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Trésorier",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a66"
      },
      {
          "adhesion": {
              "status": "SUBMITTED",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "temoins": [],
          "type": "MEMBRE",
          "timestamp": "2023-09-13T19:58:43.886Z",
          "_id": "65021a7fa98a3e8c20cc97fd",
          "contribution": [],
          "demandeCredit": [],
          "calendar_remboursement": [],
          "carnet": []
      }
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},


{
  "status": "UPCOMING",
  "dateStart": "2023-09-10T12:19:31.746Z",
  "dateEnd": "2023-09-10T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a66",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},



{
  "status": "UPCOMING",
  "dateStart": "2023-09-22T12:19:31.746Z",
  "dateEnd": "2023-09-22T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},
        ]
    },
    {
        "cycle": {
            "name": "Mensuel",
            "number": 12
        },
        "nbrPart": {
            "max": 5,
            "min": 1
        },
        "frais_Social": {
            "somme": 0
        },
        "_id": "65020e048655d8acbb923af1",
        "name": "Voitures d'occasion japonaises à vendre",
        "detail": "Voici les documents obligatoires pour vendre une voiture à un particulier : la carte grise, le formulaire de déclaration de cession, un certificat de situation administrative de moins de 15 jours, une preuve de contrôle technique.",
        "images": [],
        "docs": [],
        "location": [
            "GOMA"
        ],
        "amount": 50,
        "currency": "USD",
        "timeline": [],
        "status": "PENDING",
        "owner": {
            "_id": "64f91729149778f65a18778e",
            "name": "test2",
            "email": "test2@me.com",
            "mobile": "12345678",
            "username": "test2",
            "role": "user",
            "cover_url": "",
            "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
            "status": "PENDING"
        },
        "socialSolidarity": [],
        "membres": [
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:19:31.746Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020e048655d8acbb923af2",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020e048655d8acbb923af3",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
                "user": {
                    "_id": "64c8ed6b4b2d32dee269984d",
                    "name": "Guy1",
                    "email": "guy@gmail.comm",
                    "mobile": "09785327566",
                    "username": "Guy1",
                    "role": "user",
                    "status": "PENDING"
                },
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Gardeurs des clés",
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020e048655d8acbb923af4",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020e048655d8acbb923af5",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Secrétaire",
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020e048655d8acbb923af6",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Trésorier",
                "timestamp": "2023-09-13T19:19:31.746Z",
                "_id": "65020e048655d8acbb923af7",
                "carnet": []
            }
        ],
        "interest": "5",
        "frais_Adhesion": 10,
        "debut_octroi_credit": "2023-10-10T12:00:00.000Z",
        "fin_octroi_credit": "2024-10-10T12:00:00.000Z",
        "startDate": "2023-10-01T12:00:00.000Z",
        "endDate": "2024-12-01T12:00:00.000Z",
        "timestamp": "2023-09-13T19:19:31.837Z",
        "__v": 0,
        "reunion": [

{
  "status": "FINISHED",
  "dateStart": "2023-09-10T19:19:31.746Z",
  "dateEnd": "2023-09-09T20:19:31.746Z",
  "_id": "65020c768655d8acbb923a60",
  "chat": [
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
      "message": 'Ici le message test de chat',
          "timestamp": "2023-09-13T19:58:43.964Z",
          "_id": "65021a7fa98a3e8c20cc97fe"
      },
      
  ],
  
  "attendees": [
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:19:31.746Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a61"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a62"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
          "user": {
              "_id": "64c8ed6b4b2d32dee269984d",
              "name": "Guy1",
              "email": "guy@gmail.comm",
              "mobile": "09785327566",
              "username": "Guy1",
              "role": "user",
              "status": "PENDING"
          },
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Gardeurs des clés",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a63"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a64"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Secrétaire",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a65"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Trésorier",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a66"
      },
      {
          "adhesion": {
              "status": "SUBMITTED",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "temoins": [],
          "type": "MEMBRE",
          "timestamp": "2023-09-13T19:58:43.886Z",
          "_id": "65021a7fa98a3e8c20cc97fd",
          "contribution": [],
          "demandeCredit": [],
          "calendar_remboursement": [],
          "carnet": []
      }
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},


{
  "status": "UPCOMING",
  "dateStart": "2023-09-10T12:19:31.746Z",
  "dateEnd": "2023-09-10T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},



{
  "status": "UPCOMING",
  "dateStart": "2023-09-22T12:19:31.746Z",
  "dateEnd": "2023-09-22T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},
        ]
    },
    {
        "cycle": {
            "name": "Mensuel",
            "number": 12
        },
        "nbrPart": {
            "max": 5,
            "min": 1
        },
        "frais_Social": {
            "somme": 0
        },
        "_id": "650219dfa98a3e8c20cc974b",
        "name": "Éducation et État de droit",
        "detail": "Les écoles jouent un rôle majeur dans la socialisation des enfants, filles ou garçons, et dans le développement de leur appréciation du partage, de l'équité, du respect mutuel et de la coopération. Elles définissent donc les valeurs et les compétences fondamentales qui sont à la base de la compréhension de concepts tels que la justice, la démocratie et les droits de l'homme1.",
        "images": [],
        "docs": [],
        "location": [
            "GOMA"
        ],
        "amount": 50,
        "currency": "USD",
        "timeline": [],
        "status": "PENDING",
        "owner": {
            "_id": "64f91729149778f65a18778e",
            "name": "test2",
            "email": "test2@me.com",
            "mobile": "12345678",
            "username": "test2",
            "role": "user",
            "cover_url": "",
            "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
            "status": "PENDING"
        },
        "socialSolidarity": [],
        "membres": [
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "650219dfa98a3e8c20cc974c",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "650219dfa98a3e8c20cc974d",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
                "user": {
                    "_id": "64c8ed6b4b2d32dee269984d",
                    "name": "Guy1",
                    "email": "guy@gmail.comm",
                    "mobile": "09785327566",
                    "username": "Guy1",
                    "role": "user",
                    "status": "PENDING"
                },
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Gardeurs des clés",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "650219dfa98a3e8c20cc974e",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "ACCEPTED",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "650219dfa98a3e8c20cc974f",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "PENDING",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Secrétaire",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "650219dfa98a3e8c20cc9750",
                "carnet": []
            },
            {
                "adhesion": {
                    "status": "REJECTED",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
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
                "contribution": [],
                "demandeCredit": [],
                "temoins": [],
                "calendar_remboursement": [],
                "type": "Trésorier",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "650219dfa98a3e8c20cc9751",
                "carnet": []
            }
        ],
        "interest": "5",
        "frais_Adhesion": 10,
        "debut_octroi_credit": "2023-10-10T12:00:00.000Z",
        "fin_octroi_credit": "2024-10-10T12:00:00.000Z",
        "startDate": "2023-10-01T12:00:00.000Z",
        "endDate": "2024-12-01T12:00:00.000Z",
        "timestamp": "2023-09-13T19:58:43.964Z",
        "__v": 0,
        "reunion": [

{
  "status": "FINISHED",
  "dateStart": "2023-09-10T19:19:31.746Z",
  "dateEnd": "2023-09-09T20:19:31.746Z",
  "_id": "65020c768655d8acbb923a60",
  "chat": [
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
      "message": 'Ici le message test de chat',
          "timestamp": "2023-09-13T19:58:43.964Z",
          "_id": "65021a7fa98a3e8c20cc97fe"
      },
      
  ],
  
  "attendees": [
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:19:31.746Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a61"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a62"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
          "user": {
              "_id": "64c8ed6b4b2d32dee269984d",
              "name": "Guy1",
              "email": "guy@gmail.comm",
              "mobile": "09785327566",
              "username": "Guy1",
              "role": "user",
              "status": "PENDING"
          },
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Gardeurs des clés",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a63"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a64"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Secrétaire",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a65"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Trésorier",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a66"
      },
      {
          "adhesion": {
              "status": "SUBMITTED",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "temoins": [],
          "type": "MEMBRE",
          "timestamp": "2023-09-13T19:58:43.886Z",
          "_id": "65021a7fa98a3e8c20cc97fd",
          "contribution": [],
          "demandeCredit": [],
          "calendar_remboursement": [],
          "carnet": []
      }
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},


{
  "status": "UPCOMING",
  "dateStart": "2023-09-10T12:19:31.746Z",
  "dateEnd": "2023-09-10T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},



{
  "status": "UPCOMING",
  "dateStart": "2023-09-22T12:19:31.746Z",
  "dateEnd": "2023-09-22T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},
        ]
    },
    {
        "cycle": {
            "name": "Mensuel",
            "number": 11
        },
        "nbrPart": {
            "max": 5,
            "min": 1
        },
        "frais_Social": {
            "name": "Hebdomadaire",
            "somme": 500
        },
        "_id": "65021c56a98a3e8c20cc9831",
        "name": "Test",
        "detail": "descr",
        "images": [],
        "docs": [],
        "location": [],
        "amount": 10,
        "currency": "USD",
        "timeline": [
            {
                "title": "Demande d'Adhesion",
                "details": "test2 veut adherer dans le groupe Test",
                "timestamp": "2023-09-13T19:58:43.964Z",
                "_id": "65021cbea98a3e8c20cc9883"
            },
            {
                "title": "Creation du GroupeTest",
                "details": "Le Groupe Test- cree par test",
                "timestamp": "2023-09-13T19:58:43.964Z",
                "_id": "65021c56a98a3e8c20cc9832"
            }
        ],
        "status": "PENDING",
        "owner": {
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
        "interest": "5",
        "frais_Adhesion": 0,
        "debut_octroi_credit": "2023-12-30T23:59:59.000Z",
        "fin_octroi_credit": "2024-05-30T23:59:59.000Z",
        "startDate": "2023-09-30T23:59:59.000Z",
        "endDate": "2024-06-30T23:59:59.000Z",
        "timestamp": "2023-09-13T19:58:43.964Z",
        "socialSolidarity": [],
        "membres": [
            {
                "adhesion": {
                    "status": "SUBMITTED",
                    "amount_demande": 0,
                    "timestamp": "2023-09-13T19:58:43.886Z"
                },
                "user": {
                    "_id": "64f91729149778f65a18778e",
                    "name": "test2",
                    "email": "test2@me.com",
                    "mobile": "12345678",
                    "username": "test2",
                    "role": "user",
                    "cover_url": "",
                    "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
                    "status": "PENDING"
                },
                "temoins": [],
                "type": "MEMBRE",
                "timestamp": "2023-09-13T19:58:43.886Z",
                "_id": "65021cbea98a3e8c20cc9882",
                "contribution": [],
                "demandeCredit": [],
                "calendar_remboursement": [],
                "carnet": []
            }
        ],
        "__v": 0,
        "reunion": [

{
  "status": "FINISHED",
  "dateStart": "2023-09-10T19:19:31.746Z",
  "dateEnd": "2023-09-09T20:19:31.746Z",
  "_id": "65020c768655d8acbb923a60",
  "chat": [
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
      "message": 'Ici le message test de chat',
          "timestamp": "2023-09-13T19:58:43.964Z",
          "_id": "65021a7fa98a3e8c20cc97fe"
      },
      
  ],
  
  "attendees": [
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:19:31.746Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a61"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a62"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
          "user": {
              "_id": "64c8ed6b4b2d32dee269984d",
              "name": "Guy1",
              "email": "guy@gmail.comm",
              "mobile": "09785327566",
              "username": "Guy1",
              "role": "user",
              "status": "PENDING"
          },
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Gardeurs des clés",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a63"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "MEMBRE",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a64"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Secrétaire",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a65"
      },
      {
          "adhesion": {
              "status": "PENDING",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "contribution": [],
          "demandeCredit": [],
          "temoins": [],
          "calendar_remboursement": [],
          "type": "Trésorier",
          "carnet": [],
          "timestamp": "2023-09-13T19:19:31.746Z",
          "_id": "65020c768655d8acbb923a66"
      },
      {
          "adhesion": {
              "status": "SUBMITTED",
              "amount_demande": 0,
              "timestamp": "2023-09-13T19:58:43.886Z"
          },
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
          "temoins": [],
          "type": "MEMBRE",
          "timestamp": "2023-09-13T19:58:43.886Z",
          "_id": "65021a7fa98a3e8c20cc97fd",
          "contribution": [],
          "demandeCredit": [],
          "calendar_remboursement": [],
          "carnet": []
      }
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},


{
  "status": "UPCOMING",
  "dateStart": "2023-09-10T12:19:31.746Z",
  "dateEnd": "2023-09-10T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},



{
  "status": "UPCOMING",
  "dateStart": "2023-09-22T12:19:31.746Z",
  "dateEnd": "2023-09-22T19:19:31.746Z",
  "_id": "65020c768655d8acbb923a61",
  
  "chat": [
      
  ],
  "attendees": [
  ],
  "timestamp": "2023-09-13T19:19:31.837Z",
  "__v": 0
},
        ]
    }
]

// Define an initial state for AVEC objects
const initialState = {
  avecs: [], // Array to store AVEC objects {avecs: [...avecs]}
  status: 'idle', // Status for async operations
  error: null, // Error object for failed requests
};

// Create an async thunk to fetch AVEC objects
export const fetchAvecs = createAsyncThunk('avecs/fetchAll', async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/avec/`);
    // console.log("=========??????", response.data);
    return response.data;
  } catch (error) {
    console.log("Error =========??????", `${BASE_URL}api/avec/`);

    throw error;
  }
});

// Create an async thunk to create a new AVEC object
export const createAvec = createAsyncThunk('avec/create', async (avecData) => {
  try {
    const response = await axios.post(`${BASE_URL}api/avec`, avecData);
    return response.data;
  } catch (error) {
    console.log("Error =========??????", `${BASE_URL}api/avec/`);

    throw error;
  }
});

// Create an async thunk to update an existing AVEC object
export const updateAvec = createAsyncThunk(
    "avec/update",
    async ({
        id,
        amount,
        currency,
        cycle,
        debut_octroi_credit,
        detail,
        docs,
        endDate,
        fin_octroi_credit,
        frais_Adhesion,
        frais_Social,
        images,
        interest,
        location,
        membres,
        name,
        nbrPart,
        owner,
        socialSolidarity,
        startDate,
        status,
        timeline,
        timestamp,
    }) => {
      const url = `${BASE_URL}api/avec/${id}`; // Concatenate ID to the base URL
      
      const response = await axios.put(url, { // Use PUT request for updating
        amount,
        currency,
        cycle,
        debut_octroi_credit,
        detail,
        docs,
        endDate,
        fin_octroi_credit,
        frais_Adhesion,
        frais_Social,
        images,
        interest,
        location,
        membres,
        name,
        nbrPart,
        owner,
        socialSolidarity,
        startDate,
        status,
        timeline,
        timestamp,
      });
  
      console.log("Edit AVEC---?????? ok==", response.data);
      return response.data;
    }
  );
  

// Create an async thunk to delete an AVEC object
export const deleteAvec = createAsyncThunk(
    "avecs/delete",
    async ({
      id
    }) => {
      const url = `${BASE_URL}api/avec/${id}`; // Concatenate ID to the base URL
      const response = await axios.delete(url);
      console.log("Delete avec---?????? ok==", response.data);
      return response.data;
    }
  );

  
// Create a slice for AVEC objects
const avecsSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fetchAvecs action
    builder
      .addCase(fetchAvecs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvecs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avecs = action.payload;
      })
      .addCase(fetchAvecs.rejected, (state, action) => {
        console.log(' action.error.message',  action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle the createAvec action
    builder
      .addCase(createAvec.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAvec.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avecs.push(action.payload);
      })
      .addCase(createAvec.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle the updateAvec action
    builder
      .addCase(updateAvec.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAvec.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the corresponding AVEC object
        // const updatedAvecIndex = state.avecs.findIndex((avec) => avec._id === action.payload._id);
        // if (updatedAvecIndex !== -1) {
        //   state.avecs[updatedAvecIndex] = action.payload;
        // }
      })
      .addCase(updateAvec.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle the deleteAvec action
    builder
      .addCase(deleteAvec.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAvec.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted AVEC object
        //state.avecs = state.avecs.filter((avec) => avec._id !== action.payload);
      })
      .addCase(deleteAvec.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


// Export reducer
export default avecsSlice.reducer;
