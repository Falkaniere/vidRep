import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/route';
import { getVideos } from '@/app/service/videoService';
import { Video } from '@/app/types/types';
import VideoCard from '@/app/components/VideoCard';
import VideoListSkeleton from '@/app/components/VideoListSkeleton';

export default function VideoListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'VideoList'>>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos(1, 10);
        setVideos(data);
        setTimeout(() => setLoading(false), 10000);
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handlePress = (videoId: string) => {
    navigation.navigate('VideoDetail', { videoId });
  };

  if (loading) return <VideoListSkeleton />;

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <VideoCard video={item} category={item?.category} />
        </TouchableOpacity>
      )}
    />
  );
}
