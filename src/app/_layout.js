import { useEffect, useRef, useState } from 'react';
import { AppState, View } from 'react-native';
import { Stack } from 'expo-router';
import { FavoritesProvider } from '../context/FavoritesContext';
import { setupNotifications } from '../utils/notifications';
import WelcomeBackBanner from '../components/WelcomeBackBanner';

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [showBanner, setShowBanner] = useState(false);
  const [returnCount, setReturnCount] = useState(0);

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    let timer;

    const subscription = AppState.addEventListener('change', (nextState) => {
      console.log('AppState changed:', appState.current, '->', nextState);

      // background (or inactive) -> active = app came back to the foreground
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        console.log('App has come to the foreground!');
        setReturnCount((c) => c + 1);
        setShowBanner(true);
        timer = setTimeout(() => setShowBanner(false), 3000);
      }

      appState.current = nextState;
    });

    return () => {
      subscription.remove();
      clearTimeout(timer);
    };
  }, []);

  return (
    <FavoritesProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <WelcomeBackBanner visible={showBanner} count={returnCount} />
      </View>
    </FavoritesProvider>
  );
}