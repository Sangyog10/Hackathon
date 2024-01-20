

const calculateLength=(lat1, lon1, lat2, lon2)=> {
    const parsedLat1 = parseFloat(lat1);
    const parsedLon1 = parseFloat(lon1);
    const parsedLat2 = parseFloat(lat2);
    const parsedLon2 = parseFloat(lon2);
    const radius = 6371000;
    const dlat = radians(parsedLat2 - parsedLat1);
    const dlon = radians(parsedLon2 - parsedLon1);
  
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(radians(parsedLat1)) * Math.cos(radians(parsedLat2)) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }
  function radians(degrees) {
    return degrees * (Math.PI / 180);
  }

  module.exports={calculateLength}
