import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { getVideos } from '@/app/service/videoService';
import { Video } from '@/app/types/types';
import VideoListScreen from './VideoListScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@/app/service/videoService', () => ({
  getVideos: jest.fn(),
}));

jest.mock('@/app/components/VideoCard', () => 'VideoCard');
jest.mock('@/app/components/VideoListSkeleton', () => 'VideoListSkeleton');

describe('VideoListScreen', () => {
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Test Video 1',
      description: 'Description for video 1',
      thumbnail: '',
      created_at: '',
      views: 100,
      likes: 10,
      category: { id: 'cat1', title: 'Category 1' },
    },
  ] as never;

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: jest.fn() });
    jest.clearAllMocks();
  });

  it('renders a loading skeleton while videos are loading', async () => {
    jest.useFakeTimers();

    const { getByTestId } = render(<VideoListScreen />);
    expect(getByTestId('video-list-skeleton')).toBeTruthy();

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(getByTestId('video-list')).toBeTruthy();
    });
  });

  it('displays a list of videos after loading', async () => {
    (getVideos as jest.Mock).mockResolvedValue(mockVideos);
    jest.useFakeTimers();

    const { queryByTestId, getByTestId } = render(<VideoListScreen />);

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(queryByTestId('video-list-skeleton')).toBeNull();
      expect(getByTestId('video-list')).toBeTruthy();
    });
  });

  it('navigates to VideoDetail screen when a video is pressed', async () => {
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });
    (getVideos as jest.Mock).mockResolvedValue(mockVideos);

    jest.useFakeTimers();

    const { queryByTestId, getByTestId } = render(<VideoListScreen />);

    jest.advanceTimersByTime(5000);

    await waitFor(() => expect(getByTestId('video-list')).toBeTruthy());
    fireEvent.press(queryByTestId('video-card'));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('VideoDetail', {
        videoId: '1',
      });
    });
  });
});
