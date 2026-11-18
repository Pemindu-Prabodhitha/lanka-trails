import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { trails } from '../../data/trails';
import { useFavorites } from '../../context/FavoritesContext';

export default function Home() {
  const router = useRouter();
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lanka Trails 🥾</Text>
      <Text style={styles.subtitle}>
        Discover hiking trails across Sri Lanka and save your favorites.
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{trails.length}</Text>
          <Text style={styles.statLabel}>Trails</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => router.push('/explore')}>
        <Text style={styles.buttonText}>Explore trails</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f2f4f2' },
  title: { fontSize: 32, fontWeight: '800', color: '#2e7d32' },
  subtitle: { fontSize: 16, color: '#444', marginTop: 8, lineHeight: 22 },
  stats: { flexDirection: 'row', marginTop: 28, gap: 12 },
  stat: { flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '700' },
  statLabel: { color: '#666', marginTop: 2 },
  button: { marginTop: 28, backgroundColor: '#2e7d32', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});