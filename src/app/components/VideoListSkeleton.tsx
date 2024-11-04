import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

const VideoListSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={{ margin: 20 }}>
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
