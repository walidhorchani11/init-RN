import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImgPicker from './components/ImgPicker';

export default function App() {
  const [addProductForm, setAddProductForm] = useState(false);
  const addProductShow = () => {
    console.log('add ref cliqued');
    setAddProductForm(true);
  };
  return (
    <View style={styles.container}>
      {!addProductForm ? (
        <ImgPicker addProduct={addProductShow} />
      ) : (
        <Text>form page</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
