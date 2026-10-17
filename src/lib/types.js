/**
 * @file Data Model & Type Definitions for Shelters and Programme Categories (JavaScript/JSDoc)
 */

/**
 * Shelter Category identifiers supported by Helping Hearts.
 * @typedef {'long-term' | 'mid-term' | 'livelihood'} ShelterCategory
 */

/**
 * @typedef {Object} ImpactMetric
 * @property {string} label - Human-readable metric title (e.g. 'Residents Supported')
 * @property {string} value - Quantified figure (e.g. '150+')
 * @property {string} [subtext] - Contextual detail
 */

/**
 * Programme Category details structure
 * @typedef {Object} ProgrammeCategory
 * @property {ShelterCategory} id - Unique category identifier ('long-term' | 'mid-term' | 'livelihood')
 * @property {string} slug - Route slug matching category id
 * @property {string} title - Full display title (e.g. 'Long-Term Shelters')
 * @property {string} shortTitle - Compact label (e.g. 'Long-Term')
 * @property {string} badge - Eyebrow label (e.g. 'Permanent & Palliative Care')
 * @property {string} tagline - One-line mission summary
 * @property {string} icon - FontAwesome icon class
 * @property {'blue' | 'red' | 'emerald'} tone - Accent theme
 * @property {string} image - Representative photography asset
 * @property {string} imageAlt - Accessible image description
 * @property {string} overview - Narrative description of this shelter tier
 * @property {string[]} objectives - Core strategic goals
 * @property {string} whoItSupports - Beneficiary eligibility & target demographics
 * @property {ImpactMetric[]} impactMetrics - Key operational figures
 */

/**
 * Shelter document structure stored in Firestore and normalized for UI rendering
 * @typedef {Object} Shelter
 * @property {string} id - Firestore document ID
 * @property {string} name - Shelter name (e.g. 'Anbalayam Shelter')
 * @property {ShelterCategory} category - Mandatory category: 'long-term' | 'mid-term' | 'livelihood'
 * @property {string} address - Physical location address
 * @property {any} description - Rich text ProseMirror document or plain text
 * @property {string|number|null} [capacity] - Resident capacity figure (e.g. 45 or '45')
 * @property {string} capacityIcon - FontAwesome icon class for capacity
 * @property {string|null} [mapUrl] - Google Maps navigation link
 * @property {string[]} images - Cloudinary/hosted photo gallery URLs
 * @property {string|null} image - Primary cover image URL
 * @property {'blue' | 'red'} tone - Visual accent tone
 * @property {number} sortKey - Milliseconds timestamp for ordering
 * @property {Date|null} [createdAt] - Creation timestamp
 * @property {Date|null} [updatedAt] - Last updated timestamp
 */

export const SHELTER_CATEGORIES = {
  LONG_TERM: 'long-term',
  MID_TERM: 'mid-term',
  LIVELIHOOD: 'livelihood',
};
