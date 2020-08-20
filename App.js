import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Button, ToastAndroid,Alert,Text, ScrollView} from 'react-native';
import Header from './src/components/Header';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';

export default function App() {

  const [imageList, setImageList] = useState([])

  const getPermission = async ()=>{
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      ToastAndroid.show('Sorry, we need camera roll permissions to make this work!',ToastAndroid.SHORT);
    }
    console.log(status)
  }

  useEffect(()=>{
    getPermission()
  },[])

  selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        addImage(result.uri);
      }
      // console.log(result);     
    } 
    catch (e) {
      console.log(e);
    }
  };

  const addImage = async (imageUrl)=>{
    const response = await fetch("https://taskapp-9ec1c.firebaseio.com/imageList.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl
      })
    });
    const resData = await response.json();
    if(resData){
      Alert.alert('Alert','Image link uploaded successfully',[
        {text:'Ok',style:'destructive'
    }
    ])
    }
    fetchImage()
    // console.log(resData)
  }

  const fetchImage =  async ()=>{
    try {
      const response = await fetch(
        `https://taskapp-9ec1c.firebaseio.com/imageList.json`
      );

      const resData = await response.json();
      // console.log(resData)
      const fetchedImages = [];

      for (const key in resData) {
        fetchedImages.push({
            key,
            imageUrl:resData[key].imageUrl,
        });
      }
      // console.log(fetchedImages)
      setImageList(fetchedImages)
  }catch(e){
    console.log(e)
  }
}

  return (
    <View style={styles.container}>
      <Header title='New File Upload Form' />
      <View style={styles.button}>
        <Button title='Upload Image' color='#f7287b' onPress={selectImage} />
      </View>
      <Text style={styles.headingText}>Uploaded Image Links</Text>
      <ScrollView>
        <View style={styles.files}>           
          { 
          imageList.length === 0 ?
            <Text style={{...styles.filesText,textAlign:'center'}}>
              Currently no images links
            </Text>
            : imageList.map((item)=><Text key={item.key} style={styles.filesText} numberOfLines={4} >{item.imageUrl}</Text>)
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    width:'100%',
    alignItems:'center',
    marginTop:15
  },
  files:{
    width:'100%',
    alignItems:'center'
  },
  filesText:{
    width:'80%',
    margin:5,
    borderWidth:2,
    borderColor:'#c717fc',
    padding:5,
    borderRadius:5,
    elevation:2
  },
  headingText:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:20
  }
});
