import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCat } from '../redux/catReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, icons } from '../constants';

const income = 'income';
const expense = 'expense';

const cat = [
  {
    id: 1,
    name: 'Vente',
    icon: icons.shopping,
    cat: income,
    color: COLORS.purple,
    data: [],
  },
  {
    id: 2,
    name: 'Remboursement',
    icon: icons.refund,
    cat: income,
    color: COLORS.blue,
    data: [],
  },
  {
    id: 3,
    name: 'Intérêt',
    icon: icons.interest,
    cat: income,
    color: COLORS.darkgreen,
    data: [],
  },
  {
    id: 4,
    name: 'Subvention',
    icon: icons.grant,
    cat: income,
    color: COLORS.red,
    data: [],
  },
  {
    id: 5,
    name: 'Investissement',
    icon: icons.investment,
    cat: income,
    color: COLORS.peach,
    data: [],
  },

  {
    id: 6,
    name: 'Achat',
    icon: icons.shopping,
    cat: expense,
    color: COLORS.lightBlue,
    data: [],
  },
  {
    id: 7,
    name: 'Salaire',
    icon: icons.cash,
    cat: expense,
    color: COLORS.peach,
    data: [],
  },
  {
    id: 8,
    name: "Dépenses d'exploitation",
    icon: icons.cashbook,
    cat: expense,
    color: COLORS.darkgreen,
    data: [],
  },
  {
    id: 9,
    name: "Retraits d'argent",
    icon: icons.sell,
    cat: expense,
    color: COLORS.red,
    data: [],
  },
  {
    id: 10,
    name: 'Paiements de dettes',
    icon: icons.income,
    cat: expense,
    color: COLORS.yellow,
    data: [],
  },
  {
    id: 11,
    name: 'Autres entrées',
    icon: icons.more,
    cat: income,
    color: COLORS.gray,
    data: [],
  },

  {
    id: 12,
    name: 'Autres Sorties',
    icon: icons.more,
    cat: expense,
    color: COLORS.purple,
    data: [],
  },
];

const useFetchCategories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [categorie, setCategorie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('categories');
        const categories = storedCategories ? JSON.parse(storedCategories) : [...cat];

        setCategorie(categories);
        dispatch(addCat(categories));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return { loading, error, categorie };
};

export default useFetchCategories;
