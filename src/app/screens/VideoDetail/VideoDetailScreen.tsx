import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/route';
import api, { BASE_URL } from '@/app/service/index';
import { Video as ExpoVideo } from 'expo-av';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type VideoDetailScreenRouteProp = RouteProp<RootStackParamList, 'VideoDetail'>;

type Video = {
  id: number;
  title: string;
  description: string;
  views: number;
  likes: number;
  thumbnail: string;
  site_id: number;
  created_at: string;
  category: number;
  hls_path: string;
};

const VideoDetailScreen: React.FC = () => {
  const route = useRoute<VideoDetailScreenRouteProp>();
  const { videoId } = route.params;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const fetchVideo = async () => {
      try {
        const response = await api.get<Video>(`/videos/${videoId}`);
        const data = response.data;
        setVideo(data);

        await api.patch(`/videos/${videoId}`, { views: data.views + 1 });
        setVideo((prevVideo) =>
          prevVideo ? { ...prevVideo, views: prevVideo.views + 1 } : null,
        );
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => fetchVideo(), 5000)
  }, [videoId]);

  const handleLike = async () => {
    if (video) {
      try {
        await api.patch(`/videos/${video.id}`, { likes: video.likes + 1 });
        setVideo((prevVideo) =>
          prevVideo ? { ...prevVideo, likes: prevVideo.likes + 1 } : null,
        );
      } catch (error) {
        console.error('Error incrementing like:', error);
      }
    }
  };

  if (loading) {
    return (
      <SkeletonPlaceholder>
        <View>
          <View style={{ width: '100%', height: 200, borderRadius: 4 }} />
          <View
            style={{
              marginTop: 15,
              height: 25,
              width: '70%',
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 10,
              height: 20,
              width: '90%',
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 10,
              height: 20,
              width: '85%',
              borderRadius: 4,
            }}
          />
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <View style={{ width: 60, height: 20, borderRadius: 4, marginRight: 15 }} />
            <View style={{ width: 60, height: 20, borderRadius: 4 }} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    video && (
      <View style={{ padding: 10, paddingBottom: 25 }}>
        <ExpoVideo
          source={{ uri: video.hls_path }}
          style={{ width: '100%', height: 200 }}
          useNativeControls
          shouldPlay
        />
        <Text style={{ paddingBottom: 5, paddingTop: 10 }}>
          Título: {video.title}
        </Text>
        <Text style={{ paddingBottom: 5 }}>Descrição: {video.description}</Text>
        <Text style={{ paddingBottom: 5 }}>Visualizações: {video.views}</Text>
        <Text style={{ paddingBottom: 5 }}>Likes: {video.likes}</Text>
        <Button title="Curtir" onPress={handleLike} />
      </View>
    )
  );
};

export default VideoDetailScreen;
