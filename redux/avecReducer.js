// Import necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../constants/utils';

const avecs2 =[
    
        {
            "cycle": {
                "name": "Mensuel",
                "number": 9
            },
            "nbrPart": {
                "max": 5,
                "min": 1
            },
            "frais_Social": {
                "name": "Hebdomadaire",
                "somme": 0
            },
            "_id": "65020c768655d8acbb923a60",
            "name": "Sambaza(Fretins Frais)V5",
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
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V5 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T14:31:33.022Z",
                    "_id": "650b08c28d04aacb53af7f17"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T14:31:33.022Z",
                    "_id": "650b05a78d04aacb53af773a"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650afd40a408ae6ad8b0c3e1"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650afcf0a408ae6ad8b0c12c"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650afbcda408ae6ad8b0bf58"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650afb07a408ae6ad8b0be9c"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650af857a408ae6ad8b0be4b"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais)V2 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650af72aa408ae6ad8b0bcfd"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais) a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650af5c9a408ae6ad8b0bae5"
                },
                {
                    "title": "Soumission",
                    "details": "Votre groupe Sambaza(Fretins Frais) a été soumis à l'équipe African Fintech et est en attente de validation",
                    "timestamp": "2023-09-20T13:24:04.602Z",
                    "_id": "650af5b7a408ae6ad8b0ba6d"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Sambaza(Fretins Frais) a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-16T16:00:58.495Z",
                    "_id": "6505d2adf90bb7f97f8e9ccb"
                },
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
            "status": "ACCEPTED",
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
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "MEMBRE",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020c768655d8acbb923a61"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "MEMBRE",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020c768655d8acbb923a62"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "Gardeurs des clés",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020c768655d8acbb923a63"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "MEMBRE",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020c768655d8acbb923a64"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "Secrétaire",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020c768655d8acbb923a65"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "Trésorier",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020c768655d8acbb923a66"
                },
                {
                    "adhesion": {
                        "status": "SUBMITTED",
                        "amountDemande": 0,
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
                    "_id": "65021a7fa98a3e8c20cc97fd"
                }
            ],
            "interest": "5",
            "frais_Adhesion": 10,
            "debut_octroi_credit": "2024-01-28T23:59:59.000Z",
            "fin_octroi_credit": "2024-05-28T23:59:59.000Z",
            "startDate": "2023-10-28T23:59:59.000Z",
            "endDate": "2024-06-28T23:59:59.000Z",
            "timestamp": "2023-09-13T19:19:31.837Z",
            "__v": 0,
            "calendarRemboursement": [],
            "carnet": [],
            "credit": [],
            "parts": [],
            "reunion": [
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-09-27T00:00:00.000Z",
                    "dateEnd": "2023-09-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f24",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 2,
                    "dateStart": "2023-10-04T00:00:00.000Z",
                    "dateEnd": "2023-10-04T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f25",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 3,
                    "dateStart": "2023-10-11T00:00:00.000Z",
                    "dateEnd": "2023-10-11T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f26",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 4,
                    "dateStart": "2023-10-18T00:00:00.000Z",
                    "dateEnd": "2023-10-18T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f27",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 5,
                    "dateStart": "2023-10-25T00:00:00.000Z",
                    "dateEnd": "2023-10-25T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f28",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 6,
                    "dateStart": "2023-11-01T00:00:00.000Z",
                    "dateEnd": "2023-11-01T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f29",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 7,
                    "dateStart": "2023-11-08T00:00:00.000Z",
                    "dateEnd": "2023-11-08T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f2a",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 8,
                    "dateStart": "2023-11-15T00:00:00.000Z",
                    "dateEnd": "2023-11-15T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f2b",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 9,
                    "dateStart": "2023-11-22T00:00:00.000Z",
                    "dateEnd": "2023-11-22T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f2c",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 10,
                    "dateStart": "2023-11-29T00:00:00.000Z",
                    "dateEnd": "2023-11-29T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f2d",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 11,
                    "dateStart": "2023-12-06T00:00:00.000Z",
                    "dateEnd": "2023-12-06T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f2e",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 12,
                    "dateStart": "2023-12-13T00:00:00.000Z",
                    "dateEnd": "2023-12-13T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f2f",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 13,
                    "dateStart": "2023-12-20T00:00:00.000Z",
                    "dateEnd": "2023-12-20T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f30",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 14,
                    "dateStart": "2023-12-27T00:00:00.000Z",
                    "dateEnd": "2023-12-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f31",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 15,
                    "dateStart": "2024-01-03T00:00:00.000Z",
                    "dateEnd": "2024-01-03T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f32",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 16,
                    "dateStart": "2024-01-10T00:00:00.000Z",
                    "dateEnd": "2024-01-10T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f33",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 17,
                    "dateStart": "2024-01-17T00:00:00.000Z",
                    "dateEnd": "2024-01-17T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f34",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 18,
                    "dateStart": "2024-01-24T00:00:00.000Z",
                    "dateEnd": "2024-01-24T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f35",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 19,
                    "dateStart": "2024-01-31T00:00:00.000Z",
                    "dateEnd": "2024-01-31T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f36",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 20,
                    "dateStart": "2024-02-07T00:00:00.000Z",
                    "dateEnd": "2024-02-07T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f37",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 21,
                    "dateStart": "2024-02-14T00:00:00.000Z",
                    "dateEnd": "2024-02-14T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f38",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 22,
                    "dateStart": "2024-02-21T00:00:00.000Z",
                    "dateEnd": "2024-02-21T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f39",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 23,
                    "dateStart": "2024-02-28T00:00:00.000Z",
                    "dateEnd": "2024-02-28T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f3a",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 24,
                    "dateStart": "2024-03-06T00:00:00.000Z",
                    "dateEnd": "2024-03-06T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f3b",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 25,
                    "dateStart": "2024-03-13T00:00:00.000Z",
                    "dateEnd": "2024-03-13T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f3c",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 26,
                    "dateStart": "2024-03-20T00:00:00.000Z",
                    "dateEnd": "2024-03-20T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f3d",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 27,
                    "dateStart": "2024-03-27T00:00:00.000Z",
                    "dateEnd": "2024-03-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f3e",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 28,
                    "dateStart": "2024-04-03T00:00:00.000Z",
                    "dateEnd": "2024-04-03T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f3f",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 29,
                    "dateStart": "2024-04-10T00:00:00.000Z",
                    "dateEnd": "2024-04-10T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f40",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 30,
                    "dateStart": "2024-04-17T00:00:00.000Z",
                    "dateEnd": "2024-04-17T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f41",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 31,
                    "dateStart": "2024-04-24T00:00:00.000Z",
                    "dateEnd": "2024-04-24T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f42",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 32,
                    "dateStart": "2024-05-01T00:00:00.000Z",
                    "dateEnd": "2024-05-01T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f43",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 33,
                    "dateStart": "2024-05-08T00:00:00.000Z",
                    "dateEnd": "2024-05-08T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f44",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 34,
                    "dateStart": "2024-05-15T00:00:00.000Z",
                    "dateEnd": "2024-05-15T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f45",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 35,
                    "dateStart": "2024-05-22T00:00:00.000Z",
                    "dateEnd": "2024-05-22T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f46",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 36,
                    "dateStart": "2024-05-29T00:00:00.000Z",
                    "dateEnd": "2024-05-29T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T14:59:12.000Z",
                    "_id": "650b08c28d04aacb53af7f47",
                    "chat": []
                }
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
            "timeline": [
                {
                    "title": "Validation",
                    "details": "Votre groupe Voitures d'occasion japonaises à vendre a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T14:31:33.022Z",
                    "_id": "650b07448d04aacb53af7ca4"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Voitures d'occasion japonaises à vendre a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T14:31:33.022Z",
                    "_id": "650b06f78d04aacb53af7c2f"
                }
            ],
            "status": "ACCEPTED",
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
                        "amountDemande": 0,
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
                    "temoins": [],
                    "type": "MEMBRE",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020e048655d8acbb923af2"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T14:31:32.930Z"
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
                    "temoins": [],
                    "type": "MEMBRE",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020e048655d8acbb923af3"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T14:31:32.930Z"
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
                    "temoins": [],
                    "type": "Gardeurs des clés",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020e048655d8acbb923af4"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T14:31:32.930Z"
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
                    "temoins": [],
                    "type": "MEMBRE",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020e048655d8acbb923af5"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T14:31:32.930Z"
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
                    "temoins": [],
                    "type": "Secrétaire",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020e048655d8acbb923af6"
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T14:31:32.930Z"
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
                    "temoins": [],
                    "type": "Trésorier",
                    "timestamp": "2023-09-13T19:19:31.746Z",
                    "_id": "65020e048655d8acbb923af7"
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
            "reunion": [],
            "parts": [],
            "calendarRemboursement": [],
            "credit": [],
            "carnet": []
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
                    "title": "Validation",
                    "details": "Votre groupe Test a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T14:31:33.022Z",
                    "_id": "650b09218d04aacb53af800c"
                },
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
            "status": "ACCEPTED",
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
                        "amountDemande": 0,
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
                    "_id": "65021cbea98a3e8c20cc9882"
                }
            ],
            "__v": 0,
            "calendarRemboursement": [],
            "carnet": [],
            "credit": [],
            "parts": [],
            "reunion": [
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-09-27T00:00:00.000Z",
                    "dateEnd": "2023-09-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af800f",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 2,
                    "dateStart": "2023-10-04T00:00:00.000Z",
                    "dateEnd": "2023-10-04T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8010",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 3,
                    "dateStart": "2023-10-11T00:00:00.000Z",
                    "dateEnd": "2023-10-11T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8011",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 4,
                    "dateStart": "2023-10-18T00:00:00.000Z",
                    "dateEnd": "2023-10-18T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8012",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 5,
                    "dateStart": "2023-10-25T00:00:00.000Z",
                    "dateEnd": "2023-10-25T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8013",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 6,
                    "dateStart": "2023-11-01T00:00:00.000Z",
                    "dateEnd": "2023-11-01T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8014",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 7,
                    "dateStart": "2023-11-08T00:00:00.000Z",
                    "dateEnd": "2023-11-08T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8015",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 8,
                    "dateStart": "2023-11-15T00:00:00.000Z",
                    "dateEnd": "2023-11-15T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8016",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 9,
                    "dateStart": "2023-11-22T00:00:00.000Z",
                    "dateEnd": "2023-11-22T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8017",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 10,
                    "dateStart": "2023-11-29T00:00:00.000Z",
                    "dateEnd": "2023-11-29T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8018",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 11,
                    "dateStart": "2023-12-06T00:00:00.000Z",
                    "dateEnd": "2023-12-06T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8019",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 12,
                    "dateStart": "2023-12-13T00:00:00.000Z",
                    "dateEnd": "2023-12-13T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af801a",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 13,
                    "dateStart": "2023-12-20T00:00:00.000Z",
                    "dateEnd": "2023-12-20T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af801b",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 14,
                    "dateStart": "2023-12-27T00:00:00.000Z",
                    "dateEnd": "2023-12-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af801c",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 15,
                    "dateStart": "2024-01-03T00:00:00.000Z",
                    "dateEnd": "2024-01-03T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af801d",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 16,
                    "dateStart": "2024-01-10T00:00:00.000Z",
                    "dateEnd": "2024-01-10T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af801e",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 17,
                    "dateStart": "2024-01-17T00:00:00.000Z",
                    "dateEnd": "2024-01-17T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af801f",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 18,
                    "dateStart": "2024-01-24T00:00:00.000Z",
                    "dateEnd": "2024-01-24T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8020",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 19,
                    "dateStart": "2024-01-31T00:00:00.000Z",
                    "dateEnd": "2024-01-31T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8021",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 20,
                    "dateStart": "2024-02-07T00:00:00.000Z",
                    "dateEnd": "2024-02-07T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8022",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 21,
                    "dateStart": "2024-02-14T00:00:00.000Z",
                    "dateEnd": "2024-02-14T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8023",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 22,
                    "dateStart": "2024-02-21T00:00:00.000Z",
                    "dateEnd": "2024-02-21T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8024",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 23,
                    "dateStart": "2024-02-28T00:00:00.000Z",
                    "dateEnd": "2024-02-28T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8025",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 24,
                    "dateStart": "2024-03-06T00:00:00.000Z",
                    "dateEnd": "2024-03-06T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8026",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 25,
                    "dateStart": "2024-03-13T00:00:00.000Z",
                    "dateEnd": "2024-03-13T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8027",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 26,
                    "dateStart": "2024-03-20T00:00:00.000Z",
                    "dateEnd": "2024-03-20T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8028",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 27,
                    "dateStart": "2024-03-27T00:00:00.000Z",
                    "dateEnd": "2024-03-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8029",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 28,
                    "dateStart": "2024-04-03T00:00:00.000Z",
                    "dateEnd": "2024-04-03T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af802a",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 29,
                    "dateStart": "2024-04-10T00:00:00.000Z",
                    "dateEnd": "2024-04-10T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af802b",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 30,
                    "dateStart": "2024-04-17T00:00:00.000Z",
                    "dateEnd": "2024-04-17T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af802c",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 31,
                    "dateStart": "2024-04-24T00:00:00.000Z",
                    "dateEnd": "2024-04-24T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af802d",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 32,
                    "dateStart": "2024-05-01T00:00:00.000Z",
                    "dateEnd": "2024-05-01T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af802e",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 33,
                    "dateStart": "2024-05-08T00:00:00.000Z",
                    "dateEnd": "2024-05-08T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af802f",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 34,
                    "dateStart": "2024-05-15T00:00:00.000Z",
                    "dateEnd": "2024-05-15T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8030",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 35,
                    "dateStart": "2024-05-22T00:00:00.000Z",
                    "dateEnd": "2024-05-22T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8031",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 36,
                    "dateStart": "2024-05-29T00:00:00.000Z",
                    "dateEnd": "2024-05-29T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8032",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 37,
                    "dateStart": "2024-06-05T00:00:00.000Z",
                    "dateEnd": "2024-06-05T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8033",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 38,
                    "dateStart": "2024-06-12T00:00:00.000Z",
                    "dateEnd": "2024-06-12T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8034",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 39,
                    "dateStart": "2024-06-19T00:00:00.000Z",
                    "dateEnd": "2024-06-19T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8035",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 40,
                    "dateStart": "2024-06-26T00:00:00.000Z",
                    "dateEnd": "2024-06-26T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8036",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 41,
                    "dateStart": "2024-07-03T00:00:00.000Z",
                    "dateEnd": "2024-07-03T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8037",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 42,
                    "dateStart": "2024-07-10T00:00:00.000Z",
                    "dateEnd": "2024-07-10T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8038",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 43,
                    "dateStart": "2024-07-17T00:00:00.000Z",
                    "dateEnd": "2024-07-17T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af8039",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 44,
                    "dateStart": "2024-07-24T00:00:00.000Z",
                    "dateEnd": "2024-07-24T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T15:00:47.000Z",
                    "_id": "650b09218d04aacb53af803a",
                    "chat": []
                }
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
            "_id": "65022619a98a3e8c20cc9ae0",
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
            "socialSolidarity": [],
            "membres": [
                {
                    "adhesion": {
                        "amountDemande": 0,
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
                    "_id": "65022619a98a3e8c20cc9ae1",
                    "carnet": []
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T15:52:57.238Z"
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
                    "_id": "65022619a98a3e8c20cc9ae2",
                    "carnet": []
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T15:52:57.238Z"
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
                    "_id": "65022619a98a3e8c20cc9ae3",
                    "carnet": []
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T15:52:57.238Z"
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
                    "_id": "65022619a98a3e8c20cc9ae4",
                    "carnet": []
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T15:52:57.238Z"
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
                    "_id": "65022619a98a3e8c20cc9ae5",
                    "carnet": []
                },
                {
                    "adhesion": {
                        "status": "PENDING",
                        "amountDemande": 0,
                        "timestamp": "2023-09-20T15:52:57.238Z"
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
                    "_id": "65022619a98a3e8c20cc9ae6",
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
            "reunion": [],
            "parts": [],
            "calendarRemboursement": [],
            "credit": [],
            "carnet": []
        },
        {
            "cycle": {
                "name": "Mensuel",
                "number": 9
            },
            "nbrPart": {
                "max": 5,
                "min": 1
            },
            "frais_Social": {
                "name": "Hebdomadaire",
                "somme": 1
            },
            "_id": "6505bbc95af3a6c0c8d3a1f9",
            "name": "Test 3",
            "detail": "desc",
            "images": [],
            "docs": [],
            "location": [],
            "amount": 40,
            "currency": "USD",
            "timeline": [
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T10:16:55.038Z",
                    "_id": "650ac9d80e378bef380106aa"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T08:50:01.526Z",
                    "_id": "650ab29092fa09a25eed020b"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T08:10:26.378Z",
                    "_id": "650aa9221a6530397d89dea6"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T07:05:26.390Z",
                    "_id": "650a9e4c6fc6628d4be8196d"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T07:05:26.390Z",
                    "_id": "650a9dac6fc6628d4be81936"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-20T07:05:26.390Z",
                    "_id": "650a9cf66fc6628d4be81909"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-16T16:00:58.495Z",
                    "_id": "6505da18f90bb7f97f8ea029"
                },
                {
                    "title": "Validation",
                    "details": "Votre groupe Test 3 a été validé à l'équipe African Fintech!",
                    "timestamp": "2023-09-16T16:00:58.495Z",
                    "_id": "6505d4d0f90bb7f97f8e9f6a"
                },
                {
                    "title": "Soumission",
                    "details": "Votre groupe Test 3 a été soumis à l'équipe African Fintech et est en attente de validation",
                    "timestamp": "2023-09-16T13:47:39.770Z",
                    "_id": "6505bc4b5af3a6c0c8d3a36c"
                },
                {
                    "title": "Creation du GroupeTest 3",
                    "details": "Le Groupe Test 3- cree par test2",
                    "timestamp": "2023-09-16T13:47:39.770Z",
                    "_id": "6505bbc95af3a6c0c8d3a1fa"
                }
            ],
            "status": "ACCEPTED",
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
            "interest": "7",
            "frais_Adhesion": 0,
            "debut_octroi_credit": "2023-12-30T23:59:59.000Z",
            "fin_octroi_credit": "2024-05-30T23:59:59.000Z",
            "startDate": "2023-09-30T23:59:59.000Z",
            "endDate": "2024-06-30T23:59:59.000Z",
            "timestamp": "2023-09-16T13:47:39.770Z",
            "socialSolidarity": [],
            "membres": [],
            "reunion": [
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-09-27T00:00:00.000Z",
                    "dateEnd": "2023-09-27T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0202",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-10-04T00:00:00.000Z",
                    "dateEnd": "2023-10-04T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0203",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-10-11T00:00:00.000Z",
                    "dateEnd": "2023-10-11T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0204",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-10-18T00:00:00.000Z",
                    "dateEnd": "2023-10-18T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0205",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-10-25T00:00:00.000Z",
                    "dateEnd": "2023-10-25T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0206",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-11-01T00:00:00.000Z",
                    "dateEnd": "2023-11-01T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0207",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-11-08T00:00:00.000Z",
                    "dateEnd": "2023-11-08T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0208",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-11-15T00:00:00.000Z",
                    "dateEnd": "2023-11-15T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed0209",
                    "chat": []
                },
                {
                    "status": "UPCOMING",
                    "num": 1,
                    "dateStart": "2023-11-22T00:00:00.000Z",
                    "dateEnd": "2023-11-22T00:00:00.000Z",
                    "attendees": [],
                    "timestamp": "2023-09-20T08:49:09.000Z",
                    "_id": "650ab29092fa09a25eed020a",
                    "chat": []
                }
            ],
            "parts": [],
            "calendarRemboursement": [],
            "credit": [],
            "carnet": [],
            "__v": 0
        }
    
]

// Define an initial state for AVEC objects
const initialState = {
  avecs: [...avecs2], // Array to store AVEC objects {avecs: [...avecs]}
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
        reunion,
        parts,
        calendarRemboursement,
        credit,
        carnet,
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
        reunion,
        parts,
        calendarRemboursement,
        credit,
        carnet,
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
