import React from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { SaveAsIcon, DotsHorizontalIcon } from "@heroicons/react/outline";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { postClient } from "../../functions/apiCalls";

const NewClient = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postClient, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allClients"]);
      toast(data.message);
      closeModal(false);
    },
    onError: (data) => {
      toast(data.message);
    },
  });

  let frmRef = React.useRef(0);

  let [frmData, setFrmData] = React.useState(false);
  let [regionsList, setRegionsList] = React.useState(false);
  let [provincesList, setProvincesList] = React.useState(false);
  let [citiesList, setCitiesList] = React.useState(false);
  let [barangaysList, setBarangaysList] = React.useState(false);

  let [ctImage, setCtImage] = React.useState(false);
  let [ctSig, setCtSig] = React.useState(false);

  const onSubmitFrm = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key of Object.keys(frmData)) {
      data.append(key, frmData[key]);
    }
    data.append("image", ctImage);
    data.append("sig", ctSig);
    mutate(data);

    // await axios
    //   .post(process.env.REACT_APP_API_IMG, imageData)
    //   .then((res) => {
    //     imgPath = res.data.img_url;
    //     sigPath = res.data.sig_url;
    //     let data = new FormData();
    //     for (let key of Object.keys(frmData)) {
    //       data.append(key, frmData[key]);
    //     }
    //     data.append("image", imgPath);
    //     data.append("signature", sigPath);
    //     axios
    //       .post(`${process.env.REACT_APP_API_URL}client`, data, {
    //         headers: {
    //           Authorization: localStorage.getItem("token"),
    //           "Content-Type": "multipart/form-data",
    //           "Allow-Control-Allow-Origin": "*",
    //         },
    //       })
    //       .then((res) => {
    //         toast("Client profile added!");
    //         frmRef.current.reset();
    //         closeModal(false);
    //         setIsSubmit(false);
    //         rerunList();
    //       })
    //       .catch((err) => {
    //         toast(err);
    //         setIsSubmit(false);
    //       });
    //   })
    //   .catch((err) => {
    //     toast(err);
    //     setIsSubmit(false);
    //   });
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
    let isMounted = true;
    regions().then((region) => {
      if (isMounted) {
        setRegionsList(region);
      }
    });
    return () => (isMounted = false);
  }, []);

  let frmFieldClassess = {
    textField:
      "bg-slate-200 mb-1 md:mb-0 w-full p-2 rounded-md border border-slate-200 outline-none focus:bg-white focus:border-slate-400",
  };

  return (
    <div className="p-3">
      <form
        ref={frmRef}
        onSubmit={onSubmitFrm}
        name="new-client-form"
        id="new-client-form"
      >
        <div style={{ maxHeight: "500px" }} className="overflow-y-auto mb-3">
          <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-1 mb-3">
            <div className="form-field">
              <label htmlFor="first_name" className="form-label-required">
                First Name:
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter first name"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="middle_name" className="form-label-required">
                Middle Name:
              </label>
              <input
                type="text"
                name="middle_name"
                id="middle_name"
                placeholder="Enter middle name"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="last_name" className="form-label-required">
                Last Name:
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter last name"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="suffix" className="form-label-required">
                Suffix:
              </label>
              <input
                type="text"
                name="suffix"
                id="suffix"
                placeholder="Enter suffix"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            <div className="form-field">
              <label htmlFor="gender" className="form-label-required">
                Gender:
              </label>
              <select
                name="gender"
                id="gender"
                onChange={onChangeText}
                required
                className={frmFieldClassess.textField}
              >
                {genders.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="birthday" className="form-label-required">
                Birthday:
              </label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                placeholder="Enter middle name"
                className={`p-1.5 ` + frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="form-field">
              <label htmlFor="address" className="form-label-required">
                Address:
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter address"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            {regionsList && (
              <div className="form-field">
                <label htmlFor="region" className="form-label-required">
                  Region:
                </label>
                <select
                  className={frmFieldClassess.textField}
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

            {provincesList && (
              <div className="form-field">
                <label htmlFor="province" className="form-label-required">
                  Province:
                </label>
                <select
                  className={frmFieldClassess.textField}
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            {citiesList && (
              <div className="form-field">
                <label htmlFor="city" className="form-label-required">
                  City:
                </label>
                <select
                  className={frmFieldClassess.textField}
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

            {barangaysList && (
              <div className="form-field">
                <label htmlFor="province" className="form-label-required">
                  Barangay:
                </label>
                <select
                  className={frmFieldClassess.textField}
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            <div className="form-field">
              <label htmlFor="zip_code" className="form-label-required">
                Zip Code:
              </label>
              <input
                type="text"
                name="zip_code"
                id="zip_code"
                placeholder="Enter zip code"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="country" className="form-label-required">
                Country:
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value="Philippines"
                className={frmFieldClassess.textField}
                onChange={onChangeText}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            <div className="form-field">
              <label htmlFor="contact_number" className="form-label-required">
                Contact Number:
              </label>
              <input
                onChange={onChangeText}
                required
                type="text"
                className={frmFieldClassess.textField}
                name="contact_number"
                id="contact_number"
                placeholder="0999 999 9999"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email_address" className="form-label-required">
                Email Address:
              </label>
              <input
                onChange={onChangeText}
                required
                type="email"
                className={frmFieldClassess.textField}
                name="email_address"
                id="email_address"
                placeholder="example@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            <div className="form-field">
              <label htmlFor="facebook" className="form-label-required">
                Facebook:
              </label>
              <input
                onChange={onChangeText}
                required
                type="text"
                className={frmFieldClassess.textField}
                name="facebook"
                id="facebook"
                placeholder="Enter your Facebook username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="instagram" className="form-label-required">
                Instagram:
              </label>
              <input
                onChange={onChangeText}
                required
                type="text"
                className={frmFieldClassess.textField}
                name="instagram"
                id="instagram"
                placeholder="Enter your Instagram username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="form-field">
              <label htmlFor="maintenance" className="form-label-required">
                Maintenance:
              </label>
              <textarea
                onChange={onChangeText}
                required
                type="text"
                className={frmFieldClassess.textField}
                name="maintenance"
                id="maintenance"
                placeholder="Enter client maintenance"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mb-3">
            <div className="form-field">
              <label htmlFor="signature" className="form-label-required">
                Signature:
              </label>
              <input
                type="file"
                onChange={(e) => setCtSig(e.target.files[0])}
                className={frmFieldClassess.textField}
                accept="image/png, image/jpg, image/jpeg"
                name="signature"
                id="signature"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="image" className="form-label-required">
                Image:
              </label>
              <input
                onChange={(e) => setCtImage(e.target.files[0])}
                required
                type="file"
                className={frmFieldClassess.textField}
                name="image"
                id="image"
                accept="image/png, image/jpg, image/jpeg"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className="flex items-center bg-cyan-600 hover:bg-cyan-500 p-2 rounded-md text-white font-bold"
            text={isLoading ? "Loading..." : "Save Profile"}
            name="save_profile"
            id="save_profile"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <DotsHorizontalIcon className="h-5 w-5 mr-2" /> Saving...
              </>
            ) : (
              <>
                <SaveAsIcon className="h-5 w-5 mr-2" /> Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewClient;
