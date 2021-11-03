import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SeedComponent = ({ data, seeds, isHaveDisplayValue, handleSelect, containerStyle, displaySelectedWrapperStyle, displaySelectedStyle, displaySelectedItemStyle, ...rest }) => {
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

  const selectedItem = (item) => {
    const selected = [...tempSelected];
    const value = [];
    const tempArr = [
      ...newData.map((i) => (
        i.id === item.id
          ? { ...i, isSelected: !i.isSelected }
          : { ...i, isSelected: i.isSelected }
      ))
    ];
    const filterArr = selected.filter((i) => i.id === item.id);
    if (filterArr.length !== 0) {
      const filterSeleted = selected.filter((i) => i.id !== item.id);
      filterSeleted.forEach((item) => (
        value.push(item.value)
      ));

      setTempSelected(filterSeleted);
      setSeletecArr([...filterSeleted, ...Array.from({ length: seeds - filterSeleted.length }, (_, i) => i + 1)]);
      handleSelect(value);
    } else {
      selected.push(item);
      selected.forEach((item) => (
        value.push(item.value)
      ));

      setTempSelected(selected);
      setSeletecArr([...selected, ...Array.from({ length: seeds - selected.length }, (_, i) => i + 1)]);
      handleSelect(value);
    }
    setNewData(tempArr);
  }

	return <View style={[styles.container, containerStyle]}>
		{isHaveDisplayValue && (
      <View style={[styles.displaySelectedWrapperContainer, displaySelectedWrapperStyle]}>
        <View style={[styles.displaySelectedContainer, displaySelectedStyle]}>
          {seletecArr.map((item, index) => (
            <View key={index} style={[styles.displayItemContainer, displaySelectedItemStyle]}>
              <Text>{index + 1}.</Text>
              <TouchableOpacity
                style={typeof item === 'object' ? styles.displaySelectedButton : styles.displayButton}
                onPress={() => selectedItem(item)}
              >
                <Text style={styles.buttonText}>{item.value}</Text>
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
          style={item.isSelected ? styles.selectedButton : styles.button}
          onPress={() => selectedItem(item)}
        >
          <Text style={styles.buttonText}>{item.value}</Text>
        </TouchableOpacity>
      )}
    />
	</View>;
};

SeedComponent.defaultProps = {
  seeds: 12,
  isHaveDisplayValue: true,
};

SeedComponent.propTypes = {
  data: PropTypes.array.isRequired,
  seeds: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  isHaveDisplayValue: PropTypes.bool,
};

export default SeedComponent;

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
