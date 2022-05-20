import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";

import TextInput from "../../components/FormElements/TextInput";

import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import { toast } from "react-toastify";

import axios from "axios";

import ClientInformation from "../../components/Reports/ClientInformation";

const ViewClient = ({ isAuthenticated }) => {
  let [clientDetail, setClientDetail] = React.useState(false);

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
        await cities(fieldValue).then((cities) => setCitiesList(cities));
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
      for (var key of Object.keys(updated)) {
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
          toast("Profile changes saved!");
          setIsEditing(false);
          setIsSaving(false);
        })
        .catch((error) => {
          toast("Something went wrong, please refresh and try again.");
          setIsEditing(false);
          setIsSaving(false);
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
        .then((res) => {
          if (isSub) {
            setClientDetail(res.data.data);
            regions().then((region) => setRegionsList(region));
            provinces(res.data.data.region).then((province) =>
              setProvincesList(province)
            );
            cities(res.data.data.province).then((city) => setCitiesList(city));
            barangays(res.data.data.city).then((barangay) =>
              setBarangaysList(barangay)
            );
          }
        })
        .catch((err) => setClientDetail(false));
    };
    getClient();
    return () => (isSub = false);
  }, [clientId]);

  return (
    <div className="view-client">
      {!isAuthenticated ? <Navigate to="/" /> : ""}

      {!clientDetail ? (
        <div className="view-client-inner">Loading...</div>
      ) : (
        <div className="view-client-inner">
          <div className="row">
            <div className="col-12">
              <Link to="/clients">{"<"} Back</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="print-btn" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i>
              </button>
            </div>
          </div>
          {isEditing ? (
            <form onSubmit={onSaveChanges}>
              <div className="row client-info">
                <div className="col-6">
                  <img
                    src={process.env.REACT_APP_IMG_URL + clientDetail.image}
                    alt={clientDetail.first_name}
                    className="client-img client-edit"
                  />
                </div>

                <div className="col-6">
                  <button type="submit" className="edit-btn">
                    {isSaving ? (
                      "..."
                    ) : (
                      <i className="fa-solid fa-floppy-disk"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="row client-info">
                <div className="col-12 client-form-field">
                  <TextInput
                    inputLabel="First Name:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.first_name}
                    className="new-client-text"
                    name="first_name"
                    id="first_name"
                    style={{ width: "100%" }}
                  />
                  <TextInput
                    inputLabel="Middle Name:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.middle_name}
                    className="new-client-text"
                    name="middle_name"
                    id="middle_name"
                    style={{ width: "100%" }}
                  />
                  <TextInput
                    inputLabel="Last Name:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.last_name}
                    className="new-client-text"
                    name="last_name"
                    id="last_name"
                    style={{ width: "100%" }}
                  />
                  <TextInput
                    inputLabel="Suffix:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.suffix}
                    className="new-client-text"
                    name="suffix"
                    id="suffix"
                    style={{ width: "100%" }}
                  />
                  <TextInput
                    inputLabel="Birthday:"
                    onChange={onChangeText}
                    required
                    type="date"
                    defaultValue={clientDetail.birthday}
                    className="new-client-text"
                    name="birthday"
                    id="birthday"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="row client-info">
                <div className="col-6 client-form-field">
                  {regionsList && (
                    <div>
                      <label htmlFor="region">Region:</label>
                      <select
                        className="new-client-text"
                        style={{ width: "100%" }}
                        name="region"
                        id="region"
                        onChange={onChangeText}
                        required
                      >
                        <option value={0}>Select Region</option>
                        {regionsList.map((d) => (
                          <option
                            key={d.region_code}
                            value={d.region_code}
                            selected={
                              clientDetail.region === d.region_code
                                ? true
                                : false
                            }
                          >
                            {d.region_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="col-6 client-form-field">
                  {provincesList && (
                    <div>
                      <label htmlFor="province">Province:</label>
                      <select
                        className="new-client-text"
                        style={{ width: "100%" }}
                        name="province"
                        id="province"
                        onChange={onChangeText}
                        required
                      >
                        <option value={0}>Select Province</option>
                        {provincesList.map((d) => (
                          <option
                            key={d.province_code + d.id}
                            value={d.province_code}
                            selected={
                              clientDetail.province === d.province_code
                                ? true
                                : false
                            }
                          >
                            {d.province_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="row client-info">
                <div className="col-6 client-form-field">
                  {citiesList && (
                    <div>
                      <label htmlFor="city">City:</label>
                      <select
                        className="new-client-text"
                        style={{ width: "100%" }}
                        name="city"
                        id="city"
                        onChange={onChangeText}
                        required
                      >
                        <option value={0}>Select City</option>
                        {citiesList.map((d) => (
                          <option
                            key={d.city_code + d.id}
                            value={d.city_code}
                            selected={
                              clientDetail.city === d.city_code ? true : false
                            }
                          >
                            {d.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="col-6 client-form-field">
                  {barangaysList && (
                    <div>
                      <label htmlFor="province">Barangay:</label>
                      <select
                        className="new-client-text"
                        style={{ width: "100%" }}
                        name="barangay"
                        id="barangay"
                        onChange={onChangeText}
                        required
                      >
                        <option value={0}>Select Barangay</option>
                        {barangaysList.map((d) => (
                          <option
                            key={d.brgy_code + d.id}
                            value={d.brgy_code}
                            selected={
                              clientDetail.barangay === d.brgy_code
                                ? true
                                : false
                            }
                          >
                            {d.brgy_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="row client-info">
                <div className="col-6 client-form-field">
                  <TextInput
                    inputLabel="Contact Number:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.contact_number}
                    className="new-client-text"
                    name="contact_number"
                    id="contact_number"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-6 client-form-field">
                  <TextInput
                    inputLabel="Email Address:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.email_address}
                    className="new-client-text"
                    name="email_address"
                    id="email_address"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="row client-info">
                <div className="col-6 client-form-field">
                  <TextInput
                    inputLabel="Facebook:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.facebook}
                    className="new-client-text"
                    name="facebook"
                    id="facebook"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-6 client-form-field">
                  <TextInput
                    inputLabel="Instagram:"
                    onChange={onChangeText}
                    required
                    type="text"
                    defaultValue={clientDetail.instagram}
                    className="new-client-text"
                    name="instagram"
                    id="instagram"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="row client-info">
                <div className="col-12">
                  <div className="sec-header">Maintenance</div>
                  <div className="client-main-card">
                    <div className="client-main-card-inner">
                      <div className="card-body">
                        <TextInput
                          onChange={onChangeText}
                          required
                          type="text"
                          defaultValue={clientDetail.maintenance}
                          className="new-client-text"
                          name="maintenance"
                          id="maintenance"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="row client-info">
                <div className="col-6">
                  <img
                    src={process.env.REACT_APP_IMG_URL + clientDetail.image}
                    alt={clientDetail.first_name}
                    className="client-img"
                  />
                </div>

                <div className="col-6">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="edit-btn"
                  >
                    <i className="fas fa-user-edit"></i>
                  </button>
                </div>
              </div>
              <div className="row client-info">
                <div className="col-12">
                  <div className="client-name">
                    {clientDetail.first_name +
                      " " +
                      clientDetail.middle_name +
                      " " +
                      clientDetail.last_name}
                    {clientDetail.suffix === "N/A"
                      ? ""
                      : clientDetail.suffix === "NA"
                      ? ""
                      : ", " + clientDetail.suffix}{" "}
                    <span className="client-gender">
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
                      )}{" "}
                      <span className="client-id">
                        {clientDetail.client_id}
                      </span>
                    </span>
                  </div>
                  <div className="client-birthday">{clientDetail.birthday}</div>
                </div>
              </div>

              <div className="row client-info">
                <div className="col-12">
                  <span className="client-address">
                    {!regionsList ||
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
                        )[0].region_name}
                  </span>
                </div>
              </div>

              <div className="row client-info">
                <div className="col-6 client-contact-num">
                  <i className="fas fa-phone"></i> {clientDetail.contact_number}
                </div>
                <div className="col-6 client-email-address">
                  <i className="fas fa-envelope"></i>{" "}
                  {clientDetail.email_address}
                </div>
              </div>

              <div className="row client-info">
                <div className="col-6">
                  <i className="fa-brands fa-facebook"></i>{" "}
                  {clientDetail.facebook}
                </div>
                <div className="col-6">
                  <i className="fa-brands fa-instagram"></i>{" "}
                  {clientDetail.instagram}
                </div>
              </div>

              <div className="row client-info">
                <div className="col-12">
                  <div className="sec-header">Maintenance</div>
                  <div className="client-main-card">
                    <div className="client-main-card-inner">
                      <div className="card-body">
                        {clientDetail.maintenance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="section-to-print" style={{ display: "none" }}>
                <ClientInformation
                  ctDets={clientDetail}
                  fullAddress={
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
                        )[0].region_name +
                        ", " +
                        clientDetail.zip_code
                  }
                />
              </div>
            </>
          )}

          {/* <div className="row records-section">
                            <div className="col-10">
                                <div className="sec-header">
                                    Records
                                </div>
                            </div>
                            <div className="col-2">
                                <Link to={"/clients/records/new/" + clientDetail.clientId}><button className="primary-btn" style={{'float' : 'right'}}>Add New</button></Link>
                            </div>
                        </div> */}
          {/* <div className="row">
                            <div className="col-12">
                                <div className="records-card"><button className="primary-btn" style={{'float' : 'right'}}><i className="fas fa-print"></i></button> <Link to={"/clients/records/" + clientDetail.clientId + "/1"}><button className="primary-btn" style={{'float' : 'right'}}>Open</button></Link>
                                    <div className="records-card-service">myTherapy</div>
                                    <div className="records-card-date"><span className="records-card-date-text">Treatment/Reading Date:</span> December 12, 2021</div>
                                </div>
                            </div>
                        </div> */}
        </div>
      )}
    </div>
  );
};

export default ViewClient;
