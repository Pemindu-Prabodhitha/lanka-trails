import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trails } from '../../data/trails';
import { useFavorites } from '../../context/FavoritesContext';

const GREEN = '#2e7d32';

// Works for both local images (require) and web links (string)
const toSource = (image) => (typeof image === 'string' ? { uri: image } : image);

const difficultyInfo = [
  { level: 'Easy', color: '#2e7d32', icon: 'walk' },
  { level: 'Moderate', color: '#f9a825', icon: 'trending-up' },
  { level: 'Hard', color: '#c62828', icon: 'flame' },
];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();

  const featured = trails.slice(0, 5);
  const countOf = (level) => trails.filter((t) => t.difficulty === level).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO */}
      <ImageBackground source={toSource(trails[0].image)} style={styles.hero}>
        <View style={styles.overlay} />
        <View style={[styles.heroContent, { paddingTop: insets.top + 24 }]}>
          <View style={styles.brandRow}>
            <Ionicons name="trail-sign" size={22} color="white" />
            <Text style={styles.brand}>Lanka Trails</Text>
          </View>
          <Text style={styles.heroTitle}>Find your next{'\n'}Sri Lankan adventure</Text>
          <Text style={styles.heroSubtitle}>
            Hand-picked hiking trails from misty peaks to tea country ridges.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.ctaText}>Explore trails</Text>
            <Ionicons name="arrow-forward" size={18} color={GREEN} />
          </Pressable>
        </View>
      </ImageBackground>

      {/* STATS CARD (overlaps the hero) */}
      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{trails.length}</Text>
          <Text style={styles.statLabel}>Trails</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {new Set(trails.map((t) => t.district)).size}
          </Text>
          <Text style={styles.statLabel}>Districts</Text>
        </View>
      </View>

      {/* DIFFICULTY */}
      <Text style={styles.sectionTitle}>Browse by difficulty</Text>
      <View style={styles.levelRow}>
        {difficultyInfo.map((d) => (
          <Pressable
            key={d.level}
            style={styles.levelCard}
            onPress={() => router.push('/explore')}
          >
            <View style={[styles.levelIcon, { backgroundColor: d.color }]}>
              <Ionicons name={d.icon} size={20} color="white" />
            </View>
            <Text style={styles.levelName}>{d.level}</Text>
            <Text style={styles.levelCount}>{countOf(d.level)} trails</Text>
          </Pressable>
        ))}
      </View>

      {/* FEATURED CAROUSEL */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured trails</Text>
        <Pressable onPress={() => router.push('/explore')}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <FlatList
        data={featured}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.featCard, pressed && { opacity: 0.9 }]}
            onPress={() => router.push(`/explore/${item.id}`)}
          >
            <Image source={toSource(item.image)} style={styles.featImage} />
            <View style={styles.featInfo}>
              <Text style={styles.featName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.featMeta}>
                {item.district} · {item.distanceKm} km
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* FAVORITES SHORTCUT */}
      <Pressable style={styles.favBanner} onPress={() => router.push('/favorites')}>
        <Ionicons name="heart" size={26} color="#e53935" />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.favTitle}>Your favorites</Text>
          <Text style={styles.favText}>
            {favorites.length === 0
              ? 'Tap the heart on a trail to save it'
              : `${favorites.length} saved trail${favorites.length === 1 ? '' : 's'}`}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </Pressable>

      <Text style={styles.footer}>Lanka Trails · Made in Sri Lanka 🇱🇰</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f4' },

  hero: { height: 360, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  heroContent: { flex: 1, paddingHorizontal: 20, paddingBottom: 56 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brand: { color: 'white', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  heroTitle: { color: 'white', fontSize: 32, fontWeight: '800', marginTop: 20, lineHeight: 38 },
  heroSubtitle: { color: 'rgba(255,255,255,0.9)', marginTop: 10, lineHeight: 21 },
  cta: {
    marginTop: 18,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
  },
  ctaText: { color: GREEN, fontWeight: '700', fontSize: 15 },

  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -36,
    borderRadius: 16,
    paddingVertical: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800', color: GREEN },
  statLabel: { color: '#666', marginTop: 2, fontSize: 12 },
  divider: { width: 1, backgroundColor: '#e5e5e5' },

  sectionTitle: { fontSize: 18, fontWeight: '800', marginHorizontal: 20, marginTop: 28, marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingRight: 20 },
  seeAll: { color: GREEN, fontWeight: '700' },

  levelRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10 },
  levelCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  levelIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  levelName: { fontWeight: '700', marginTop: 8 },
  levelCount: { color: '#777', fontSize: 12, marginTop: 2 },

  featCard: {
    width: 230,
    backgroundColor: 'white',
    borderRadius: 14,
    marginRight: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  featImage: { width: '100%', height: 140, backgroundColor: '#ddd' },
  featInfo: { padding: 12 },
  featName: { fontWeight: '700', fontSize: 15 },
  featMeta: { color: '#666', marginTop: 4, fontSize: 13 },

  favBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
  },
  favTitle: { fontWeight: '700' },
  favText: { color: '#666', marginTop: 2, fontSize: 13 },

  footer: { textAlign: 'center', color: '#999', marginVertical: 28, fontSize: 12 },
});