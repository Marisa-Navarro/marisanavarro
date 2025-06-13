interface PortfolioItem {
  id: number;
  imgurl: string;
  category: string;
  type: 'image' | 'video';
  title: string;
  created_at: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    imgurl: 'https://res.cloudinary.com/deq6qm96r/image/upload/v1749404018/1_1_ycnu44.jpg',
    category: 'Formaciones y Seminarios',
    type: 'image',
    title: 'Advanced Coloring Seminar',
    created_at: '2023-10-26T10:00:00Z',
  },
  {
    id: 2,
    imgurl: 'https://www.youtube.com/watch?v=a_r_f4E-mfg',
    category: 'Directos',
    type: 'video',
    title: '',
    created_at: '2023-11-15T18:30:00Z',
  },
  {
    id: 3,
    imgurl: 'https://res.cloudinary.com/deq6qm96r/image/upload/v1749404018/3_jzx2ap.jpg',
    category: 'Material educativo',
    type: 'image',
    title: 'Styling Guide for Curly Hair',
    created_at: '2023-11-20T12:00:00Z',
  },
  {
    id: 4,
    imgurl: 'https://www.youtube.com/watch?v=oX0AJh4DREI',
    category: 'Eventos',
    type: 'video',
    title: 'Highlights from Hair Expo 2023',
    created_at: '2023-12-05T15:00:00Z',
  },
  {
    id: 5,
    imgurl: 'https://res.cloudinary.com/deq6qm96r/image/upload/v1749404018/2_of8oia.jpg',
    category: 'Formaciones y Seminarios',
    type: 'image',
    title: 'Updo & Bridal Hair Workshop',
    created_at: '2024-01-10T09:00:00Z',
  },
  {
    id: 6,
    imgurl: 'https://www.youtube.com/watch?v=a-R2k6V4k2s',
    category: 'Directos',
    type: 'video',
    title: 'Live Session: Cutting Techniques',
    created_at: '2024-02-02T20:00:00Z',
  },
]; 