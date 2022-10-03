import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

function Home(props) {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s',
      );
      alert(JSON.stringify(response.data));
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={fetchData}>
        <Text>Get Data Using Async Await GET</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
