import { Category, Video } from '../types/types';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type VideoCardProps = {
  video: Video;
  category: Category | undefined;
};

const VideoCard: React.FC<VideoCardProps> = ({ video, category }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.category}>
          {category?.title || 'Unknown Category'}
        </Text>
        <Text style={styles.date}>
          Published on {new Date(video.created_at).toDateString()}
        </Text>
        <Text style={styles.description}>
          {video.description || 'No description available.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default VideoCard;
