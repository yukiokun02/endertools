
import { Buffer } from 'buffer';

// Fix for "global is not defined" error
window.global = window;

// Make Buffer available globally
window.Buffer = Buffer;

// Add additional polyfills for crypto functionality
if (typeof window.process === 'undefined') {
  window.process = { env: {} } as any;
}
