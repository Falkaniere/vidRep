import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
// import VideoDetailScreen from '../screens/VideoDetailScreen';
import { useRoute } from '@react-navigation/native';
import api from '@/app/service';
import VideoDetailScreen from './VideoDetailScreen';
// import api from '../service/api';

// Mock useRoute to provide videoId
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

// Mock API calls
jest.mock('@/app/service', () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

describe('VideoDetailScreen', () => {
  const mockVideo = {
    id: 1,
    title: 'Test Video',
    description: 'This is a test description',
    views: 10,
    likes: 5,
    thumbnail: 'https://example.com/thumbnail.jpg',
  };

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { videoId: mockVideo.id },
    });
    (api.get as jest.Mock).mockResolvedValue({ data: mockVideo });
    (api.patch as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders video details correctly', async () => {
    const { getByText } = render(<VideoDetailScreen />);

    await waitFor(() => expect(getByText('Título: Test Video')).toBeTruthy());
    expect(getByText('Descrição: This is a test description')).toBeTruthy();
    expect(getByText('Visualizações: 11')).toBeTruthy(); // Views should increment
    expect(getByText('Likes: 5')).toBeTruthy();
  });

  it('increments view count on load', async () => {
    render(<VideoDetailScreen />);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/videos/1');
      expect(api.patch).toHaveBeenCalledWith('/videos/1', { views: 11 });
    });
  });

  it('increments like count when like button is pressed', async () => {
    const { getByText } = render(<VideoDetailScreen />);

    await waitFor(() => expect(getByText('Likes: 5')).toBeTruthy());

    const likeButton = getByText('Curtir');
    fireEvent.press(likeButton);

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/videos/1', { likes: 6 });
      expect(getByText('Likes: 6')).toBeTruthy();
    });
  });
});
