/**
 * CYNX Folio — Global Configuration & Tuning Tokens
 * Adjust intensity: 'calm' | 'normal' | 'intense'
 */
export const config = {
  intensity: 'normal', // 'calm' | 'normal' | 'intense'

  theme: {
    bg: '#0A0508',
    surface: '#130A0F',
    crimson: '#E5063F',
    brightCrimson: '#FF2D63',
    deepMaroon: '#7A0628',
    ivory: '#F5EEF1',
    muted: '#BDB2B7',
    lightGrayShard: '#B8B0B3',
  },

  // 3D Shards settings per tier & intensity
  shards: {
    calm: {
      count: 28,
      speed: 0.4,
      mouseInfluence: 0.25,
      glitchRate: 0.02,
    },
    normal: {
      count: 48,
      speed: 0.8,
      mouseInfluence: 0.6,
      glitchRate: 0.08,
    },
    intense: {
      count: 72,
      speed: 1.3,
      mouseInfluence: 1.1,
      glitchRate: 0.18,
    },
  },
};
