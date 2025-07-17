import Facility from "../../components/infrastructure/Facility";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FacilityContext } from "../../components/infrastructure/FacilityContext";
import { assets } from "../../assets/assets";

export default function FacilityDetails() {
  const { facilities, error } = useContext(FacilityContext);
  const params = useParams();

  const facility = facilities.find((item) => item.id === params.facilityId);
  localStorage.setItem('facilityId', facility.id);

  if (error) {
    return (
      <div className="text-center py-10 text-gray-600">
        Couldn't load facility details. Check your network or retry later
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading facility details...
      </div>
    );
  }
  console.log(facility);
  localStorage.setItem('pricePerDay', facility.pricePerDay)

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        <img
          src={facility.facilityImage[0] || assets.greenhouseImage}
          alt={facility.name}
          className="w-full"
        />
        <div>
          <div className="flex justify-between items-center mb-1.75">
            <h2 className="font-bold text-[1.75rem] text-[#475367]">
              {facility.name}
            </h2>
            <p
              className={`flex justify-center rounded-2xl py-1.5 px-2 text-sm font-medium ${
                facility.available
                  ? "bg-[#154E2426] text-[#19692E]"
                  : "bg-[#FF000026] text-[#A30000]"
              }`}
            >
              {facility.available ? "Available" : "Unavailable"}
            </p>
          </div>
          <p className="text-xl text-[#FFAC00] mb-1.75">{facility.location}</p>
          <p>{facility.description}</p>
        </div>
      </div>

      <Facility facility={facility} />
    </div>
  );
}