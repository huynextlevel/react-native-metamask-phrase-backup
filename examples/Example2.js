import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { PhraseBackup } from 'react-native-metamask-phrase-backup';


const Example2 = () => {
  const data = ['relationship', 'thanksgiving', 'professional', 'organization', 'sporadically', 'intimidating', 'abolitionist', 'onomatopoeia', 'appreciation', 'annunciation', 'malnutrition', 'architecture'];
  const [displayArr, setDisplayArr] = useState(Array.from({ length: 12 }, (_, i) => i + 1));
  const [value, setValue] = useState(null);
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
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 30 }}>
      {displayArr.map((item, index) => (
        <View key={index} style={[styles.displayItemContainer]}>
          <Text style={{ marginRight: 3 }}>{index + 1}.</Text>
          <TouchableOpacity
            style={typeof item === 'string' ? styles.displaySelectedButton : styles.displayButton}
            onPress={() => typeof item === 'string' && setValue(item)}
          >
            <Text style={styles.buttonText}>{typeof item === 'string' && item}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
		<PhraseBackup isHaveDisplayValue={false} data={data} seeds={12} onChange={handleSelect} value={value}/>
    <TouchableOpacity style={{ width: 320, height: 40, borderWidth: 1, borderColor: '#000', borderRadius: 18, marginTop: 20, alignItems: 'center', justifyContent: 'center' }} onPress={result}>
      <Text style={{ fontWeight: '500' }}>Complete Backup</Text>
    </TouchableOpacity>
	</View>;
};

export default Example2;

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
  displayItemContainer: {
    margin: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayButton: {
    flexDirection: 'column',
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 13,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  displaySelectedButton: {
    flexDirection: 'column',
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#7057FF',
    borderRadius: 13,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
});
