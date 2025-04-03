// import fs from 'fs';

// interface Airport {
//     icao: string;
//     iata: string | null;
//     name: string;
//     city: string;
//     state: string;
//     country: string;
//     elevation: number;
//     lat: number;
//     lon: number;
//     tz: string;
// }
// interface AirportData {
//     [key: string]: Airport;
//   }
  
// export const cleanAirportsData = (data: AirportData) => {
//     const cleanedData : any = {};
    
//     Object.values(data).forEach(airport => {
//         const key = airport!.iata! || airport!.icao; // Use IATA if available, otherwise ICAO
//         if (key) {
//             cleanedData[key] = {
//                 name: airport!.name!,
//                 state: airport!.state!
//             };
//         }
//     });
//     fs.writeFileSync('cleaned_airports.json', JSON.stringify(cleanedData, null, 2));
//     console.log('Cleaned data saved to cleaned_airports.json');

    
//     return cleanedData;
// }