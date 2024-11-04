import api from './';

export type Video = {
  id: string;
  title: string;
  description: string;
  views: number;
  likes: number;
};

export const getVideos = async (
  page: number,
  perPage: number,
): Promise<Video[]> => {
  const response = await api.get(`/videos?_page=${page}&_limit=${perPage}`);
  return response.data;
};

export const getVideoById = async (id: string): Promise<Video> => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const updateVideo = async (
  id: string,
  data: Partial<Video>,
): Promise<void> => {
  await api.patch(`/videos/${id}`, data);
};
