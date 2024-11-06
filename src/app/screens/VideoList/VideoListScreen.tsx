import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/route';
import { getVideos } from '@/app/service/videoService';
import { Video } from '@/app/types/types';
import VideoCard from '@/app/components/VideoCard';
import VideoListSkeleton from '@/app/components/VideoListSkeleton';

function VideoListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'VideoList'>>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const fetchVideos = async () => {
      try {
        const data = await getVideos(1, 10);
        setVideos(data as Video[]);
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => fetchVideos(), 5000)
  }, []);

  const handlePress = (videoId: string) => {
    navigation.navigate('VideoDetail', { videoId });
  };

  if (loading) return <VideoListSkeleton testID="video-list-skeleton" />;

  return (
    <FlatList
      testID="video-list"
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <VideoCard video={item} category={item?.category} testID="video-card"/>
        </TouchableOpacity>
      )}
    />
  );
}

export default VideoListScreen
