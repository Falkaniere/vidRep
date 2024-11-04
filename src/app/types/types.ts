export type Site = {
  id: string;
  title: string;
  domain: string;
};

export type Category = {
  id: string;
  title: string;
  site_id: number;
};

export type Video = {
  id: string;
  title: string;
  created_at: string;
  category: number;
  hls_path: string;
  description?: string;
  thumbnail: string;
  site_id: number;
  views: number;
  likes: number;
};

export type Data = {
  sites: Site[];
  categories: Category[];
  videos: Video[];
};
