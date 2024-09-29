import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const FaqPage = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Winning Text</Text>

    <Image
      source={{ uri: 'https://example.com/your-image.jpg' }} // replace with your image source
      style={styles.image}
      resizeMode="cover"
    />

    <Text style={styles.loremText}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    image: {
      width: '100%',
      height: 200, // adjust the height as needed
      borderRadius: 8,
      marginBottom: 16,
    },
    loremText: {
      fontSize: 16,
      color: 'gray',
    },
  });
export default FaqPage

