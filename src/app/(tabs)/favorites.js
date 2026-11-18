import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import TrailCard from '../../components/TrailCard';
import { trails } from '../../data/trails';
import { useFavorites } from '../../context/FavoritesContext';

export default function Favorites() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const favoriteTrails = trails.filter((t) => favorites.includes(t.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteTrails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrailCard
            trail={item}
            onPress={() => router.push(`/explore/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Tap the heart on a trail in Explore to save it here.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f2' },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyText: { color: '#666', marginTop: 6, textAlign: 'center' },
});