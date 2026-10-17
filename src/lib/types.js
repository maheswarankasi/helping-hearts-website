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
 * @typedef {Object} ProgrammeFacility
 * @property {string} name - Name of the shelter or centre model (e.g. 'Rehabilitation Home for People with Mental Illness')
 * @property {string} description - Description extracted from the programme report
 * @property {string[]} locations - List of locations where these centres are operated
 */

/**
 * Programme Category details structure
 * @typedef {Object} ProgrammeCategory
 * @property {ShelterCategory} id - Unique category identifier ('long-term' | 'mid-term' | 'livelihood')
 * @property {string} slug - Route slug matching category id
 * @property {string} title - Full display title matching report (e.g. 'Long Term Residential & Dignified Care')
 * @property {string} shortTitle - Compact label (e.g. 'Long-Term')
 * @property {string} badge - Eyebrow label from report
 * @property {string} tagline - Exact mission statement / introduction from PDF
 * @property {string} icon - FontAwesome icon class
 * @property {'blue' | 'red' | 'emerald'} tone - Accent theme
 * @property {string} image - Representative photography asset
 * @property {string} imageAlt - Accessible image description
 * @property {string} overview - Comprehensive narrative copy from report
 * @property {ProgrammeFacility[]} [facilities] - Official operational centres and locations
 * @property {string} [reportingSummary] - Report statement for the reporting period
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
 * @property {string|null} [tag] - Optional sub-type tag (e.g. 'Elderly Home')
 * @property {string} address - Physical location address
 * @property {any} description - Rich text ProseMirror document or plain text
 * @property {string|null} [capacity] - Resident capacity string (e.g. '45 Residents')
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
