// Import necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../constants/utils';

const avecs2 = [
  {
      "cycle": {
          "name": "Mensuel",
          "number": 12
      },
      "nbrPart": {
          "max": 5,
          "min": 1
      },
      "_id": "64f3b9afccfd3ede2b36bf5c",
      "name": "Revendeur des vehicule d'occasion",
      "detail": "Le marché des voitures d’occasion représente la plus grosse partie du marché automobile en France. La preuve, plus de 5 500 000 véhicules d’occasion ont été vendus en 2019. Ce chiffre ne cesse de croître, attestant ainsi que les véhicules d’occasion sont deux, voire trois fois plus vendus que les voitures neuves. De nombreuses raisons expliquent cet engouement, pour ne citer que le fait que l’achat de voiture d’occasion revient moins cher. Mais des questions se posent : d’où viennent vraiment ces véhicules ? Comment les acquiert-on ? Sont-ils de qualité ?",
      "images": [],
      "docs": [],
      "location": [
          "GOMA"
      ],
      "amount": 5000,
      "currency": "CDF",
      "timeline": [],
      "status": "ACCEPTED",
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
      "socialSolidarity": [],
      "membres": [
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3b9afccfd3ede2b36bf5e"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3b9afccfd3ede2b36bf5d",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3b9afccfd3ede2b36bf60"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3b9afccfd3ede2b36bf5f",
              "carnet": []
          },
          {
              "user": {
                  "_id": "64c8ed6b4b2d32dee269984d",
                  "name": "Guy1",
                  "email": "guy@gmail.comm",
                  "mobile": "09785327566",
                  "username": "Guy1",
                  "role": "user",
                  "status": "PENDING"
              },
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3b9afccfd3ede2b36bf62"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3b9afccfd3ede2b36bf61",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3b9afccfd3ede2b36bf64"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3b9afccfd3ede2b36bf63",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3b9afccfd3ede2b36bf66"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3b9afccfd3ede2b36bf65",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3b9afccfd3ede2b36bf68"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3b9afccfd3ede2b36bf67",
              "carnet": []
          }
      ],
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T12:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T12:00:00.000Z",
      "startDate": "2023-05-01T12:00:00.000Z",
      "endDate": "2023-12-01T12:00:00.000Z",
      "timestamp": "2023-09-02T22:30:06.694Z",
      "__v": 0
  },
  {
      "cycle": {
          "name": "Hebdomadaire",
          "number": 8
      },
      "nbrPart": {
          "max": 5,
          "min": 1
      },
      "_id": "64f3bac5ccfd3ede2b36bf79",
      "name": "Farine de maïs, une farine sans gluten",
      "detail": "La farine de maïs est l’une des farines sans gluten les plus utilisées dans les recettes en pâtisserie notamment. Elle ne doit pas être confondue avec la fécule de maïs qui n’a pas la même composition ni la même utilisation.",
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
      "socialSolidarity": [],
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3bac5ccfd3ede2b36bf7b"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3bac5ccfd3ede2b36bf7a",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3bac5ccfd3ede2b36bf7d"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3bac5ccfd3ede2b36bf7c",
              "carnet": []
          },
          {
              "user": {
                  "_id": "64c8ed6b4b2d32dee269984d",
                  "name": "Guy1",
                  "email": "guy@gmail.comm",
                  "mobile": "09785327566",
                  "username": "Guy1",
                  "role": "user",
                  "status": "PENDING"
              },
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3bac5ccfd3ede2b36bf7f"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3bac5ccfd3ede2b36bf7e",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3bac5ccfd3ede2b36bf81"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3bac5ccfd3ede2b36bf80",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3bac5ccfd3ede2b36bf83"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3bac5ccfd3ede2b36bf82",
              "carnet": []
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
              "adhesion": [
                  {
                      "status": "PENDING",
                      "amount_demande": 0,
                      "timestamp": "2023-09-02T22:30:06.692Z",
                      "_id": "64f3bac5ccfd3ede2b36bf85"
                  }
              ],
              "contribution": [],
              "demandeCredit": [],
              "temoins": [],
              "calendar_remboursement": [],
              "type": "MEMBRE",
              "timestamp": "2023-09-02T22:30:06.692Z",
              "_id": "64f3bac5ccfd3ede2b36bf84",
              "carnet": []
          }
      ],
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-10-10T12:00:00.000Z",
      "fin_octroi_credit": "2024-10-10T12:00:00.000Z",
      "startDate": "2023-10-01T12:00:00.000Z",
      "endDate": "2024-12-01T12:00:00.000Z",
      "timestamp": "2023-09-02T22:30:06.694Z",
      "__v": 0
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
      "_id": "64f470cfe9cec9a3fcc93fd0",
      "name": "Your AVEC Name",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T11:21:34.890Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47941a8d6ad9abea1d766",
      "name": "Test 3",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47b4da8d6ad9abea1d87f",
      "name": "Burn",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47c31a8d6ad9abea1d8ff",
      "name": "Your AVEC Name",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47cd7a8d6ad9abea1d901",
      "name": "Your AVEC Name3",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47dafa8d6ad9abea1dc3f",
      "name": "Your AVEC Name4",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47e8ea8d6ad9abea1dc77",
      "name": "Your AVEC Name5",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f47f76a8d6ad9abea1dcaf",
      "name": "Your AVEC Nam6",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f48064a8d6ad9abea1dce7",
      "name": "Your AVEC Name8",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-03T12:08:25.505Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
      "_id": "64f9374c2af643e42a14b9d8",
      "name": "Your AVEC Name",
      "detail": "Details about your AVEC",
      "images": [],
      "docs": [],
      "location": [],
      "amount": 1000,
      "currency": "USD",
      "status": "PENDING",
      "owner": {
          "_id": "64c8e9e64b2d32dee269983a",
          "name": "Justin MUHIRE",
          "email": "guy@gmail.com",
          "mobile": "0978532756",
          "username": "Justin MUHIRE",
          "role": "user",
          "status": "PENDING",
          "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
      },
      "interest": "5",
      "frais_Adhesion": 10,
      "debut_octroi_credit": "2023-05-10T00:00:00.000Z",
      "fin_octroi_credit": "2023-08-10T00:00:00.000Z",
      "startDate": "2023-05-01T00:00:00.000Z",
      "endDate": "2023-12-01T00:00:00.000Z",
      "timestamp": "2023-09-07T02:32:47.306Z",
      "timeline": [],
      "socialSolidarity": [],
      "membres": [],
      "__v": 0
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
