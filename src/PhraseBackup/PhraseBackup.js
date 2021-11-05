import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const PhraseBackup = ({
  data,
  seeds,
  value,
  isHaveDisplayValue,
  onChange,
  containerStyle,
  displaySelectedWrapperStyle,
  displaySelectedStyle,
  displaySelectedItemRowStyle,
  displayButtonStyle,
  displaySelectedButtonStyle,
  displayButtonTextStyle,
  selectedButtonStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  const [newData, setNewData] = useState([]);
  const [tempSelected, setTempSelected] = useState([]);
  const [seletecArr, setSeletecArr] = useState(Array.from({ length: seeds }, (_, i) => i + 1));

  useEffect(() => {
    const tempArr = [];

    const randomsieArray = (array) => {
      var currentIndex = array.length,  randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    data.forEach((item, index) => {
      tempArr.push({ id: index + 1, value: item, isSelected: false });
    });

    setNewData(randomsieArray(tempArr));
  }, []);

  useEffect(() => {
    if (!isHaveDisplayValue && value) {
      selectedItem({}, value);
    }
  }, [isHaveDisplayValue, value]);

  const selectedItem = (item, seed) => {
    const value = [];
    const selected = [...tempSelected];
    const selectedValue = !isHaveDisplayValue && seed !== undefined ? seed : item.value;

    const tempArr = [
      ...newData.map((i) => (
        i.value === selectedValue
          ? { ...i, isSelected: !i.isSelected }
          : { ...i, isSelected: i.isSelected }
      ))
    ];
    const filterArr = selected.filter((i) => i.value === selectedValue);
    
    if (filterArr.length !== 0) {
      const filterSeleted = selected.filter((i) => i.value !== selectedValue);
      filterSeleted.forEach((item) => (
        value.push(item.value)
      ));

      setTempSelected(filterSeleted);
      setSeletecArr([...filterSeleted, ...Array.from({ length: seeds - filterSeleted.length }, (_, i) => i + 1)]);
      if (!isHaveDisplayValue) onChange([...value, ...Array.from({ length: seeds - filterSeleted.length }, (_, i) => i + 1)])
      else onChange(value);
    } else {
      selected.push(item);
      selected.forEach((item) => (
        value.push(item.value)
      ));

      setTempSelected(selected);
      setSeletecArr([...selected, ...Array.from({ length: seeds - selected.length }, (_, i) => i + 1)]);
      if (!isHaveDisplayValue) onChange([...value, ...Array.from({ length: seeds - selected.length }, (_, i) => i + 1)])
      else onChange(value);
    }
    setNewData(tempArr);
  }

	return <View style={[styles.container, containerStyle]}>
		{isHaveDisplayValue && (
      <View style={[styles.displaySelectedWrapperContainer, displaySelectedWrapperStyle]}>
        <View style={[styles.displaySelectedContainer, displaySelectedStyle]}>
          {seletecArr.map((item, index) => (
            <View key={index} style={[styles.displayItemContainer, displaySelectedItemRowStyle]}>
              <Text>{index + 1}.</Text>
              <TouchableOpacity
                style={typeof item === 'object' ? [styles.displaySelectedButton, displaySelectedButtonStyle] : [styles.displayButton, displayButtonStyle]}
                onPress={() => selectedItem(item)}
              >
                <Text style={[styles.buttonText, displayButtonTextStyle]}>{item.value}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    )}
    
    <FlatList
      style={[{ width: SCREEN_WIDTH, flexGrow: 0 }]}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      data={newData}
      numColumns={3}
      keyExtractor={(item) => item.id }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={item.isSelected ? [styles.selectedButton, selectedButtonStyle] : [styles.button, buttonStyle]}
          onPress={() => selectedItem(item)}
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>{item.value}</Text>
        </TouchableOpacity>
      )}
    />
	</View>;
};

PhraseBackup.defaultProps = {
  seeds: 12,
  isHaveDisplayValue: true,
};

PhraseBackup.propTypes = {
  data: PropTypes.array.isRequired,
  seeds: PropTypes.number.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isHaveDisplayValue: PropTypes.bool,
  containerStyle: PropTypes.object,
  displaySelectedWrapperStyle: PropTypes.object,
  displaySelectedStyle: PropTypes.object,
  displaySelectedItemRowStyle: PropTypes.object,
  displayButtonStyle: PropTypes.object,
  displaySelectedButtonStyle: PropTypes.object,
  displayButtonTextStyle: PropTypes.object,
  selectedButtonStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
};

export default PhraseBackup;

const styles = StyleSheet.create({
	container: {
    alignItems: 'center',
    justifyContent: 'center',
	},
  button: {
    flexDirection: 'column',
    margin: 5,
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000'
  },
  selectedButton: {
    flexDirection: 'column',
    margin: 5,
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#828282',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayButton: {
    flexDirection: 'column',
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  displaySelectedButton: {
    flexDirection: 'column',
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
  displaySelectedWrapperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#828282',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 7,
    marginBottom: 30,
  },
  displaySelectedContainer: {
    width: 'auto',
    height: 280,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  displayItemContainer: {
    margin: 7,
    width: 125,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
