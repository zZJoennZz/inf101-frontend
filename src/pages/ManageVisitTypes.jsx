import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { PlusIcon, FolderOpenIcon } from "@heroicons/react/solid";

import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

const ManageVisitTypes = () => {
  let [pageMode, setPageMode] = React.useState("listPage");
  let [pageReload, setPageReload] = React.useState(0);
  let [selectedVisitType, setSelectedVisitType] = React.useState(0);
  let [visitTypeList, setVisitTypeList] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    const getVisitType = () => {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      axios
        .get(`${process.env.REACT_APP_API_URL}visit_type`, config)
        .then(
          (res) =>
            isMounted && setVisitTypeList(res.data.data ? res.data.data : [])
        );
    };

    getVisitType();

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
          Manage visit types{" "}
          <button
            onClick={() => setPageMode("addPage")}
            className="ml-2 border border-cyan-600 rounded-full font-bold text-cyan-600"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <VisitTypeList
          reloadAfterDelete={() => setPageReload(pageReload + 1)}
          selVisitTypeId={(visitTypeId) => {
            setSelectedVisitType(visitTypeId);
            setPageMode("editPage");
          }}
          data={visitTypeList}
        />
      </div>
    );
  } else if (pageMode === "addPage") {
    return <AddVisitType goBack={() => setPageMode("listPage")} />;
  } else if (pageMode === "editPage") {
    return (
      <EditVisitType
        visitTypeId={selectedVisitType}
        goBack={() => setPageMode("listPage")}
      />
    );
  }
};

const VisitTypeList = ({ reloadAfterDelete, data, selVisitTypeId }) => {
  // const delVisitType = async (visitTypeId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure to delete this visit type? This will affect the visits that references this visit type."
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
  //       .delete(
  //         `${process.env.REACT_APP_API_URL}visit_type/${visitTypeId}`,
  //         config
  //       )
  //       .then((res) => alert(res.data.message));

  //     reloadAfterDelete();
  //   }
  // };
  return data.map((visit_type) => (
    <div
      key={visit_type.id}
      className="bg-gray-100 mb-3 rounded-xl px-4 p-3 items-center border border-gray-100 hover:border hover:border-slate-400"
    >
      {/* <button
        onClick={() => delVisitType(visit_type.id)}
        className="float-right bg-red-700 border border-red-700 text-white px-1 md:p-1 rounded-md"
      >
        <TrashIcon className="h-8 w-8 md:w-4 md:h-4" />
      </button> */}
      <button
        onClick={() => selVisitTypeId(visit_type.id)}
        className="mr-3 float-right text-cyan-700 border border-cyan-700 font-bold px-1 rounded-md"
      >
        <FolderOpenIcon className="h-8 w-8 md:w-4 md:h-4 inline-block" />{" "}
        <span className="text-sm hidden md:inline-block">Open</span>
      </button>
      <div className="text-md font-bold">{visit_type.type_name} </div>
    </div>
  ));
};

const AddVisitType = ({ goBack }) => {
  const [frmData, setFrmData] = React.useState({
    type_name: "",
  });

  const textOnChange = (e) =>
    setFrmData({ ...frmData, [e.target.name]: e.target.value });

  const frmSubmit = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL}visit_type`, frmData, config)
      .then((res) => {
        alert(res.data.message);
        setFrmData({
          type_name: "",
        });
      })
      .catch((err) => {
        alert(err);
        setFrmData({
          type_name: "",
        });
      });

    goBack();
  };

  return (
    <div className="flex-col">
      <div>
        <form onSubmit={frmSubmit}>
          <div className="items-center mb-5">
            <label htmlFor="type_name" className="form-label-required">
              Type Name
            </label>
            <input
              type="text"
              name="type_name"
              id="type_name"
              className="form-input-text"
              placeholder="Enter service name"
              defaultValue={frmData.type_name}
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

const EditVisitType = ({ goBack, visitTypeId }) => {
  const [frmData, setFrmData] = React.useState({
    type_name: "",
  });

  React.useEffect(() => {
    let isMounted = true;

    const getVisitType = async () => {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      axios
        .get(
          `${process.env.REACT_APP_API_URL}visit_type/${visitTypeId}`,
          config
        )
        .then(
          (res) =>
            isMounted &&
            setFrmData({
              type_name: res.data.data.type_name,
            })
        );
    };

    getVisitType();

    return () => {
      isMounted = false;
    };
  }, [visitTypeId]);

  const textOnChange = (e) =>
    setFrmData({ ...frmData, [e.target.name]: e.target.value });

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
      type_name: frmData.type_name,
    };

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}visit_type/${visitTypeId}`,
        data,
        config
      )
      .then((res) => {
        alert(res.data.message);
        setFrmData({
          type_name: "",
        });
      })
      .catch((err) => {
        alert(err);
        setFrmData({
          visit_type: "",
        });
      });

    goBack();
  };

  return (
    <div className="flex-col">
      <div>
        <form onSubmit={frmSubmit}>
          <div className="items-center mb-5">
            <label htmlFor="type_name" className="form-label-required">
              Type Name
            </label>
            <input
              type="text"
              name="type_name"
              id="type_name"
              className="form-input-text"
              placeholder="Enter service name"
              defaultValue={frmData.type_name}
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

export default ManageVisitTypes;
