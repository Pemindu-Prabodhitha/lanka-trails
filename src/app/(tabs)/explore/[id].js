import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { trails } from '../../../data/trails';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../../context/FavoritesContext';
import { scheduleTrailReminder } from '../../../utils/notifications';

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function TrailDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const trail = trails.find((t) => t.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!trail) {
    return (
      <View style={styles.center}>
        <Text>Trail not found</Text>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={trail.image} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{trail.name}</Text>
        <Text style={styles.district}>
          {trail.district} · {trail.difficulty}
        </Text>

        <View style={styles.stats}>
          <Stat label="Distance" value={`${trail.distanceKm} km`} />
          <Stat label="Duration" value={trail.duration} />
          <Stat label="Elevation" value={`${trail.elevationM} m`} />
        </View>

        <Text style={styles.sectionTitle}>Best season</Text>
        <Text style={styles.text}>{trail.bestSeason}</Text>

        <Text style={styles.sectionTitle}>About this trail</Text>
        <Text style={styles.text}>{trail.description}</Text>

        <Pressable
            onPress={() => toggleFavorite(trail.id)}
            style={styles.favButton}
            >
            <Ionicons
                name={isFavorite(trail.id) ? 'heart' : 'heart-outline'}
                size={20}
                color="#e53935"
            />
            <Text style={styles.favText}>
                {isFavorite(trail.id) ? 'Remove from favorites' : 'Add to favorites'}
            </Text>
        </Pressable>
        <Pressable
            onPress={() => scheduleTrailReminder(trail.name, 10)}
            style={styles.reminderButton}
            >
            <Text style={styles.reminderText}>Remind me in 10 seconds</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Back to trails</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 240, backgroundColor: '#ddd' },
  body: { padding: 16 },
  name: { fontSize: 24, fontWeight: '700' },
  district: { color: '#666', marginTop: 4 },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    padding: 12,
  },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#666', fontSize: 12, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  text: { marginTop: 4, lineHeight: 22, color: '#333' },
  button: {
    marginTop: 24,
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '600' },
  
  favButton: {
  marginTop: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 14,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#e53935',
},
favText: { marginLeft: 8, color: '#e53935', fontWeight: '600' },

reminderButton: {
  marginTop: 12,
  padding: 14,
  borderRadius: 10,
  backgroundColor: '#eef5ee',
  alignItems: 'center',
},
reminderText: { color: '#2e7d32', fontWeight: '600' },
});