import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Home} from './src/screens/Home';
import {colours} from './src/style/colours';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colours.appBackground}
        />
        <Home />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
