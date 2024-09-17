import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const EventCard = ({ title, date, description, image, distance, price, time, onPress }) => {
  const dateTime = `${date} | ${time}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
      <View style={styles.body}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.dateTime}>{dateTime}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  distance: {
    fontSize: 14,
    color: '#888',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  image: {
    width: 85,
    height: 85,
    backgroundColor: '#eee',
    marginRight: 15,
    borderRadius: 12,
  },
  descriptionContainer: {
    flex: 1,
    maxWidth: '65%',
  },
  description: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dateTime: {
    fontSize: 14,
    color: '#888',
    flex: 1,
    textAlign: 'left',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default EventCard;
