import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa l'icona

export default function NavigationHeader() {
  const [selectedTab, setSelectedTab] = useState('My Events');
  const cursorPosition = useRef(new Animated.Value(0)).current;
  const [cursorWidth, setCursorWidth] = useState(45);
  const tabsContainerRef = useRef(null);

  const tabRefs = {
    'My Events': useRef(null),
    'Joined': useRef(null),
    'Nearby': useRef(null),
  };

  useEffect(() => {
    if (tabRefs[selectedTab].current && tabsContainerRef.current) {
      tabRefs[selectedTab].current.measure((x, y, width, height, pageX, pageY) => {
        // Misura la posizione del tab in relazione al contenitore dei tab
        tabsContainerRef.current.measure((containerX, containerY, containerWidth, containerHeight, containerPageX, containerPageY) => {
          const cursorX = pageX - containerPageX;

          Animated.spring(cursorPosition, {
            toValue: cursorX,
            useNativeDriver: true,
          }).start();

          setCursorWidth(width);
        });
      });
    }
  }, [selectedTab]);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.header}>
      <View style={styles.tabs} ref={tabsContainerRef}>
        <TouchableOpacity onPress={() => handleTabPress('Nearby')}>
          <Text
            ref={tabRefs['Nearby']}
            style={[styles.tabText, selectedTab === 'Nearby' && styles.activeTabText]}>
            Nearby
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress('Joined')}>
          <Text
            ref={tabRefs['Joined']}
            style={[styles.tabText, selectedTab === 'Joined' && styles.activeTabText]}>
            Joined
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress('My Events')}>
          <Text
            ref={tabRefs['My Events']}
            style={[styles.tabText, selectedTab === 'My Events' && styles.activeTabText]}>
            My Events
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cursorContainer}>
        <Animated.View style={[styles.cursor, { width: cursorWidth, transform: [{ translateX: cursorPosition }] }]} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={30} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#aaa"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Filter button pressed')}>
          <Icon name="filter-list" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4847ac',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '87%',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 15
  },
  searchBar: {
    flex: 1,
    fontSize: 19,
    color: '#000',
  },
  searchIcon: {
    marginRight: 4,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%',
    paddingHorizontal: "3%",
    marginBottom: 0,
  },
  tabText: {
    color: '#aaa',
    fontSize: 18,
  },
  activeTabText: {
    color: '#fff',
  },
  cursorContainer: {
    position: 'relative',
    width: '100%',
    height: 4,
    alignItems: 'center',
    marginTop: 5,
  },
  cursor: {
    backgroundColor: '#fff',
    height: 3,
    position: 'absolute',
  },
});
