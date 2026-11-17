import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import TrailCard from '../../../components/TrailCard';
import FilterModal from '../../../components/FilterModal';
import { trails } from '../../../data/trails';

export default function ExploreList() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTrails =
    filter === 'All' ? trails : trails.filter((t) => t.difficulty === filter);

  const handleSelect = (option) => {
    setFilter(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        <Text style={styles.count}>
          {filteredTrails.length} trail{filteredTrails.length === 1 ? '' : 's'}
          {filter !== 'All' ? ` · ${filter}` : ''}
        </Text>
        <Pressable onPress={() => setModalVisible(true)} style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredTrails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrailCard
            trail={item}
            onPress={() => router.push(`/explore/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No trails match this filter.</Text>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <FilterModal
        visible={modalVisible}
        selected={filter}
        onSelect={handleSelect}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f2' },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  count: { color: '#444', fontWeight: '600' },
  filterButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: { color: 'white', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#666' },
});