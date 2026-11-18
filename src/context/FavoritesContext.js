import { createContext, useContext, useState } from 'react';
import { trails } from '../data/trails';
import { notifyFavorited } from '../utils/notifications';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // array of trail ids

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    const adding = !favorites.includes(id);

    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

    if (adding) {
      const trail = trails.find((t) => t.id === id);
      if (trail) notifyFavorited(trail.name);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return context;
}