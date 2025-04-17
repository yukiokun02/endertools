
/**
 * API integration utilities for Minecraft resource pack tools
 */

import JSZip from 'jszip';
import { createHash } from 'crypto-browserify';

// Resource Pack Merger
export const mergeResourcePacks = async (file1: File, file2: File): Promise<Blob> => {
  // Frontend implementation that works without a backend
  // This will be replaced with your actual backend call
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
      }
    }
    
    // Add files from second pack (overwriting duplicates)
    for (const path in zip2.files) {
      if (!zip2.files[path].dir) {
        const content = await zip2.files[path].async('arraybuffer');
        mergedZip.file(path, content);
      }
    }
    
    // Generate merged zip
    return await mergedZip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE'
    });
  } catch (error) {
    console.error('Error merging resource packs:', error);
    throw new Error('Failed to merge resource packs. Please ensure both files are valid Minecraft resource packs.');
  }
};

// Download Link Generator
export const generateDownloadLink = async (file: File): Promise<string> => {
  // Frontend implementation that works without a backend
  // This creates a temporary object URL that will be valid during the session
  // In production, replace with your backend API call
  try {
    // In a real implementation, you would upload this to your server
    // and return a permanent URL
    const objectUrl = URL.createObjectURL(file);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return the temporary URL (this will only work during the current session)
    // Replace this with your actual API endpoint in production
    return objectUrl;
  } catch (error) {
    console.error('Error generating download link:', error);
    throw new Error('Failed to generate download link. Please try again.');
  }
};

// SHA-1 Hash Generator
export const generateSHA1Hash = async (file: File): Promise<string> => {
  // Frontend implementation that works without a backend
  // This will be replaced with your actual backend call
  try {
    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Calculate SHA-1 hash using crypto-browserify
    const hash = createHash('sha1');
    hash.update(buffer);
    const sha1Hash = hash.digest('hex');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return sha1Hash;
  } catch (error) {
    console.error('Error generating SHA-1 hash:', error);
    throw new Error('Failed to generate SHA-1 hash. Please try again.');
  }
};
