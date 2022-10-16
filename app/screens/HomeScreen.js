import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';


import cache from '../Utility/cache';
import CardImage from '../components/CardImage';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';

function HomeScreen(props) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = image => {
    const newArr = data.filter(item => item.id !== image.id);
    Alert.alert('Warning', 'Are you sure you want to delete', [
      {
        text: 'Yes',
        onPress: () => setData(newArr),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const fetchData = async () => {
    const api =
      `https://api.unsplash.com/photos/?per_page=20&client_id={YOUR_CLIENT_ID}`;
    try {
      const response = await axios.get(api);
      if (response.status === 200) {
        cache.storeData('images', response.data);
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        const asyncData = await cache.getData('images');
        if (asyncData) {
          setData(asyncData);
        } else {
          setError(true);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();

  }, []);

  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <View>
        <FlatList
          refreshing={refresh}
          onRefresh={fetchData}
          horizontal={false}
          numColumns={3}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CardImage
              source={item.urls.small}
              onPress={() => navigation.navigate('Photo', {item: item})}
              onLongPress={() => handleDelete(item)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

export default HomeScreen;
