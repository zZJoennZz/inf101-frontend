import React from "react";
import { Navigate } from "react-router-dom";
import "./clients.scss";

import { toast } from "react-toastify";

//components
import ClientList from "../../components/ClientsList/ClientsList";
import Modal from "../../components/Modal/Modal";
import TextInput from "../../components/FormElements/TextInput";
import DropdownSelect from "../../components/FormElements/Dropdown";
import Button from "../../components/FormElements/Button";

import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import axios from "axios";

const Clients = ({ isAuthenticated }) => {
  let [clientList, setClientList] = React.useState(false);
  let [openModal, setOpenModal] = React.useState(false);

  const deleteCt = async (clientId) => {
    let rusure = window.confirm("Are you sure to delete this profile?");
    try {
      if (rusure) {
        await axios
          .delete(`${process.env.REACT_APP_API_URL}client/${clientId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
              "Allow-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            toast("Client profile successfully deleted!");
            getClients(true);
          })
          .catch((error) => {
            toast("Something went wrong. Please reload and try again.");
          });
      }
    } catch (error) {
      toast("Something went wrong. Please reload and try again.");
    }
  };

  const getClients = async (isSub) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}client`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
          "Allow-Control-Allow-Origin": "*",
        },
      })
      .then((res) => (isSub ? setClientList(res.data.data) : null))
      .catch((err) => (isSub ? setClientList(false) : null));
  };

  React.useEffect(() => {
    let isSub = true;
    getClients(isSub);
    return () => (isSub = false);
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="clients">
          <div className="clients-inner">
            <div className="row">
              <div className="col-9">
                <h1>Clients</h1>
                <h2>Manage your clients</h2>
              </div>
              <div className="col-3">
                <button
                  className="add-client"
                  onClick={() => setOpenModal(!openModal)}
                >
                  <i className="fas fa-plus-square"></i> Add new
                </button>
                <Modal
                  content={
                    <NewClient
                      rerunList={getClients.bind(this, true)}
                      closeModal={(e) => setOpenModal(e)}
                    />
                  }
                  title="Add new client"
                  defaultMode={openModal}
                  onClickToggle={() => setOpenModal(!openModal)}
                />
              </div>
            </div>
            <hr className="divider" />
            <input
              type="text"
              className="clients-search"
              placeholder="Search..."
              style={{ width: "100%" }}
            />
            <div className="row clients-list">
              <div className="col-12">
                {!clientList ? (
                  <>Loading...</>
                ) : (
                  <ClientList
                    data={clientList}
                    deleteClient={deleteCt.bind(this)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NewClient = ({ closeModal, rerunList }) => {
  let frmRef = React.useRef(0);

  let [isSubmit, setIsSubmit] = React.useState(false);
  let [frmData, setFrmData] = React.useState(false);
  let [regionsList, setRegionsList] = React.useState(false);
  let [provincesList, setProvincesList] = React.useState(false);
  let [citiesList, setCitiesList] = React.useState(false);
  let [barangaysList, setBarangaysList] = React.useState(false);

  let [ctImage, setCtImage] = React.useState(false);
  let [ctSig, setCtSig] = React.useState(false);

  const onSubmitFrm = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let imageData = new FormData();
    let imgPath, sigPath;
    imageData.append("image", ctImage);
    imageData.append("sig", ctSig);

    await axios
      .post(process.env.REACT_APP_API_IMG, imageData)
      .then((res) => {
        imgPath = res.data.img_url;
        sigPath = res.data.sig_url;
        let data = new FormData();
        for (var key of Object.keys(frmData)) {
          data.append(key, frmData[key]);
        }
        data.append("image", imgPath);
        data.append("signature", sigPath);
        axios
          .post(`${process.env.REACT_APP_API_URL}client`, data, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
              "Allow-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            toast("Client profile added!");
            frmRef.current.reset();
            closeModal(false);
            setIsSubmit(false);
            rerunList();
          })
          .catch((err) => {
            toast("Something went wrong, please refresh and try again.");
            setIsSubmit(false);
          });
      })
      .catch((err) => {
        toast("Something went wrong, please refresh and try again.");
        setIsSubmit(false);
      });
  };

  const onChangeText = async (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setFrmData({ ...frmData, [fieldName]: fieldValue });

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

  const genders = [
    {
      id: 1,
      label: "Male",
      value: 1,
    },
    {
      id: 2,
      label: "Female",
      value: 2,
    },
  ];

  React.useEffect(() => {
    regions().then((region) => setRegionsList(region));
  }, []);

  return (
    <div className="new-client">
      <form
        ref={frmRef}
        className="new-client-form"
        onSubmit={onSubmitFrm}
        name="new-client-form"
        id="new-client-form"
      >
        <div className="row">
          <div className="col-3 new-client-form-field">
            <TextInput
              inputLabel="First Name:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="first_name"
              id="first_name"
              placeholder="Peter"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-3 new-client-form-field">
            <TextInput
              inputLabel="Middle Name:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="middle_name"
              id="middle_name"
              placeholder="Benjamin"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-3 new-client-form-field">
            <TextInput
              inputLabel="Last Name:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="last_name"
              id="last_name"
              placeholder="Parker"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-3 new-client-form-field">
            <TextInput
              inputLabel="Suffix: (Put N/A if none)"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="suffix"
              id="suffix"
              placeholder="e.g. Jr."
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-5 new-client-form-field">
            <DropdownSelect
              inputLabel="Gender:"
              onChange={onChangeText}
              required
              className="new-client-select"
              name="gender"
              id="gender"
              options={genders}
              style={{ width: "100%" }}
              defaultOption="Select Gender"
            />
          </div>
          <div className="col-7 new-client-form-field">
            <TextInput
              inputLabel="Birthday:"
              onChange={onChangeText}
              required
              type="date"
              className="new-client-text"
              name="birthday"
              id="birthday"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 new-client-form-field">
            <TextInput
              inputLabel="Address:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="address"
              id="address"
              placeholder="20 Ingram St. in Queens"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 new-client-form-field">
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
                    <option key={d.region_code} value={d.region_code}>
                      {d.region_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="col-6 new-client-form-field">
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
                    >
                      {d.province_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-6 new-client-form-field">
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
                    <option key={d.city_code + d.id} value={d.city_code}>
                      {d.city_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="col-6 new-client-form-field">
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
                    <option key={d.brgy_code + d.id} value={d.brgy_code}>
                      {d.brgy_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Zip Code:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="zip_code"
              id="zip_code"
              placeholder="0000"
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Country:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="country"
              id="country"
              value="Philippines"
              style={{ width: "100%" }}
              disabled
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Contact Number:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="contact_number"
              id="contact_number"
              placeholder="0999 999 9999"
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Email Address:"
              onChange={onChangeText}
              required
              type="email"
              className="new-client-text"
              name="email_address"
              id="email_address"
              placeholder="example@example.com"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Facebook:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="facebook"
              id="facebook"
              placeholder="Enter your Facebook username"
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Instagram:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="instagram"
              id="instagram"
              placeholder="Enter your Instagram username"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row new-client-form-field">
          <div className="col-12">
            <TextInput
              inputLabel="Maintenance:"
              onChange={onChangeText}
              required
              type="text"
              className="new-client-text"
              name="maintenance"
              id="maintenance"
              placeholder="Enter client maintenance"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Signature:"
              onChange={(e) => setCtSig(e.target.files[0])}
              required
              type="file"
              className="new-client-text"
              name="signature"
              id="signature"
              style={{ width: "100%" }}
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div className="col-6 new-client-form-field">
            <TextInput
              inputLabel="Image:"
              onChange={(e) => setCtImage(e.target.files[0])}
              required
              type="file"
              className="new-client-text"
              name="image"
              id="image"
              style={{ width: "100%" }}
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Button
              text={isSubmit ? "Loading..." : "Save Profile"}
              name="save_profile"
              id="save_profile"
              icon={isSubmit ? "circle" : "save"}
              type="submit"
              style={{ marginRight: "5px" }}
              disabled={isSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Clients;
