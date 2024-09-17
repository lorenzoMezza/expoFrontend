import { AppState } from 'react-native';
import * as Location from 'expo-location';

class GPSManager {
  constructor() {
    this.subscribers = new Map();
    this.lastPosition = null;
    this.appState = AppState.currentState;
    this.permissionDenied = false;

    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    this.initializeLocationTracking();
  }

  async initializeLocationTracking() {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        if (newStatus !== 'granted') {
          console.error('Permessi di localizzazione negati');
          this.permissionDenied = true;
          return;
        }
      }

      this.permissionDenied = false;

      // Start watching the position with high accuracy
      this.watchId = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation, // Highest accuracy
        timeInterval: 3000, // Update interval in milliseconds
        distanceInterval: 10, // Minimum distance (in meters) before update
      }, this.handleLocationUpdate.bind(this));
      
    } catch (error) {
      console.error('Errore nell\'inizializzazione della localizzazione:', error);
    }
  }

  async requestLocation(id) {
    if (this.permissionDenied) {
      console.error('Permessi di localizzazione negati');
      return;
    }

    console.log(`Richiesta posizione per subscriber: ${id}`);

    try {
      const position = this.lastPosition
        ? { coords: this.lastPosition }
        : await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            mayShowUserSettingsDialog: true,
          });

      const { latitude, longitude } = position.coords;

      let distance = null;
      const subscriber = this.subscribers.get(id);
      if (subscriber && subscriber.lastPosition) {
        distance = this.calculateDistance(
          subscriber.lastPosition.latitude,
          subscriber.lastPosition.longitude,
          latitude,
          longitude
        );
      }

      this.subscribers.set(id, { lastPosition: { latitude, longitude } });

      if (subscriber) {
        subscriber.callback(position, distance);
      }
    } catch (error) {
      console.error('Errore nel recupero della posizione:', error);
    }
  }

  handleLocationUpdate(position) {
    const { latitude, longitude } = position.coords;
    
    this.lastPosition = { latitude, longitude };

    // Update all subscribers with the latest position
    for (const [id, subscriber] of this.subscribers) {
      let distance = null;
      if (subscriber.lastPosition) {
        distance = this.calculateDistance(
          subscriber.lastPosition.latitude,
          subscriber.lastPosition.longitude,
          latitude,
          longitude
        );
      }
      subscriber.callback(position, distance);
      this.subscribers.set(id, { lastPosition: { latitude, longitude } });
    }
  }

  handleAppStateChange = async (nextAppState) => {
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (this.permissionDenied) {
        await this.initializeLocationTracking();
      }
    }
    this.appState = nextAppState;
  };

  subscribe(id, callback) {
    console.log(`Aggiunto subscriber: ${id}`);
    this.subscribers.set(id, { callback, lastPosition: this.lastPosition });
  }

  unsubscribe(id) {
    console.log(`Rimosso subscriber: ${id}`);
    this.subscribers.delete(id);
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  destroy() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
    if (this.watchId) {
      this.watchId.remove();
    }
  }
}

const gpsManager = new GPSManager();

export default gpsManager;
