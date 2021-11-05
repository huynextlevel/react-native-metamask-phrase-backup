import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { PhraseBackup } from 'react-native-metamask-phrase-backup';

const Example = () => {
  const data = ['relationship', 'thanksgiving', 'professional', 'organization', 'sporadically', 'intimidating', 'abolitionist', 'onomatopoeia', 'appreciation', 'annunciation', 'malnutrition', 'architecture'];
  const [displayArr, setDisplayArr] = useState([])
  const handleSelect = (value) => {
    setDisplayArr(value);
  }

  const result = () => {
    Alert.alert(
      'Complete Phrase Backup',
      displayArr.toString().replaceAll(',', ', '),
      [
        { text: 'Done' },
      ],
    )
  }

	return <View style={styles.container}>
    <Text style={[styles.description, { fontSize: 20 }]}>React Native Metamask Phrase Word Example</Text>
    <Text style={styles.description}>Select each word in the order it was presented to you.</Text>
		<PhraseBackup data={data} seeds={12} onChange={handleSelect}/>
    <TouchableOpacity style={{ width: 320, height: 40, borderWidth: 1, borderColor: '#000', borderRadius: 18, marginTop: 20, alignItems: 'center', justifyContent: 'center' }} onPress={result}>
      <Text style={{ fontWeight: '500' }}>Complete Backup</Text>
    </TouchableOpacity>
	</View>;
};

export default Example;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
  description: {
    width: 300,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
    fontSize: 15,
  },
  value: {
    marginBottom: 10,
    color: '#FF4A8D',
    fontWeight: '500',
  },
});
