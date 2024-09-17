import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';


export const TabBar = ({ state, descriptors, navigation }) => {

  const animations = state.routes.reduce((acc, route) => {
    acc[route.name] = useRef(new Animated.Value(0)).current;
    return acc;
  }, {});

  const iconSize = 28; 
  const iconSizeActive = 32; 
  const { width } = Dimensions.get('window'); 

  const getIcon = (routeName, isFocused) => {
    const size = isFocused ? iconSizeActive : iconSize;
    switch (routeName) {
      case 'shopPage':
        return <MaterialIcons name="shopping-cart" size={size} color={isFocused ? '#000' : '#222'} />;
      case 'userPage':
        return <FontAwesome name="user" size={size} color={isFocused ? '#000' : '#222'} />;
      case 'mapPage':
        return <Ionicons name="map" size={size} color={isFocused ? '#000' : '#222'} />;
      case 'eventsPage':
        return <MaterialIcons name="event" size={size} color={isFocused ? '#000' : '#222'} />;
      case 'messagingPage':
        return <Ionicons name="chatbubble" size={size} color={isFocused ? '#000' : '#222'} />;
      default:
        return null;
    }
  };

  const animateIcon = (routeName, isFocused) => {
    Animated.timing(animations[routeName], {
      toValue: isFocused ? -2 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.tabBarContainer}>
      <View style={[styles.tabBar, { width }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
          const isFocused = state.index === index;

          animateIcon(route.name, isFocused);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              style={styles.tabBarItem}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <Animated.View style={{ transform: [{ translateY: animations[route.name] }] }}>
                {getIcon(route.name, isFocused)}
              </Animated.View>
              {isFocused && <Text style={styles.tabLabel}>{label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    height: 87, // Altezza della tab bar
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingBottom: 30,

  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    marginTop: 0,
    fontSize: 12,
    color: '#222',
  },
});
