import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const difficultyColors = {
  Easy: '#2e7d32',
  Moderate: '#f9a825',
  Hard: '#c62828',
};

export default function TrailCard({ trail, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: trail.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{trail.name}</Text>
        <Text style={styles.district}>{trail.district}</Text>
        <View style={styles.row}>
          <Text
            style={[styles.badge, { backgroundColor: difficultyColors[trail.difficulty] }]}
          >
            {trail.difficulty}
          </Text>
          <Text style={styles.meta}>
            {trail.distanceKm} km · {trail.duration}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: { opacity: 0.85 },
  image: { width: '100%', height: 160, backgroundColor: '#ddd' },
  info: { padding: 12 },
  name: { fontSize: 18, fontWeight: '700' },
  district: { color: '#666', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  badge: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  meta: { color: '#444' },
});