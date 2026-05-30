export const openPdfInNewTab = (fileUrl) => {
  // If it's a data URL, convert it to a blob and use the blob URL directly
  // This works better with the browser's native PDF viewer
  if (fileUrl.startsWith('data:application/pdf')) {
    try {
      // Parse base64 data URL
      const arr = fileUrl.split(',');
      const bstr = atob(arr[1]);
      const n = bstr.length;
      const u8arr = new Uint8Array(n);
      
      for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }
      
      // Create blob and open
      const blob = new Blob([u8arr], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      
      // Clean up after 10 minutes
      setTimeout(() => URL.revokeObjectURL(blobUrl), 600000);
      return;
    } catch (error) {
      console.error('Failed to convert data URL to blob:', error);
      // Fall back to data URL
    }
  }
  
  // For regular URLs, open directly
  window.open(fileUrl, '_blank');
};