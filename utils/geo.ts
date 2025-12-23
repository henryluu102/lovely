
import { Coordinates } from '../types';

/**
 * Calculates the distance between two points in km using Haversine formula
 */
export const calculateDistance = (p1: Coordinates, p2: Coordinates): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lng - p1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const formatDistance = (dist: number): string => {
  if (dist < 1) {
    return `${Math.round(dist * 1000)}m`;
  }
  return `${dist.toFixed(1)}km`;
};
