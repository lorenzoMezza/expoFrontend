import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

export default function MyEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([
    { id: '1', title: 'MY Event 1', date: '2024-09-20', description: 'Description for Event 1' },
    { id: '2', title: 'MY Event 2', date: '2024-09-21', description: 'Description for Event 2' },
    { id: '3', title: 'MY Event 3', date: '2024-09-22', description: 'Description for Event 3' },
    { id: '4', title: 'MY Event 4', date: '2024-09-23', description: 'Description for Event 4' },
    { id: '5', title: 'MY Event 5', date: '2024-09-24', description: 'Description for Event 5' },
    { id: '6', title: 'MY Event 6', date: '2024-09-25', description: 'Description for Event 6' },
    { id: '7', title: 'MY Event 7', date: '2024-09-26', description: 'Description for Event 7' },
    { id: '8', title: 'MY Event 8', date: '2024-09-27', description: 'Description for Event 8' },
    { id: '9', title: 'MY Event 9', date: '2024-09-28', description: 'Description for Event 9' },
    { id: '10', title: 'MY Event 10', date: '2024-09-29', description: 'Description for Event 10' },
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
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {events
          .filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((event) => (
            <View key={event.id} style={styles.card}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.date}>{event.date}</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>
          ))}
      </Animated.ScrollView>
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
    flexDirection: 'row', // Ensure icon and search bar are in a row
    alignItems: 'center', // Vertically center the items
  },
  filterButton: {
    marginRight: 10, // Space between icon and search bar
  },
  searchBar: {
    height: 50,
    flex: 1, // Take up remaining space
    padding: 0,
    fontSize: 16,
  },
  scrollContainer: {
    paddingTop: 80, // Adjust based on search bar height
    padding: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
});
