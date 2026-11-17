import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import TrailCard from '../../../components/TrailCard';
import { trails } from '../../../data/trails';

export default function ExploreList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={trails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrailCard
            trail={item}
            onPress={() => router.push(`/explore/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f2' },
});