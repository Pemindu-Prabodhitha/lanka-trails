# Lanka Trails

**Name:** L A P Prabodhitha
**Student ID:** PS/2022/199

## Demo video
https://drive.google.com/file/d/1IgP9AK6oMGazIKVml3laAuvr-tPqi3Zm/view?usp=share_link

## About the app
Lanka Trails is a mobile app for discovering hiking trails in Sri Lanka.
Trail information is usually scattered across blogs and social media. This app
puts distance, duration, difficulty, elevation and best season for each trail
in one place, lets users filter by difficulty, and lets them save favorites.

## Screens (4)
| Screen | File | Purpose |
|---|---|---|
| Home | `src/app/(tabs)/index.js` | Welcome screen with trail and favorites counts |
| Explore | `src/app/(tabs)/explore/index.js` | List of all trails with a difficulty filter |
| Trail Detail | `src/app/(tabs)/explore/[id].js` | Full details, favorite button, reminder button |
| Favorites | `src/app/(tabs)/favorites.js` | Trails the user saved |

## Core React Native components used
| Component | Where |
|---|---|
| View, Text, Image, Pressable | `src/components/TrailCard.js`, all screens |
| FlatList | `src/app/(tabs)/explore/index.js`, `src/app/(tabs)/favorites.js` |
| Modal | `src/components/FilterModal.js` (used in Explore to filter by difficulty) |
| ScrollView | `src/app/(tabs)/explore/[id].js` |

## Expo Router structure
src/app/(tabs)/index.js
src/app/(tabs)/explore/[id].js
src/app/(tabs)/explore/index.js
src/app/(tabs)/explore/_layout.js
src/app/(tabs)/_layout.js
src/app/(tabs)/favorites.js
src/app/_layout.js

- `_layout.js` (root): wraps the app in `FavoritesProvider`, sets up notifications and the AppState listener
- `(tabs)/_layout.js`: tab navigation (Home, Explore, Favorites)
- `(tabs)/explore/_layout.js`: nested Stack for the list and detail screens
- `(tabs)/explore/[id].js`: dynamic route for a single trail

## State management
Favorites are stored with `useState` inside `FavoritesProvider`
(`src/context/FavoritesContext.js`) and shared across Explore, Detail,
Favorites and Home through the `useFavorites` hook.

## AppState
`src/app/_layout.js` registers an `AppState` change listener and remembers the
previous state with `useRef`. When the state goes from `inactive` or `background`
to `active`, it logs the event and shows a "Welcome back" banner
(`src/components/WelcomeBackBanner.js`).

## Local notifications: how I researched and implemented it

> I reviewed the official Expo `expo-notifications` documentation to understand how local alerts work across Android and iOS. From the docs, I learned that runtime permissions must be requested using `requestPermissionsAsync()` (along with creating an Android notification channel) before sending alerts, and that a notification handler (`setNotificationHandler`) is required so banners appear even when the app is open in the foreground. To implement this in `src/utils/notifications.js`, I used `scheduleNotificationAsync` with `trigger: null` to fire an instant confirmation whenever a trail is favorited, and a time-interval trigger (`seconds: 10`) for the scheduled reminder notification.

## Run locally
git clone https://github.com/Pemindu-Prabodhitha/lanka-trails.git
cd lanka-trails
npm install
npx expo start

Scan the QR code with Expo Go. Notifications work best on a real phone.

## Hard-coded data
`src/data/trails.js` contains 8 trails with district, difficulty, distance,
duration, elevation, best season, image and description.