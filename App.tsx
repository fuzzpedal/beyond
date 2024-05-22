import React from 'react';
import { SafeAreaView } from 'react-native';

import { Home } from './src/screens/Home';
import { styles } from './src/styles';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.main}>
      <Home />
    </SafeAreaView>
  );
}

export default App;
