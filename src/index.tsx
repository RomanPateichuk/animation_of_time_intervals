import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@styles/_global.scss';

import { App } from '@components';
import React from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
