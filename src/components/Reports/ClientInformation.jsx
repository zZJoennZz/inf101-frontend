import React from "react";
import "./ct-inf-assets/style.css";
import { getAge } from "../../functions/getAge";
import { changeDateFormat } from "../../functions/changeDateFormat";
import imgBg from "../../components/Reports/ct-inf-assets/report_bg.png";

const ClientInformation = (props) => {
  const { ctDets, fullAddress } = props;
  return (
    <div>
      <div
        style={{
          height: "29.7cm",
          width: "21cm",
          backgroundSize: "cover",
          backgroundImage: `url('${imgBg}')`,
          fontFamily: "Exo",
        }}
        className="absolute top-0 left-0"
      >
        {/* bg-client-info */}
        <div className="w-10/12 mx-auto">
          <div className="text-center text-2xl font-bold mt-48">
            CLIENT PERSONAL INFORMATION
            <div className="text-base">
              shift101 CHiS [Client Healthcare Information System]
            </div>
          </div>
          <img
            alt="client"
            className="float-right border-2 border-black"
            src={ctDets.image}
            style={{ height: "1in", width: "1in" }}
          />
          <div className="text-left grid grid-cols-3 mt-2">
            <div className="font-bold">Assigned Client ID:</div>
            <div className="border-b-2 col-span-2 border-black">
              {ctDets.client_id}
            </div>
          </div>
          <div className="text-gray-500 mt-2">
            [To be filled-out by wecollab Representative]
          </div>
        </div>

        <table className="mx-auto text-base w-10/12 mt-10" border="1">
          <tbody>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">Full Name</td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">
                  {ctDets.first_name +
                    " " +
                    ctDets.middle_name +
                    " " +
                    ctDets.last_name}{" "}
                  {ctDets.suffix === "NA" ||
                  ctDets.suffix === "N/A" ||
                  ctDets.suffix === "na" ||
                  ctDets.suffix === "n/a"
                    ? ""
                    : ctDets.suffix}
                </div>
                <div className="text-gray-400">
                  [First Name, Middle Name, Last Name, Suffix]
                </div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">Gender</td>
              <td colSpan={3} className="w-3/3 px-2 border border-black">
                <div className="py-3">
                  <div className="print-male mr-3 inline-block">
                    <input
                      type="checkbox"
                      checked={ctDets.gender === 1 ? true : false}
                      readOnly
                    />
                    <span>Male</span>
                  </div>
                  <div className="print-female mr-3 inline-block">
                    <input
                      type="checkbox"
                      checked={ctDets.gender === 2 ? true : false}
                      readOnly
                    />
                    <span>Female</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">Full Name</td>
              <td className="w-2/5 px-2 border border-black">
                <div className="py-3">{changeDateFormat(ctDets.birthday)}</div>
                <div className="text-gray-400">[Month Day, Year]</div>
              </td>
              <td className="w-1/6 px-2 border py-3 border-black">Age</td>
              <td className="w-1/5 px-2 border border-black">
                {getAge(ctDets.birthday)}
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">Address</td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">{fullAddress}</div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">
                Contact Number
              </td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">{ctDets.contact_number}</div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">
                E-mail Address
              </td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">{ctDets.email_address}</div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">
                Facebook Account
              </td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">{ctDets.facebook}</div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">
                Instagram Account
              </td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">{ctDets.instagram}</div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">
                Maintenance or Medications
              </td>
              <td colSpan={3} className="w-2/4 px-2 border border-black">
                <div className="py-3">{ctDets.maintenance}</div>
              </td>
            </tr>
            <tr>
              <td className="w-1/4 px-2 py-3 border border-black">Signature</td>
              <td
                colSpan={3}
                className="w-2/4 px-2 border border-black max-h-10"
              >
                <div className="py-3">
                  <img
                    src={ctDets.signature}
                    className="mx-auto h-10"
                    alt="signature"
                  />
                </div>
                <div className="text-gray-400">
                  [Please sign at the center of the box]
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientInformation;
