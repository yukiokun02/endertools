
/**
 * API integration utilities for Minecraft resource pack tools
 */

import JSZip from 'jszip';
import { createHash } from 'crypto-browserify';

// Resource Pack Merger
export const mergeResourcePacks = async (file1: File, file2: File): Promise<Blob> => {
  // Frontend implementation that works without a backend
  try {
    // Load the resource packs
    const zip1 = await JSZip.loadAsync(file1);
    const zip2 = await JSZip.loadAsync(file2);
    
    // Create new merged zip
    const mergedZip = new JSZip();
    
    // Add files from first pack
    for (const path in zip1.files) {
      if (!zip1.files[path].dir) {
        const content = await zip1.files[path].async('arraybuffer');
        mergedZip.file(path, content);
      } else {
        // Create directory structure
        mergedZip.folder(path);
      }
    }
    
    // Add files from second pack (overwriting duplicates)
    for (const path in zip2.files) {
      if (!zip2.files[path].dir) {
        const content = await zip2.files[path].async('arraybuffer');
        mergedZip.file(path, content);
      } else if (!mergedZip.files[path]) {
        // Create directory structure if it doesn't exist
        mergedZip.folder(path);
      }
    }
    
    // Generate merged zip
    return await mergedZip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9 // Best compression
      }
    });
  } catch (error) {
    console.error('Error merging resource packs:', error);
    throw new Error('Failed to merge resource packs. Please ensure both files are valid Minecraft resource packs.');
  }
};

// Download Link Generator
export const generateDownloadLink = async (file: File): Promise<string> => {
  // Frontend implementation that works without a backend
  try {
    // In a real backend implementation, you would upload this to your server
    // and return a permanent URL. For now we'll use object URLs that work
    // for the current session.
    const objectUrl = URL.createObjectURL(file);
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add warning about URL expiration
    console.info('Warning: This URL will only be valid for the current browser session.');
    
    return objectUrl;
  } catch (error) {
    console.error('Error generating download link:', error);
    throw new Error('Failed to generate download link. Please try again.');
  }
};

// SHA-1 Hash Generator
export const generateSHA1Hash = async (file: File): Promise<string> => {
  // Frontend implementation that works without a backend
  try {
    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Calculate SHA-1 hash using crypto-browserify
    const hash = createHash('sha1');
    hash.update(buffer);
    const sha1Hash = hash.digest('hex');
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return sha1Hash;
  } catch (error) {
    console.error('Error generating SHA-1 hash:', error);
    throw new Error('Failed to generate SHA-1 hash. Please try again.');
  }
};
