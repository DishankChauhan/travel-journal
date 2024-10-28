export function convertCoordinates(input: string): { latitude: number, longitude: number } | null {
    // Regular expression to match the coordinate format
    const regex = /(\d+(?:\.\d+)?)°\s*([NS])\s*,\s*(\d+(?:\.\d+)?)°\s*([EW])/i;
    const match = input.match(regex);
  
    if (match) {
      const [, latDegrees, latDirection, lonDegrees, lonDirection] = match;
      
      let latitude = parseFloat(latDegrees);
      let longitude = parseFloat(lonDegrees);
  
      if (latDirection.toUpperCase() === 'S') {
        latitude = -latitude;
      }
  
      if (lonDirection.toUpperCase() === 'W') {
        longitude = -longitude;
      }
  
      return { latitude, longitude };
    }
  
    return null;
  }