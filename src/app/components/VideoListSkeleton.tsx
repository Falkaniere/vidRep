import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

interface VideoListSkeletonProps {
  testID?: string; // Add testID as an optional prop
}
const VideoListSkeleton = ({ testID }: VideoListSkeletonProps) => (
  <SkeletonPlaceholder>
    <View style={{ margin: 20 }} testID={testID}>
      <View style={{ width: '100%', height: 20, borderRadius: 4 }} />
      <View
        style={{ width: '80%', height: 20, borderRadius: 4, marginTop: 10 }}
      />
      <View
        style={{ width: '90%', height: 20, borderRadius: 4, marginTop: 10 }}
      />
      <View
        style={{ width: '60%', height: 20, borderRadius: 4, marginTop: 10 }}
      />
    </View>
  </SkeletonPlaceholder>
);

export default VideoListSkeleton;
