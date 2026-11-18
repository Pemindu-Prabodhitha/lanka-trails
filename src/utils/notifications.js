import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Show notifications even while the app is open (foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Ask for permission (and create the Android channel). Call once at startup.
export async function setupNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') {
    const request = await Notifications.requestPermissionsAsync();
    status = request.status;
  }
  return status === 'granted';
}

// Immediate notification when a trail is favorited
export async function notifyFavorited(trailName) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Trail saved! ⭐',
        body: `${trailName} was added to your favorites.`,
      },
      trigger: null, // null = fire immediately
    });
  } catch (error) {
    console.log('Notification error:', error);
  }
}