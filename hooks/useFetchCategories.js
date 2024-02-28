import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCat } from '../redux/catReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, icons } from '../constants';

// Constants for category types
const INCOME = 'income';
const EXPENSE = 'expense';

// Initial categories data
const initialCategories = [
  {
    id: 1,
    name: 'Vente',
    icon: icons.shopping,
    cat: INCOME,
    color: COLORS.purple,
    data: [],
  },
  // Add other categories here
];

/**
 * Custom hook to fetch categories from AsyncStorage and dispatch them to Redux store
 * @returns {Object} Object containing loading state, error message, and fetched categories
 */
const useFetchCategories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('categories');
        const parsedCategories = storedCategories ? JSON.parse(storedCategories) : initialCategories;

        setCategories(parsedCategories);
        dispatch(addCat(parsedCategories));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch categories. Please try again.'); // Improve error message
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return { loading, error, categories };
};

export default useFetchCategories;
