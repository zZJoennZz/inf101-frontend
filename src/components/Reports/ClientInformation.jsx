import React from "react";
import "./ct-inf-assets/style.css";
import bgImg from "./ct-inf-assets/report_bg.png";
import { getAge } from "../../functions/getAge";
import { changeDateFormat } from "../../functions/changeDateFormat";

const ClientInformation = (props) => {
  const { ctDets, fullAddress } = props;
  return (
    <div>
      <div
        style={{
          height: "29.7cm",
          width: "21cm",
          backgroundImage: `url("${bgImg}")`,
          backgroundSize: "cover",
          fontFamily: "Exo",
        }}
        className="absolute top-0 left-0 border border-black"
      >
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
            src={process.env.REACT_APP_IMG_URL + ctDets.image}
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
                    src={process.env.REACT_APP_IMG_URL + ctDets.signature}
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
      {/* <div className="pos" id="_0:0" style={{ top: 0 }}>
        <img
          name="_1170:827"
          src={bgImg}
          height={1170}
          width={827}
          border={0}
          useMap="#Map"
          alt="doc_bg"
        />
      </div>
      <div className="pos" id="_255:188" style={{ top: 188, left: 255 }}>
        <span
          id="_18.6"
          style={{
            fontWeight: "bold",
            fontFamily: "Courier New",
            fontSize: "18.6px",
            color: "#000000",
          }}
        >
          CLIENT PERSONAL INFORMATION
        </span>
      </div>
      <div className="pos" id="_196:209" style={{ top: 209, left: 196 }}>
        <span
          id="_13.3"
          style={{
            fontWeight: "bold",
            fontFamily: "Courier New",
            fontSize: "13.3px",
            color: "#000000",
          }}
        >
          shift101 CHiS (Client Healthcare Information System)
        </span>
      </div>
      <div className="pos" id="_100:242" style={{ top: 242, left: 100 }}>
        <span
          id="_16.4"
          style={{
            fontWeight: "bold",
            fontFamily: "Courier New",
            fontSize: "16.4px",
            color: "#000000",
          }}
        >
          Assigned Client ID: {props.ctDets.client_id}
        </span>
      </div>
      <div className="pos" id="_100:261" style={{ top: 261, left: 100 }}>
        <span
          id="_15.0"
          style={{
            fontFamily: "Courier New",
            fontSize: "15.0px",
            color: "#7f7f7f",
          }}
        >
          (To be filled-out by shift101 Technical/IT Representative)
        </span>
      </div>
      <div className="pos" id="_650:254" style={{ top: 210, left: 620 }}>
        <span
          id="_15.0"
          style={{
            fontWeight: "bold",
            fontFamily: "Courier New",
            fontSize: "15.0px",
            color: "#000000",
          }}
        >
          <img
            src={process.env.REACT_APP_IMG_URL + props.ctDets.image}
            alt={props.ctDets.first_name}
            height="105px"
            width="105px"
          />
        </span>
      </div>
      <div className="pos" id="_100:296" style={{ top: 296, left: 100 }}>
        <span
          id="_16.4"
          style={{
            fontWeight: "bold",
            fontFamily: "Courier New",
            fontSize: "16.4px",
            color: "#000000",
          }}
        >
          Please write in CAPITAL LETTERS.
        </span>
      </div>
      <div className="pos" id="_107:334" style={{ top: 334, left: 107 }}>
        <span
          id="_16.4"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.4px",
            color: "#000000",
          }}
        >
          Full Name
        </span>
      </div>
      <div className="pos" id="_107:334" style={{ top: 334, left: 280 }}>
        <span
          id="_16.4"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.4px",
            color: "#000000",
          }}
        >
          {props.ctDets.first_name} {props.ctDets.middle_name}{" "}
          {props.ctDets.last_name}{" "}
          {props.ctDets.suffix === "N/A" ? "" : props.ctDets.suffix}
        </span>
      </div>
      <div className="pos" id="_270:353" style={{ top: 353, left: 280 }}>
        <span
          id="_16.4"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.4px",
            color: "#a5a5a5",
          }}
        >
          (First Name, Middle Name, Last Name, Suffix)
        </span>
      </div>
      <div className="pos" id="_107:388" style={{ top: 388, left: 107 }}>
        <span
          id="_16.4"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.4px",
            color: "#000000",
          }}
        >
          Gender
        </span>
      </div>
      <div className="pos" id="_270:371" style={{ top: 380, left: 280 }}>
        <span
          id="_30.4"
          style={{
            fontFamily: "Times New Roman",
            fontSize: "30.4px",
            color: "#000000",
          }}
        >
          &nbsp;
          <span
            id="_17.1"
            style={{ fontFamily: "Courier New", fontSize: "17.1px" }}
          >
            {props.ctDets.gender === 1 ? "Male" : "Female"}
          </span>
        </span>
      </div>
      <div className="pos" id="_107:442" style={{ top: 442, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Birthday
        </span>
      </div>

      <div className="pos" id="_107:442" style={{ top: 442, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {changeDateFormat(props.ctDets.birthday)}
        </span>
      </div>

      <div className="pos" id="_538:442" style={{ top: 442, left: 538 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Age
        </span>
      </div>

      <div className="pos" id="_538:442" style={{ top: 442, left: 638 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {getAge(props.ctDets.birthday)}
        </span>
      </div>

      <div className="pos" id="_270:461" style={{ top: 461, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#a5a5a5",
          }}
        >
          (Month Day, Year)
        </span>
      </div>
      <div className="pos" id="_107:500" style={{ top: 500, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Address
        </span>
      </div>

      <div className="pos" id="_107:500" style={{ top: 485, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          <p style={{ maxWidth: "400px" }}>{props.fullAddress}</p>
        </span>
      </div>

      <div className="pos" id="_107:552" style={{ top: 552, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Contact Number
        </span>
      </div>

      <div className="pos" id="_107:552" style={{ top: 552, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {props.ctDets.contact_number}
        </span>
      </div>

      <div className="pos" id="_107:599" style={{ top: 599, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          E-mail Address
        </span>
      </div>

      <div className="pos" id="_107:599" style={{ top: 599, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {props.ctDets.email_address}
        </span>
      </div>

      <div className="pos" id="_107:637" style={{ top: 637, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Facebook
        </span>
      </div>

      <div className="pos" id="_107:656" style={{ top: 656, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Account
        </span>
      </div>

      <div className="pos" id="_107:637" style={{ top: 647, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {props.ctDets.facebook}
        </span>
      </div>

      <div className="pos" id="_107:686" style={{ top: 686, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Instagram
        </span>
      </div>
      <div className="pos" id="_107:705" style={{ top: 705, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Account
        </span>
      </div>

      <div className="pos" id="_107:705" style={{ top: 690, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {props.ctDets.instagram}
        </span>
      </div>

      <div className="pos" id="_107:745" style={{ top: 745, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Maintenance or
        </span>
      </div>
      <div className="pos" id="_107:764" style={{ top: 764, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Medications
        </span>
      </div>

      <div className="pos" id="_107:764" style={{ top: 750, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          {props.ctDets.maintenance}
        </span>
      </div>

      <div className="pos" id="_107:827" style={{ top: 827, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Signature
        </span>
      </div>

      <div className="pos" id="_107:827" style={{ top: 827, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          Signature
        </span>
      </div>

      <div className="pos" id="_270:855" style={{ top: 855, left: 280 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#a5a5a5",
          }}
        >
          (Please sign at the center of the box)
        </span>
      </div>
      <div className="pos" id="_107:875" style={{ top: 875, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          If having difficulty in writing, client may present an
        </span>
      </div>
      <div className="pos" id="_107:894" style={{ top: 894, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          identification card.
        </span>
      </div>
      <div className="pos" id="_107:913" style={{ top: 913, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          ID Presented:
        </span>
      </div>
      <div className="pos" id="_107:932" style={{ top: 932, left: 107 }}>
        <span
          id="_16.3"
          style={{
            fontFamily: "Courier New",
            fontSize: "16.3px",
            color: "#000000",
          }}
        >
          ID Number:
        </span>
      </div> */}
    </div>
  );
};

export default ClientInformation;
