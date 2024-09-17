import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assicurati di avere react-native-vector-icons installato
import EventCard from '../../components/eventCard';
import gpsManager from '../../LacationManagment/GPSManager';


const getImageUrl = (id) => `https://picsum.photos/100/100?random=${id}`;

export default function NearbyEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([
 
        { id: '1', title: 'Local Music Festival Center Expo', date: '2024-09-20', time: '12:00 PM', description: 'Join us for a day of live music and fun at the Local Music Festival. Discover emerging bands and local artists performing on the main stage and in themed areas. Bring your friends and family for a day of celebration and explore the vibrant music scene in our city.', image: getImageUrl('1'), distance: '5 km', price: '$' },
        
        { id: '2', title: 'Art & Craft Fair', date: '2024-09-21', time: '10:00 AM', description: 'Dive into the world of art and craftsmanship at the Art & Craft Fair. Meet local artists, discover unique and original pieces, and participate in creative workshops. This free event is a great opportunity to explore and purchase art and handmade items created with passion and skill.', image: getImageUrl('2'), distance: '10 km', price: 'free' },
        
        { id: '3', title: 'City Marathon', date: '2028-09-21', time: '08:00 AM', description: 'Join the City Marathon and challenge yourself in one of the year’s most anticipated races. Whether you’re an experienced runner or a beginner, there are routes for all levels. Enjoy side events like concerts, food stalls, and activities for the whole family.', image: getImageUrl('3'), distance: '15 km', price: 'free' },

        { id: '4', title: 'Wine & Flavor Festival', date: '2028-05-21', time: '02:00 PM', description: 'Experience the Wine & Flavor Festival, a chance to taste the finest regional wines and savor dishes prepared by renowned chefs. Enjoy a day of delicious food, music, and a celebration of local culinary and wine culture in a festive and welcoming atmosphere.', image: getImageUrl('4'), distance: '20 km', price: '$$$' },
        
        { id: '5', title: 'Nature Day', date: '2018-01-21', time: '09:00 AM', description: 'Participate in Nature Day and explore the wonders of the natural environment through guided walks, educational activities, and children’s workshops. This free event is a perfect opportunity to connect with nature and learn how to protect and preserve our planet.', image: getImageUrl('5'), distance: '2 km', price: 'free' },
        
        { id: '6', title: 'Outdoor New Year’s Party', date: '2018-01-04', time: '07:00 PM', description: 'Celebrate the New Year in style at our Outdoor New Year’s Party! Enjoy live music, dancing, and an exciting fireworks display. Bring your family and friends to ring in the new year with joy and celebration.', image: getImageUrl('6'), distance: '8 km', price: '$$' },
        
        { id: '7', title: 'Farmers Market', date: '2016-05-04', time: '08:00 AM', description: 'Explore fresh, local produce at the Farmers Market. Meet local growers and buy fruits, vegetables, cheeses, and other products directly from their hands. This market is a great way to support the local economy and enjoy fresh, healthy foods.', image: getImageUrl('7'), distance: '12 km', price: '$' },
        
        { id: '8', title: 'Culture & Traditions Festival', date: '2019-12-14', time: '11:00 AM', description: 'Immerse yourself in local cultures and traditions at the Culture & Traditions Festival. Enjoy folk dances, traditional crafts, and taste foods from various parts of the world. This free event celebrates cultural diversity and community heritage.', image: getImageUrl('8'), distance: '18 km', price: 'free' },
     

  ]);

  const [showSearch, setShowSearch] = useState(true);
  const scrollY = new Animated.Value(0);

  const onChangeSearch = query => setSearchQuery(query);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  scrollY.addListener(({ value }) => {
    if (value > 15) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {showSearch && (
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={() => alert('Filter button pressed')}>
            <Icon name="filter-list" size={28} color="#000" />
          </TouchableOpacity>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            placeholderTextColor="#888"
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {events
          .filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              description={event.description}
              image={event.image}
              distance={event.distance} // Aggiungi la distanza
              price={event.price} // Aggiungi il prezzo
              time = {event.time}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    elevation: 3,
    zIndex: 1,
    flexDirection: 'row', // Assicurati che icona e barra di ricerca siano in fila
    alignItems: 'center', // Centra verticalmente gli elementi
  },
  filterButton: {
    marginRight: 10, // Spazio tra icona e barra di ricerca
  },
  searchBar: {
    height: 50,
    flex: 1, // Occupa lo spazio rimanente
    padding: 0,
    fontSize: 16,
  },
  scrollContainer: {
    paddingTop: 80, // Regola in base all'altezza della barra di ricerca
    paddingBottom: 150, // Aggiungi padding inferiore per evitare che l'ultima card venga nascosta dalla tab bar
    padding: 14,
  },
});
