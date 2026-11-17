import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreList() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Explore list (coming soon)</Text>
      <Pressable
        onPress={() => router.push('/explore/1')}
        style={{ marginTop: 16, padding: 12, backgroundColor: '#2e7d32', borderRadius: 8 }}
      >
        <Text style={{ color: 'white' }}>Open trail 1</Text>
      </Pressable>
    </View>
  );
}