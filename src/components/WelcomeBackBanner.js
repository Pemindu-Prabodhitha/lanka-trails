import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeBackBanner({ visible, count }) {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <View style={[styles.banner, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Welcome back! 👋</Text>
      <Text style={styles.text}>
        You returned to Lanka Trails ({count} time{count === 1 ? '' : 's'} this session)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: { color: 'white', fontSize: 16, fontWeight: '700' },
  text: { color: 'white', marginTop: 2 },
});