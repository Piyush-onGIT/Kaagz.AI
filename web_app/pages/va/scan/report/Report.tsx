import React from "react";
import PropTypes from "prop-types";

// const api_res = {
//   document_type: "Aadhaar Card",
//   name: "Pranjal Naman",
//   dob: "01/03/2002",
//   gender: "Male",
//   aadhaar_number: "5119 6739 0277",
//   isVerified: true,
//   matchedPercentage: "100.00",
//   old_name: "naman",
//   matchedEntry: {
//     document_type: "Aadhaar Card",
//     name: "Pranjal Naman",
//     dob: "01/03/2002",
//     gender: "Male",
//     aadhaar_number: "5119 6739 0277",
//     old_name: "naman",
//   },
// };

const Report = ({ res_api }: any) => {
  const excludeKeys = [
    "document_type",
    "isVerified",
    "matchedPercentage",
    "matchedEntry",
  ];

  // Get the keys that should be displayed dynamically
  console.log(res_api);
  const keysToDisplay = Object.keys(res_api).filter(
    (key) => !excludeKeys.includes(key)
  );
  console.log(keysToDisplay);

  const matchedEntryKeys = Object.keys(res_api.matchedEntry ?? {});

  return (
    <div className="flex mt-16 flex-col items-center justify-center">
      <div className="mb-10 font-bold text-2xl">{res_api.document_type}</div>

      {/* Table for displaying data */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Key</th>
            <th className="border border-gray-300 px-4 py-2">
              Obtained Document
            </th>
            <th className="border border-gray-300 px-4 py-2">Matched Entry</th>
          </tr>
        </thead>
        <tbody>
          {keysToDisplay.map((key) => (
            <tr key={key}>
              <td className="border border-gray-300 px-4 py-2">{key}</td>
              <td className="border border-gray-300 px-4 py-2">
                {res_api[key]}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {res_api.matchedEntry
                  ? res_api.matchedEntry[key]
                  : "No match found"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <div className="flex items-center justify-center gap-3">
          <div
            className={`${
              res_api.isVerified ? "text-green-500" : "text-red-500"
            } border-2 rounded-md m-2 p-2`}
          >
            {res_api.isVerified ? "Verified" : "Not Verified"}
          </div>
          <div className="border-2 rounded-md bg-[#0056b3] m-4 p-2 text-white">
            Matched: {res_api.matchedPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
Report.propTypes = {
  apiRes: PropTypes.shape({
    document_type: PropTypes.string,
    name: PropTypes.string,
    dob: PropTypes.string,
    gender: PropTypes.string,
    aadhaar_number: PropTypes.string,
    isVerified: PropTypes.bool,
    matchedPercentage: PropTypes.string,
    old_name: PropTypes.string,
    matchedEntry: PropTypes.object,
  }),
};

// Default props to handle missing data
Report.defaultProps = {
  apiRes: null,
};

export default Report;
