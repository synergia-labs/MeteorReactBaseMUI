export const acceptableMimeType: Array<MimeType> = [
  'image/jpeg', // JPEG images
  'image/png', // PNG images
  'image/gif', // GIF images
  'image/webp', // WEBP images
  'image/bmp', // BMP images
  'image/svg+xml', // SVG images
  'image/tiff', // TIFF images
  'text/plain', // Plain text
  'text/html', // HTML
  'text/css', // CSS
  'text/csv', // CSV files
  'text/xml', // XML files
  'audio/mpeg', // MP3 audio
  'audio/wav', // WAV audio
  'audio/ogg', // OGG audio
  'audio/aac', // AAC audio
  'video/mp4', // MP4 video
  'video/webm', // WebM video
  'video/ogg', // Ogg video
  'video/mpeg', // MPEG video
  'video/quicktime', // QuickTime video
  'application/pdf', // PDF documents
  'application/msword', // Microsoft Word documents
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Microsoft Word (OpenXML)
  'application/vnd.ms-excel', // Microsoft Excel
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Microsoft Excel (OpenXML)
  'application/zip', // ZIP archives
  'application/x-rar-compressed', // RAR archives
  'application/json' // JSON files
];

export type MimeType =
  | 'image/jpeg' // JPEG images
  | 'image/png' // PNG images
  | 'image/gif' // GIF images
  | 'image/webp' // WEBP images
  | 'image/bmp' // BMP images
  | 'image/svg+xml' // SVG images
  | 'image/tiff' // TIFF images
  | 'text/plain' // Plain text
  | 'text/html' // HTML
  | 'text/css' // CSS
  | 'text/csv' // CSV files
  | 'text/xml' // XML files
  | 'audio/mpeg' // MP3 audio
  | 'audio/wav' // WAV audio
  | 'audio/ogg' // OGG audio
  | 'audio/aac' // AAC audio
  | 'video/mp4' // MP4 video
  | 'video/webm' // WebM video
  | 'video/ogg' // Ogg video
  | 'video/mpeg' // MPEG video
  | 'video/quicktime' // QuickTime video
  | 'application/pdf' // PDF documents
  | 'application/msword' // Microsoft Word documents
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // Microsoft Word (OpenXML)
  | 'application/vnd.ms-excel' // Microsoft Excel
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Microsoft Excel (OpenXML)
  | 'application/zip' // ZIP archives
  | 'application/x-rar-compressed' // RAR archives
  | 'application/json'; // JSON files

export type FilesViewType = 'row' | 'column' | 'grid';
