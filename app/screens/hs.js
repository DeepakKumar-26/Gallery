import React, {useState} from 'react';
import {Alert, FlatList, Text, StyleSheet, View} from 'react-native';
import CardImage from '../components/CardImage';
import Screen from '../components/Screen';

import data from '../api/response.json';

function HomeScreen({navigation}) {
  // console.log(data.photos.photo);

  const [imageArray, setImageArray] = useState([...data.photos.photo]);

  const handleDelete = image => {
    const newArr = imageArray.filter(item => item.id !== image.id);
    Alert.alert('Warning', 'Are you sure you want to delete', [
      {
        text: 'Yes',
        onPress: () => setImageArray(newArr),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <Screen>
      <View style={styles.containerImages}>
        <FlatList
          horizontal={false}
          numColumns={3}
          // data={imageData}
          data={imageArray}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CardImage
              source={item.url_s}
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
const styles = StyleSheet.create({
  containerImages: {
    flex: 1,
  },
});
