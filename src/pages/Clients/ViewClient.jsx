import React from "react";
import { useParams, Link } from "react-router-dom";
import imgBg from "../../components/Reports/ct-inf-assets/report_bg.png";
import TextInput from "../../components/FormElements/TextInput";
import { changeDateFormat } from "../../functions/changeDateFormat";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { toast } from "react-toastify";
import axios from "axios";
import ContentLoading from "../../components/ContentLoading";
import {
  PrinterIcon,
  PencilIcon,
  SaveIcon,
  DotsHorizontalIcon,
  XIcon,
} from "@heroicons/react/outline";
import PersonalInformation from "../../components/PersonalInformation";
import { getAge } from "../../functions/getAge";

const ViewClient = () => {
  let [clientDetail, setClientDetail] = React.useState(false);
  let [visits, setVisits] = React.useState(false);
  let [isEditing, setIsEditing] = React.useState(false);
  let [isSaving, setIsSaving] = React.useState(false);
  let [regionsList, setRegionsList] = React.useState(false);
  let [provincesList, setProvincesList] = React.useState(false);
  let [citiesList, setCitiesList] = React.useState(false);
  let [barangaysList, setBarangaysList] = React.useState(false);
  let [updated, setUpdated] = React.useState(false);
  const { clientId } = useParams();
  const onChangeText = async (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setUpdated({ ...updated, [fieldName]: fieldValue });
    switch (fieldName) {
      case "region":
        await provinces(fieldValue).then((province) =>
          setProvincesList(province)
        );
        break;
      case "province":
        await cities(fieldValue).then((cits) => setCitiesList(cits));
        break;
      case "city":
        await barangays(fieldValue).then((bgry) => setBarangaysList(bgry));
        break;
      default:
        break;
    }
  };
  const onSaveChanges = async (e) => {
    setIsSaving(true);
    e.preventDefault();
    let data = new FormData();
    if (isEditing) {
      for (let key of Object.keys(updated)) {
        data.append(key, updated[key]);
        setClientDetail({ ...clientDetail, [key]: updated[key] });
      }
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}client/${clientId}?_method=PUT`,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
              "Allow-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          toast(res.data.message);
          setIsEditing(false);
        })
        .catch((error) => {
          toast(error);
          setIsEditing(false);
        });
    }
  };
  React.useEffect(() => {
    let isSub = true;
    const getClient = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}client/${clientId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
            "Allow-Control-Allow-Origin": "*",
          },
        })
        .then(async (res) => {
          if (isSub) {
            setClientDetail(res.data.data);
            setVisits(res.data.visit);
            regions().then((reg) => setRegionsList(reg));
            await provinces(res.data.data.region).then((province) =>
              setProvincesList(province)
            );
            await cities(res.data.data.province).then((city) =>
              setCitiesList(city)
            );
            await barangays(res.data.data.city).then((barangay) =>
              setBarangaysList(barangay)
            );
            if (isSaving) {
              setIsSaving(false);
            }
          }
        })
        .catch(() => setClientDetail(false));
    };
    getClient();
    return () => (isSub = false);
  }, [clientId, isSaving]);
  let frmFieldClassess = {
    textField:
      "bg-slate-200 mb-1 md:mb-0 w-full p-2 rounded-md border border-slate-200 outline-none focus:bg-white focus:border-slate-400",
  };
  return (
    <div className="p-3">
      <div>
        <Link to="/clients">{"<"} Back</Link>
      </div>
      {!clientDetail && <ContentLoading />}
      {clientDetail && (
        <div className="view-client-inner">
          {isEditing && (
            <form onSubmit={onSaveChanges}>
              <div className="p-1 md:p-3">
                <div className="mb-2">
                  <img
                    src={
                      process.env.REACT_APP_IMG_PATH_URL + clientDetail.image
                    }
                    alt={clientDetail.first_name}
                    className="w-24 h-24 bg-white rounded-md border"
                  />
                </div>

                <div className="p-3 border rounded-md">
                  <div className="float-right">
                    <button
                      type="submit"
                      className="p-2 mr-1 bg-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out"
                    >
                      {isSaving && <DotsHorizontalIcon className="w-5 h-5" />}
                      {!isSaving && <SaveIcon className="w-5 h-5" />}
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-full hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out"
                      onClick={() => setIsEditing(false)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-xs uppercase mb-4">
                    Personal Information{" "}
                    <div className="inline-block bg-cyan-600 p-1 rounded-full text-white">
                      {clientDetail.client_id}
                    </div>
                  </div>
                  <PersonalInformation
                    infoTitle="Client Name"
                    infoValue={
                      <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-1">
                        <div>
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.first_name}
                            className={frmFieldClassess.textField}
                            placeholder="Enter first name"
                            name="first_name"
                            id="first_name"
                          />
                        </div>
                        <div>
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.middle_name}
                            className={frmFieldClassess.textField}
                            placeholder="Enter middle name"
                            name="middle_name"
                            id="middle_name"
                          />
                        </div>
                        <div>
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.last_name}
                            className={frmFieldClassess.textField}
                            name="last_name"
                            id="last_name"
                            placeholder="Enter last name"
                          />
                        </div>
                        <div>
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.suffix}
                            className={frmFieldClassess.textField}
                            placeholder="Enter suffix"
                            name="suffix"
                            id="suffix"
                          />
                        </div>
                      </div>
                    }
                  />
                  <PersonalInformation
                    infoTitle="Gender"
                    infoValue={
                      <select
                        onChange={onChangeText}
                        name="gender"
                        id="gender"
                        className={frmFieldClassess.textField}
                        required
                        defaultValue={clientDetail.gender}
                      >
                        <option value={0}>Select</option>
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                      </select>
                    }
                  />
                  <PersonalInformation
                    infoTitle="Birthday"
                    infoValue={
                      <input
                        onChange={onChangeText}
                        required
                        type="date"
                        defaultValue={clientDetail.birthday}
                        className={frmFieldClassess.textField}
                        name="birthday"
                        id="birthday"
                      />
                    }
                  />

                  <div className="grid grid-cols-1">
                    <PersonalInformation
                      infoTitle="Address"
                      infoValue={
                        <textarea
                          className={frmFieldClassess.textField}
                          name="address"
                          id="address"
                          onChange={onChangeText}
                          defaultValue={clientDetail.address}
                          required
                        />
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1">
                    <PersonalInformation
                      infoTitle="Region"
                      infoValue={
                        regionsList && (
                          <select
                            className={frmFieldClassess.textField}
                            name="region"
                            id="region"
                            onChange={onChangeText}
                            defaultValue={clientDetail.region}
                            required
                          >
                            <option value={0}>Select Region</option>
                            {regionsList.map((d) => (
                              <option key={d.region_code} value={d.region_code}>
                                {d.region_name}
                              </option>
                            ))}
                          </select>
                        )
                      }
                    />
                    <PersonalInformation
                      infoTitle="Province"
                      infoValue={
                        provincesList && (
                          <select
                            className={frmFieldClassess.textField}
                            name="province"
                            id="province"
                            onChange={onChangeText}
                            defaultValue={clientDetail.province}
                            required
                          >
                            <option value={0}>Select Province</option>
                            {provincesList.map((d) => (
                              <option
                                key={d.province_code + d.id}
                                value={d.province_code}
                              >
                                {d.province_name}
                              </option>
                            ))}
                          </select>
                        )
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1">
                    <PersonalInformation
                      infoTitle="City"
                      infoValue={
                        citiesList && (
                          <select
                            className={frmFieldClassess.textField}
                            name="city"
                            id="city"
                            onChange={onChangeText}
                            required
                            defaultValue={clientDetail.city}
                          >
                            <option value={0}>Select City</option>
                            {citiesList.map((d) => (
                              <option
                                key={d.city_code + d.id}
                                value={d.city_code}
                              >
                                {d.city_name}
                              </option>
                            ))}
                          </select>
                        )
                      }
                    />
                    <PersonalInformation
                      infoTitle="Barangay"
                      infoValue={
                        barangaysList && (
                          <select
                            className={frmFieldClassess.textField}
                            name="barangay"
                            id="barangay"
                            onChange={onChangeText}
                            defaultValue={clientDetail.barangay}
                            required
                          >
                            <option value={0}>Select Barangay</option>
                            {barangaysList.map((d) => (
                              <option
                                key={d.brgy_code + d.id}
                                value={d.brgy_code}
                              >
                                {d.brgy_name}
                              </option>
                            ))}
                          </select>
                        )
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1">
                    <div>
                      <PersonalInformation
                        infoTitle="Phone Number"
                        infoValue={
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.contact_number}
                            className={frmFieldClassess.textField}
                            name="contact_number"
                            id="contact_number"
                          />
                        }
                      />
                    </div>
                    <div>
                      <PersonalInformation
                        infoTitle="Email Address"
                        infoValue={
                          <input
                            onChange={onChangeText}
                            required
                            type="email"
                            defaultValue={clientDetail.email_address}
                            className={frmFieldClassess.textField}
                            name="email_address"
                            id="email_address"
                          />
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1">
                    <div>
                      <PersonalInformation
                        infoTitle="Facebook"
                        infoValue={
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.facebook}
                            className={frmFieldClassess.textField}
                            name="facebook"
                            id="facebook"
                          />
                        }
                      />
                    </div>
                    <div>
                      <PersonalInformation
                        infoTitle="Instagram"
                        infoValue={
                          <input
                            onChange={onChangeText}
                            required
                            type="text"
                            defaultValue={clientDetail.instagram}
                            className={frmFieldClassess.textField}
                            name="instagram"
                            id="instagram"
                          />
                        }
                      />
                    </div>
                  </div>

                  <PersonalInformation
                    infoTitle="Maintenance"
                    infoValue={
                      <TextInput
                        onChange={onChangeText}
                        required
                        type="text"
                        defaultValue={clientDetail.maintenance}
                        className={frmFieldClassess.textField}
                        name="maintenance"
                        id="maintenance"
                      />
                    }
                  />
                </div>
              </div>
            </form>
          )}

          {!isEditing && (
            <div className="p-1 md:p-3">
              <div className="mb-2">
                <button
                  className="float-right p-2 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-600 hover:text-slate-200 transition-all ease-in-out"
                  onClick={() => window.print()}
                >
                  <PrinterIcon className="w-7 h-7" />
                </button>
                <img
                  src={process.env.REACT_APP_IMG_PATH_URL + clientDetail.image}
                  alt={clientDetail.first_name}
                  className="w-24 h-24 bg-white rounded-md border"
                />
              </div>

              <div className="p-3 border rounded-md">
                <div className="float-right">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 bg-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs uppercase mb-4">
                  Personal Information{" "}
                  <div className="inline-block bg-cyan-600 p-1 rounded-full text-white">
                    {clientDetail.client_id}
                  </div>
                </div>
                <PersonalInformation
                  infoTitle="Client Name"
                  infoValue={
                    <>
                      {clientDetail.first_name +
                        " " +
                        clientDetail.middle_name +
                        " " +
                        clientDetail.last_name}
                      {clientDetail.suffix === "N/A" ||
                      clientDetail.suffix === "NA"
                        ? ""
                        : ", " + clientDetail.suffix}{" "}
                      {clientDetail.gender === 1 ? (
                        <i
                          className="fas fa-mars"
                          style={{ color: "skyblue" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-venus"
                          style={{ color: "pink" }}
                        ></i>
                      )}
                    </>
                  }
                />
                <PersonalInformation
                  infoTitle="Birthday"
                  infoValue={
                    clientDetail.birthday +
                    " (" +
                    getAge(clientDetail.birthday) +
                    " yrs)"
                  }
                />
                {!isSaving && (
                  <PersonalInformation
                    infoTitle="Full Address"
                    infoValue={
                      !regionsList ||
                      !provincesList ||
                      !citiesList ||
                      !barangaysList
                        ? "Loading..."
                        : clientDetail.address +
                          ", " +
                          barangaysList.filter(
                            (d) => d.brgy_code === clientDetail.barangay
                          )[0].brgy_name +
                          ", " +
                          citiesList.filter(
                            (d) => d.city_code === clientDetail.city
                          )[0].city_name +
                          ", " +
                          provincesList.filter(
                            (d) => d.province_code === clientDetail.province
                          )[0].province_name +
                          ", " +
                          regionsList.filter(
                            (d) => d.region_code === clientDetail.region
                          )[0].region_name
                    }
                  />
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1">
                  <div>
                    <PersonalInformation
                      infoTitle="Phone Number"
                      infoValue={clientDetail.contact_number}
                    />
                  </div>
                  <div>
                    <PersonalInformation
                      infoTitle="Email Address"
                      infoValue={clientDetail.email_address}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1">
                  <div>
                    <PersonalInformation
                      infoTitle="Facebook"
                      infoValue={clientDetail.facebook}
                    />
                  </div>
                  <div>
                    <PersonalInformation
                      infoTitle="Instagram"
                      infoValue={clientDetail.instagram}
                    />
                  </div>
                </div>

                <PersonalInformation
                  infoTitle="Maintenance"
                  infoValue={clientDetail.maintenance}
                />
              </div>
              <div id="section-to-print">
                {!isSaving && (
                  <div>
                    <div
                      style={{
                        height: "29.7cm",
                        width: "21cm",
                        backgroundSize: "cover",
                        backgroundImage: `url('${imgBg}')`,
                        fontFamily: "Exo",
                      }}
                      className="absolute top-0 -left-full print:left-0"
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
                          src={
                            process.env.REACT_APP_IMG_PATH_URL +
                            clientDetail.image
                          }
                          style={{ height: "1in", width: "1in" }}
                        />
                        <div className="text-left grid grid-cols-3 mt-2">
                          <div className="font-bold">Assigned Client ID:</div>
                          <div className="border-b-2 col-span-2 border-black">
                            {clientDetail.client_id}
                          </div>
                        </div>
                        <div className="text-gray-500 mt-2">
                          [To be filled-out by wecollab Representative]
                        </div>
                      </div>

                      <table
                        className="mx-auto text-base w-10/12 mt-10"
                        border="1"
                      >
                        <tbody>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Full Name
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {clientDetail.first_name +
                                  " " +
                                  clientDetail.middle_name +
                                  " " +
                                  clientDetail.last_name}{" "}
                                {clientDetail.suffix === "NA" ||
                                clientDetail.suffix === "N/A" ||
                                clientDetail.suffix === "na" ||
                                clientDetail.suffix === "n/a"
                                  ? ""
                                  : clientDetail.suffix}
                              </div>
                              <div className="text-gray-400">
                                [First Name, Middle Name, Last Name, Suffix]
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Gender
                            </td>
                            <td
                              colSpan={3}
                              className="w-3/3 px-2 border border-black"
                            >
                              <div className="py-3">
                                <div className="print-male mr-3 inline-block">
                                  <input
                                    type="checkbox"
                                    checked={
                                      clientDetail.gender === 1 ? true : false
                                    }
                                    readOnly
                                  />
                                  <span>Male</span>
                                </div>
                                <div className="print-female mr-3 inline-block">
                                  <input
                                    type="checkbox"
                                    checked={
                                      clientDetail.gender === 2 ? true : false
                                    }
                                    readOnly
                                  />
                                  <span>Female</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Birthday
                            </td>
                            <td className="w-2/5 px-2 border border-black">
                              <div className="py-3">
                                {changeDateFormat(clientDetail.birthday)}
                              </div>
                              <div className="text-gray-400">
                                [Month Day, Year]
                              </div>
                            </td>
                            <td className="w-1/6 px-2 border py-3 border-black">
                              Age
                            </td>
                            <td className="w-1/5 px-2 border border-black">
                              {getAge(clientDetail.birthday)}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Address
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {!regionsList ||
                                !provincesList ||
                                !citiesList ||
                                !barangaysList
                                  ? "Loading..."
                                  : clientDetail.address +
                                    ", " +
                                    barangaysList.filter(
                                      (d) =>
                                        d.brgy_code === clientDetail.barangay
                                    )[0].brgy_name +
                                    ", " +
                                    citiesList.filter(
                                      (d) => d.city_code === clientDetail.city
                                    )[0].city_name +
                                    ", " +
                                    provincesList.filter(
                                      (d) =>
                                        d.province_code ===
                                        clientDetail.province
                                    )[0].province_name +
                                    ", " +
                                    regionsList.filter(
                                      (d) =>
                                        d.region_code === clientDetail.region
                                    )[0].region_name +
                                    ", " +
                                    clientDetail.zip_code}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Contact Number
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {clientDetail.contact_number}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              E-mail Address
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {clientDetail.email_address}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Facebook Account
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {clientDetail.facebook}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Instagram Account
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {clientDetail.instagram}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Maintenance or Medications
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black"
                            >
                              <div className="py-3">
                                {clientDetail.maintenance}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/4 px-2 py-3 border border-black">
                              Signature
                            </td>
                            <td
                              colSpan={3}
                              className="w-2/4 px-2 border border-black max-h-10"
                            >
                              <div className="py-3">
                                <img
                                  src={
                                    process.env.REACT_APP_IMG_PATH_URL +
                                    clientDetail.signature
                                  }
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
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {clientDetail && (
        <div className="p-1 md:p-3">
          <div className="p-3 border rounded-md">
            <div className="text-xs uppercase mb-4">Visit Records</div>
            {visits && visits.length === 0 ? (
              <div className="italic text-sm text-slate-400">
                No visit records
              </div>
            ) : (
              ""
            )}
            {visits &&
              visits.map((visit) => (
                <div key={visit.id} className="border-b border-dotted mb-2">
                  <Link to={"/visits/view/" + visit.id}>
                    {visit.visit_date}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewClient;
