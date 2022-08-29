import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import {
  PlusIcon,
  FolderOpenIcon,
  CheckCircleIcon,
  BanIcon,
} from "@heroicons/react/solid";

import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

const ManageServices = () => {
  let [pageMode, setPageMode] = React.useState("listPage");
  let [pageReload, setPageReload] = React.useState(0);
  let [selectedService, setSelectedService] = React.useState(0);
  let [serviceList, setServiceList] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    const getServices = () => {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      axios
        .get(`${process.env.REACT_APP_API_URL}service`, config)
        .then(
          (res) =>
            isMounted && setServiceList(res.data.data ? res.data.data : [])
        );
    };

    getServices();

    return () => {
      isMounted = false;
    };
  }, [pageMode, pageReload]);

  if (pageMode === "listPage") {
    return (
      <div>
        <div className="text-lg mb-3">
          <Link to="/manage-objects">
            <ArrowCircleLeftIcon className="h-7 w-7" />
          </Link>
        </div>
        <div className="text-xl font-bold mb-4 items-center">
          Manage services{" "}
          <button
            onClick={() => setPageMode("addPage")}
            className="ml-2 border border-cyan-600 rounded-full font-bold text-cyan-600"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <ServicesList
          reloadAfterDelete={() => setPageReload(pageReload + 1)}
          selServiceId={(serviceId) => {
            setSelectedService(serviceId);
            setPageMode("editPage");
          }}
          data={serviceList}
        />
      </div>
    );
  } else if (pageMode === "addPage") {
    return <AddService goBack={() => setPageMode("listPage")} />;
  } else if (pageMode === "editPage") {
    return (
      <EditService
        serviceId={selectedService}
        goBack={() => setPageMode("listPage")}
      />
    );
  }
};

const ServicesList = ({ reloadAfterDelete, data, selServiceId }) => {
  // const delService = async (serviceId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure to delete this service? This will affect the visits that references this service."
  //   );

  //   if (confirmDelete) {
  //     let config = {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //         "Allow-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     await axios
  //       .delete(`${process.env.REACT_APP_API_URL}service/${serviceId}`, config)
  //       .then((res) => alert(res.data.message));

  //     reloadAfterDelete();
  //   }
  // };
  return data.map((service) => (
    <div
      key={service.id}
      className="bg-gray-100 mb-3 rounded-xl px-4 p-3 items-center border border-gray-100 hover:border hover:border-slate-400"
    >
      {/* <button
        onClick={() => delService(service.id)}
        className="float-right bg-red-700 border border-red-700 text-white px-1 md:p-1 rounded-md"
      >
        <TrashIcon className="h-8 w-8 md:w-4 md:h-4" />
      </button> */}
      <button
        onClick={() => selServiceId(service.id)}
        className="mr-3 float-right text-cyan-700 border border-cyan-700 font-bold px-1 rounded-md"
      >
        <FolderOpenIcon className="h-8 w-8 md:w-4 md:h-4 inline-block" />{" "}
        <span className="text-sm hidden md:inline-block">Open</span>
      </button>
      <div className="text-md font-bold">
        {service.service_name}{" "}
        {service.availability === 1 ? (
          <CheckCircleIcon className="w-4 h-4 inline-block text-green-600 ml-1" />
        ) : (
          <BanIcon className="w-4 h-4 inline-block text-red-600 ml-1" />
        )}
      </div>
      <div className="text-sm hidden md:block">
        {service.service_description}
      </div>
    </div>
  ));
};

const AddService = ({ goBack }) => {
  const [frmData, setFrmData] = React.useState({
    service_name: "",
    service_description: "",
    availability: false,
    not_available_text: "",
    price: "",
  });

  const textOnChange = (e) =>
    setFrmData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const frmSubmit = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    let data = {
      service_name: frmData.service_name,
      service_description: frmData.service_description,
      availability: frmData.availability ? 1 : 0,
      not_available_text: frmData.availability
        ? frmData.not_available_text
        : "n/a",
      price: frmData.price,
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL}service`, data, config)
      .then((res) => {
        alert(res.data.message);
        setFrmData({
          service_name: "",
          service_description: "",
          availability: false,
          not_available_text: "",
          price: "",
        });
      })
      .catch((err) => {
        alert(err);
        setFrmData({
          service_name: "",
          service_description: "",
          availability: false,
          not_available_text: "",
          price: "",
        });
      });

    goBack();
  };

  return (
    <div className="flex-col">
      <div>
        <form onSubmit={frmSubmit}>
          <div className="items-center mb-5">
            <label htmlFor="service_name" className="form-label-required">
              Service Name
            </label>
            <input
              type="text"
              name="service_name"
              id="service_name"
              className="form-input-text"
              placeholder="Enter service name"
              defaultValue={frmData.service_name}
              onChange={textOnChange}
              required
            />
          </div>

          <div className="items-center mb-5">
            <label
              htmlFor="service_description"
              className="form-label-required"
            >
              Service Description
            </label>
            <textarea
              type="text"
              name="service_description"
              id="service_description"
              className="form-input-text"
              placeholder="Enter service name"
              defaultValue={frmData.service_description}
              onChange={textOnChange}
              required
            />
          </div>

          <div className="items-center mb-5">
            <p className="form-label">Availability</p>
            <label
              htmlFor="availability"
              className="flex items-center cursor-pointer relative"
            >
              <input
                type="checkbox"
                id="availability"
                name="availability"
                className="sr-only"
                defaultChecked={frmData.availability}
                onChange={() =>
                  setFrmData((prev) => {
                    return {
                      ...prev,
                      availability: !frmData.availability,
                    };
                  })
                }
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
            </label>
          </div>

          <div
            className={`items-center mb-5 ${
              frmData.availability ? "hidden" : "block"
            }`}
          >
            <label htmlFor="not_available_text" className="form-label">
              Enter why the service is unavailable
            </label>
            <input
              type="text"
              name="not_available_text"
              id="not_available_text"
              className="form-input-text"
              placeholder="Enter reason why the service is unavailable"
              defaultValue={frmData.not_available_text}
              onChange={textOnChange}
            />
          </div>

          <div className="items-center mb-5">
            <label htmlFor="price" className="form-label-required">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              className="form-input-text"
              placeholder="Enter the price"
              defaultValue={frmData.price}
              onChange={textOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="font-bold bg-cyan-700 text-white py-2 px-3 rounded-md border border-cyan-700 hover:border-cyan-500 hover:bg-cyan-500 active:scale-95 my-2"
          >
            Submit
          </button>
          <button
            onClick={goBack}
            className="font-bold bg-white border border-red-700 text-red-700 py-2 px-3 rounded-md m-2 hover:bg-red-700 hover:text-white active:scale-95"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const EditService = ({ goBack, serviceId }) => {
  const [frmData, setFrmData] = React.useState({
    service_name: "",
    service_description: "",
    availability: false,
    not_available_text: "",
    price: "",
  });

  React.useEffect(() => {
    let isMounted = true;

    const getService = async () => {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      axios
        .get(`${process.env.REACT_APP_API_URL}service/${serviceId}`, config)
        .then(
          (res) =>
            isMounted &&
            setFrmData({
              service_name: res.data.data.service_name,
              service_description: res.data.data.service_description,
              availability: res.data.data.availability === 1 ? true : false,
              not_available_text: res.data.data.not_available_text,
              price: res.data.data.price,
            })
        );
    };

    getService();

    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  const textOnChange = (e) =>
    setFrmData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const frmSubmit = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    let data = {
      service_name: frmData.service_name,
      service_description: frmData.service_description,
      availability: frmData.availability ? 1 : 0,
      not_available_text: frmData.availability
        ? frmData.not_available_text
        : "n/a",
      price: frmData.price,
    };

    await axios
      .put(`${process.env.REACT_APP_API_URL}service/${serviceId}`, data, config)
      .then((res) => {
        alert(res.data.message);
        setFrmData({
          service_name: "",
          service_description: "",
          availability: false,
          not_available_text: "",
          price: "",
        });
      })
      .catch((err) => {
        alert(err);
        setFrmData({
          service_name: "",
          service_description: "",
          availability: false,
          not_available_text: "",
          price: "",
        });
      });

    goBack();
  };

  return (
    <div className="flex-col">
      <div>
        <form onSubmit={frmSubmit}>
          <div className="items-center mb-5">
            <label htmlFor="service_name" className="form-label-required">
              Service Name
            </label>
            <input
              type="text"
              name="service_name"
              id="service_name"
              className="form-input-text"
              placeholder="Enter service name"
              defaultValue={frmData.service_name}
              onChange={textOnChange}
              required
            />
          </div>

          <div className="items-center mb-5">
            <label
              htmlFor="service_description"
              className="form-label-required"
            >
              Service Description
            </label>
            <textarea
              type="text"
              name="service_description"
              id="service_description"
              className="form-input-text"
              placeholder="Enter service name"
              defaultValue={frmData.service_description}
              onChange={textOnChange}
              required
            />
          </div>

          <div className="items-center mb-5">
            <p className="form-label">Availability</p>
            <label
              htmlFor="availability"
              className="flex items-center cursor-pointer relative"
            >
              <input
                type="checkbox"
                id="availability"
                name="availability"
                className="sr-only"
                checked={frmData.availability}
                onChange={() =>
                  setFrmData((prev) => {
                    return {
                      ...prev,
                      availability: !frmData.availability,
                    };
                  })
                }
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
            </label>
          </div>

          <div
            className={`items-center mb-5 ${
              frmData.availability ? "hidden" : "block"
            }`}
          >
            <label htmlFor="not_available_text" className="form-label">
              Enter why the service is unavailable
            </label>
            <input
              type="text"
              name="not_available_text"
              id="not_available_text"
              className="form-input-text"
              placeholder="Enter reason why the service is unavailable"
              defaultValue={frmData.not_available_text}
              onChange={textOnChange}
            />
          </div>

          <div className="items-center mb-5">
            <label htmlFor="price" className="form-label-required">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              className="form-input-text"
              placeholder="Enter the price"
              defaultValue={frmData.price}
              onChange={textOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="font-bold bg-cyan-700 text-white py-2 px-3 rounded-md border border-cyan-700 hover:border-cyan-500 hover:bg-cyan-500 active:scale-95 my-2"
          >
            Save Changes
          </button>
          <button
            onClick={goBack}
            className="font-bold bg-white border border-red-700 text-red-700 py-2 px-3 rounded-md m-2 hover:bg-red-700 hover:text-white active:scale-95"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageServices;
