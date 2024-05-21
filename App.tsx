import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Home} from './src/screens/Home';
import {colours} from './src/style/colours';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: colours.appBackground, flex: 1}}>
      <Home />
    </SafeAreaView>
  );
}

export default App;
