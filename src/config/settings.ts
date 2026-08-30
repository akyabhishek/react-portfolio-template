// Settings Configuration

export const settings = {
  // Set this to false to hide the "Available for opportunities" badge
  showAvailableForOpportunities: false,
  quoteSection: false,

  // Experience section settings
  experience: {
    showAnimations: true,
    showGlowingEffect: true,
    showCompanyLogos: true,
  },

  // About section settings
  about: {
    showHighlights: false,
    showStats: true,
    compactMode: false,
  },

  // Hero section settings
  hero: {
    // "tubes" = Three.js tubes | "aether" = particle network | "none" = plain
    backgroundType: "aether" as "tubes" | "aether" | "none",
  },

  // Dev Tools section settings
  devTools: {
    showDescriptions: true,
    enableSearch: true,
  },
};
