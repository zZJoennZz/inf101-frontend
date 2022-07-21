import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { PlusIcon, TrashIcon, FolderOpenIcon } from "@heroicons/react/solid";

import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

const ManageDiscounts = () => {
  let [pageMode, setPageMode] = React.useState("listPage");
  let [pageReload, setPageReload] = React.useState(0);
  let [selectedDiscount, setSelectedDiscount] = React.useState(0);
  let [discountList, setDiscountList] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    const getDiscounts = () => {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      axios
        .get(`${process.env.REACT_APP_API_URL}discount`, config)
        .then((res) => isMounted && setDiscountList(res.data.data));
    };

    getDiscounts();

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
          Manage discounts{" "}
          <button
            onClick={() => setPageMode("addPage")}
            className="ml-2 border border-cyan-600 rounded-full font-bold text-cyan-600"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <DiscountList
          reloadAfterDelete={() => setPageReload(pageReload + 1)}
          selDiscountId={(discountId) => {
            setSelectedDiscount(discountId);
            setPageMode("editPage");
          }}
          data={discountList}
        />
      </div>
    );
  } else if (pageMode === "addPage") {
    return <AddDiscount goBack={() => setPageMode("listPage")} />;
  } else if (pageMode === "editPage") {
    return (
      <EditDiscount
        discountId={selectedDiscount}
        goBack={() => setPageMode("listPage")}
      />
    );
  }
};

const DiscountList = ({ reloadAfterDelete, data, selDiscountId }) => {
  const delDiscount = async (discountId) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this discount? This will affect the visits that references this discount."
    );

    if (confirmDelete) {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      await axios
        .delete(
          `${process.env.REACT_APP_API_URL}discount/${discountId}`,
          config
        )
        .then((res) => alert(res.data.message));

      reloadAfterDelete();
    }
  };
  return data.map((discount) => (
    <div
      key={discount.id}
      className="bg-gray-100 mb-3 rounded-xl px-4 p-3 items-center border border-gray-100 hover:border hover:border-slate-400"
    >
      <button
        onClick={() => delDiscount(discount.id)}
        className="float-right bg-red-700 border border-red-700 text-white px-1 md:p-1 rounded-md"
      >
        <TrashIcon className="h-8 w-8 md:w-4 md:h-4" />
      </button>
      <button
        onClick={() => selDiscountId(discount.id)}
        className="mr-3 float-right text-cyan-700 border border-cyan-700 font-bold px-1 rounded-md"
      >
        <FolderOpenIcon className="h-8 w-8 md:w-4 md:h-4 inline-block" />{" "}
        <span className="text-sm hidden md:inline-block">Open</span>
      </button>
      <div className="text-md font-bold">{discount.discount_name}</div>
      <div className="text-sm hidden md:block">
        {discount.discount_amount}
        {parseInt(discount.discount_type) === 1 ? "%" : "PHP"}{" "}
      </div>
    </div>
  ));
};

const AddDiscount = ({ goBack }) => {
  const [frmData, setFrmData] = React.useState({
    discount_name: "",
    discount_type: 0,
    discount_amount: 0,
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
      .post(`${process.env.REACT_APP_API_URL}discount`, frmData, config)
      .then((res) => {
        alert(res.data.message);
        setFrmData({
          discount_name: "",
          discount_type: 0,
          discount_amount: 0,
        });
      })
      .catch((err) => {
        alert(err);
        setFrmData({
          discount_name: "",
          discount_type: 0,
          discount_amount: 0,
        });
      });

    goBack();
  };

  return (
    <div className="flex-col">
      <div>
        <form onSubmit={frmSubmit}>
          <div className="items-center mb-5">
            <label htmlFor="discount_name" className="form-label-required">
              Discount Name
            </label>
            <input
              type="text"
              name="discount_name"
              id="discount_name"
              className="form-input-text"
              placeholder="Enter discount name"
              defaultValue={frmData.discount_name}
              onChange={textOnChange}
              required
            />
          </div>

          <div className="items-center mb-5">
            <label htmlFor="discount_type" className="form-label-required">
              Discount Type
            </label>
            <select
              type="text"
              name="discount_type"
              id="discount_type"
              className="form-input-text text-gray-400 text-base focus:text-gray-700"
              defaultValue={frmData.discount_type}
              onChange={textOnChange}
              required
            >
              <option value={0}>Select</option>
              <option value={1}>Percentage</option>
              <option value={2}>Fixed Amount</option>
            </select>
          </div>

          <div className="items-center mb-5">
            <label htmlFor="discount_amount" className="form-label-required">
              Discount Amount
            </label>
            <input
              type="text"
              name="discount_amount"
              id="discount_amount"
              className="form-input-text"
              placeholder="Enter discount amount"
              defaultValue={frmData.discount}
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

const EditDiscount = ({ goBack, discountId }) => {
  const [frmData, setFrmData] = React.useState({
    discount_name: "",
    discount_type: 0,
    discount_amount: 0,
  });

  React.useEffect(() => {
    let isMounted = true;

    const getDiscounts = async () => {
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };

      axios
        .get(`${process.env.REACT_APP_API_URL}discount/${discountId}`, config)
        .then(
          (res) =>
            isMounted &&
            setFrmData({
              discount_name: res.data.data.discount_name,
              discount_type: res.data.data.discount_type,
              discount_amount: res.data.data.discount_amount,
            })
        );
    };

    getDiscounts();

    return () => {
      isMounted = false;
    };
  }, [discountId]);

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
      .put(
        `${process.env.REACT_APP_API_URL}discount/${discountId}`,
        frmData,
        config
      )
      .then((res) => {
        alert(res.data.message);
        setFrmData({
          discount_name: "",
          discount_type: 0,
          discount_amount: 0,
        });
      })
      .catch((err) => {
        alert(err);
        setFrmData({
          discount_name: "",
          discount_type: 0,
          discount_amount: 0,
        });
      });

    goBack();
  };

  return (
    <div className="flex-col">
      <div>
        <form onSubmit={frmSubmit}>
          <div className="items-center mb-5">
            <label htmlFor="discount_name" className="form-label-required">
              Discount Name
            </label>
            <input
              type="text"
              name="discount_name"
              id="discount_name"
              className="form-input-text"
              placeholder="Enter discount name"
              defaultValue={frmData.discount_name}
              onChange={textOnChange}
              required
            />
          </div>

          <div className="items-center mb-5">
            <label htmlFor="discount_type" className="form-label-required">
              Discount Type
            </label>
            <select
              type="text"
              name="discount_type"
              id="discount_type"
              className="form-input-text text-gray-400 text-base focus:text-gray-700"
              onChange={textOnChange}
              value={frmData.discount_type}
              required
            >
              <option value="0">Select</option>
              <option value="1">Percentage</option>
              <option value="2">Fixed Amount</option>
            </select>
          </div>

          <div className="items-center mb-5">
            <label htmlFor="discount_amount" className="form-label-required">
              Discount Amount
            </label>
            <input
              type="text"
              name="discount_amount"
              id="discount_amount"
              className="form-input-text"
              placeholder="Enter discount amount"
              value={frmData.discount_amount}
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

export default ManageDiscounts;
