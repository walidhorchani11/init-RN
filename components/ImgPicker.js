import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// lors du lancement du camera on va avoir un prb au niveau ios , pcq prmission work differently on android & ios , en faite in android expo does all these permisssions set up and requesting for us , for ios the permission systeme works a bit differently , u have to ask for permission at runtime, u need to ask for user for a permission to access the camera, aller voir documentation expo api permissions
// 1 -  npm i expo-permissions
// 2 -
const ImgPicker = (props) => {
  const [image, setImage] = useState(null);
  // result of verifiyPermissions will be stored automatically by ios
  const verifiyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    // decline permission
    console.log('result', result);
    if (result.status === 'denied') {
      Alert.alert(
        'Insufficient permisssions! you need to grant camera permission to use this app'
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    console.log('appel camera');
    const hasPermission = await verifiyPermissions();
    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }
    // 2 -need to ask for permissoin before lunch camera , import permission
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.2,
    });

    if (!result.cancelled) {
      console.log('ia ama heeeeere');
      setImage(result.uri);
    }
    console.log('result:::::', result);
    console.log('uri image:::::', image);
  };

  return (
    <View style={styles.imagePreview}>
      <View style={styles.imagePicker}>
        {/* <Text>No Image Picked Yet !</Text>
        {image && <Image source={{ uri: image }} style={styles.image} />} */}
        {!image ? (
          <Text>No Image Picked Yet walidos</Text>
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </View>
      {!image ? (
        <Button title="Take Pik" onPress={takeImageHandler} />
      ) : (
        <View>
          {/* <Button title="- retirer une ref" /> */}
          <Button title="+ ajouter" onPress={props.addProduct} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  imagePicker: { alignItems: 'center', width: '100%', height: '100%' },
  image: { width: '100%', height: '100%' },
});

export default ImgPicker;
