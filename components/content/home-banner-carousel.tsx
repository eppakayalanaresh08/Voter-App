'use client';

import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import type { FieldContentBanner } from '@/lib/field-content-shared';

export default function HomeBannerCarousel({ banners }: { banners: FieldContentBanner[] }) {
  const slides = banners.filter((banner) => banner.enabled);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setActive((previous) => (previous + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const slide = slides[active] ?? banners[0];

  if (!slide) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 6,
        minHeight: 220,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#0b57d0'
      }}
    >
      {slides.map((item, index) => (
        <Box
          key={`${item.id ?? 'home'}-${index}`}
          component="img"
          src={item.imageUrl ?? '/icons/icon-512.png'}
          alt={item.title || 'Banner'}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: active === index ? 1 : 0,
            transition: 'opacity 900ms ease'
          }}
        />
      ))}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(11,87,208,0.12) 0%, rgba(8,21,43,0.78) 100%)'
        }}
      />

      <Stack
        spacing={1.25}
        sx={{
          position: 'relative',
          zIndex: 1,
          justifyContent: 'flex-end',
          minHeight: 220,
          p: 2.25,
          color: '#ffffff'
        }}
      >
        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.78)' }}>
          Campaign Banner
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff' }}>
          {slide.title}
        </Typography>
        <Typography variant="body2" sx={{ maxWidth: 320, color: 'rgba(255,255,255,0.84)' }}>
          {slide.subtitle}
        </Typography>
        {slides.length > 1 && (
          <Stack direction="row" spacing={1} sx={{ pt: 0.25 }}>
            {slides.map((item, index) => (
              <Box
                key={`${item.id ?? 'indicator'}-${index}`}
                sx={{
                  width: active === index ? 18 : 7,
                  height: 7,
                  borderRadius: 999,
                  backgroundColor: active === index ? '#ffffff' : 'rgba(255,255,255,0.42)',
                  transition: 'all 200ms ease'
                }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
