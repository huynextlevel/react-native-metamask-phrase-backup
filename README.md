# react-native-metamask-phrase-backup

A simple and fully customizable React Native component that implements a metamask phrase backup.
* Fully customizable buttons and display selected value area

Metamask UI Example       
:-------------------------:
![](assets/react-native-metamask-phrase-backup-example1.png)

React Native Metamask Phrase Backup Example | React Native Metamask Phrase Backup Example | React Native Metamask Phrase Backup Example
:-------------------------:|:-------------------------:|:-------------------------:
![](assets/react-native-metamask-phrase-backup-example2.png) | ![](assets/react-native-metamask-phrase-backup-example3.png) | ![](assets/react-native-metamask-phrase-backup-example4.png)


## Installation

If using yarn:

```
yarn add react-native-metamask-phrase-backup
```

If using npm:

```
npm i react-native-metamask-phrase-backup
```

## Usage

```
import { PhraseBackup } from 'react-native-metamask-phrase-backup';
```

Simply place a `<PhraseBackup />` tag.

```
<View style={{flex: 1}}>
  <PhraseBackup data={data} onChange={onChangeSelectedValue}/>
</View>
```

## Documentation

### Phrase Backup Component
| Name                      | Description                              | Default     | Type    |
|---------------------------|------------------------------------------|-------------|---------|
| data                      | The data of phrase backup string         | REQUIRED    | Array   |
| seeds                     | Total of phrase backup words             | 12          | number  |
| onChange                  | To get the selected string array         | null        | function |
| containerStyle            | The wrapper style of component           | null        | Object  |
| displaySelectedWrapperStyle | Style applied to the wrapper display seletected container  | null | Object  |
| displaySelectedStyle      | Style applied to the display seletected container  | null | Object  |
| displaySelectedItemRowStyle | Style applied to the display selected item row   | null | Object  |
| displaySelectedButtonStyle  | Style applied to the display selected button container  | null | Object  |
| displayButtonTextStyle    | Style applied to the display selected button text           | null | Object  |
| selectedButtonStyle       | Style applied to the selected button container     | null | Object  |
| buttonTextStyle           | Style applied to the selected button text          | null | Object  |
| activeLabelFontSize       | Optional font size for the active step icon label  | null | Object  |


## Contributing
Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

## Author
Huy Pham

## License
[MIT](./LICENSE)