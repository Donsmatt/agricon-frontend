import { useEffect, useState, createContext } from "react";

export const FacilityContext = createContext();

export default function FacilityProvider({ children }) {
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFacility() {
      const accessToken  = localStorage.getItem('access_token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNzE4ODUwLCJpYXQiOjE3NTI2ODI4NTAsImp0aSI6IjZiMjZjOTJhMThmNzRjMWNhOGIyZDk1NDVhNmMxN2E5IiwidXNlcl9pZCI6IjRiN2M4NGRmLTFiMTEtNDMwYS1iMDkwLTZjM2UyMzdjNWNlYyIsImVtYWlsIjoiZG9uc21hdHQ0NEBnbWFpbC5jb20iLCJyb2xlIjoiRkFSTUVSIn0.BouF8Seu-Cg7SmZMtEFvPBv4R0g9IPL-ZQ3vTiafri8"
      try {
        const response = await fetch(
          "https://agricon-express-backend.onrender.com/api/v1/facilities?limit=10&page=1&available=true",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const resData = await response.json();
        console.log(resData);

        if (!response.ok) {
          throw new Error("No facilities available");
        }
        console.log(resData);
        setFacilities(
          resData.facilities.map((data) => {
            return {
              id: data.id,
              operatorId: data.operatorId,
              name: data.name,
              location: data.location,
              type: data.type,
              available: data.available,
              capacity: data.capacity,
              contact: data.contact,
              description: data.description,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              pricePerDay: data.pricePerDay,
              facilityImage: data.facilityImage,
            };
          })
        );
      } catch (error) {
        console.error(error.message || "No facility data, using mock data...");
        setError(true);
      }
    }

    fetchFacility();
  }, []);

  return (
    <FacilityContext.Provider value={{ facilities, error }}>
      {children}
    </FacilityContext.Provider>
  );
}
