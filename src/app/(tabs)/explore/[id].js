import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { trails } from '../../../data/trails';

export default function TrailDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const trail = trails.find((t) => t.id === id);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>{trail ? trail.name : 'Trail not found'}</Text>
      <Pressable
        onPress={() => router.back()}
        style={{ marginTop: 16, padding: 12, backgroundColor: '#555', borderRadius: 8 }}
      >
        <Text style={{ color: 'white' }}>Go back</Text>
      </Pressable>
    </View>
  );
}