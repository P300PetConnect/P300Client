interface MyObject {
    latlong1: string;
    latlong2: string;
    deg2rad(deg: number): number;
  }
  
  export function distanceInKm(this: MyObject): number {
    console.log(this.latlong2);
    var l1 = this.latlong1.split(',').map(Number);
    var l2 = this.latlong2.split(',').map(Number);
    let lat1 = l1[0]; 
    let lon1 = l1[1];
    let lat2 = l2[0];
    let lon2 = l2[1];
    const earthRadiusKm = 6371; // radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
  
      const dLon = this.deg2rad(lon2 - lon1);
    
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = earthRadiusKm * c;
    
      return distance;
    }