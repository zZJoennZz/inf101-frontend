import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import "./visits.scss";

import { toast } from "react-toastify";

//components
import VisitsList from "../../components/VisitsList/VisitsList";
import Modal from "../../components/Modal/Modal";
import TextInput from "../../components/FormElements/TextInput";
import CheckBox from "../../components/FormElements/CheckBox";
import Button from "../../components/FormElements/Button";
import DropdownSelect from "../../components/FormElements/Dropdown";

const Visits = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <VisitsContent />;
};

const VisitsContent = () => {
  let [openModal, setOpenModal] = React.useState(false);
  let [visitList, setVisitList] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;

    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}visit`, config)
      .then((res) => {
        if (isMounted) setVisitList(res.data.data);
      })
      .catch((err) => {
        if (isMounted) setVisitList([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="visits">
      <div className="visits-inner">
        <div className="row">
          <div className="col-9">
            <h1>Visits</h1>
            <h2>Manage client visits</h2>
          </div>
          <div className="col-3">
            <button
              className="add-visit"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="fas fa-plus-square"></i> Add new
            </button>
            <Modal
              content={<AddNewVisit closeModal={(e) => setOpenModal(e)} />}
              title="Add new visit"
              defaultMode={openModal}
              onClickToggle={() => setOpenModal(!openModal)}
            />
          </div>
        </div>
        <hr className="divider" />
        <input type="text" className="clients-search" placeholder="Search..." />
        <div className="row clients-list">
          <div className="col-12">
            {visitList === undefined || visitList.length === 0 ? (
              "Loading..."
            ) : (
              <VisitsList data={visitList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddNewVisit = () => {
  let visitForm = React.useRef();
  let [frmData, setFrmData] = React.useState([]);
  let [selectedCt, setSelectedCt] = React.useState("");
  let [selectedServices, setSelectedServices] = React.useState([]);
  let [currTotal, setCurrTotal] = React.useState(0);

  //form field data
  let [servicesList, setServicesList] = React.useState([]);
  let [visitType, setVisitType] = React.useState([]);
  let [discountList, setDiscountList] = React.useState([]);
  let [userList, setUserList] = React.useState([]);

  const selectClient = (clientId, fullName) => {
    setFrmData({ ...frmData, client_id: clientId });
    setSelectedCt(fullName);
  };

  const removeArr = (arr, value) => {
    return arr.filter((ele) => {
      return ele !== value;
    });
  };

  const servicesCheck = (e) => {
    let price = e.target.getAttribute("data-amount");
    if (!e.target.checked) {
      let currServices = removeArr(selectedServices, e.target.value);
      setSelectedServices(currServices);
      setCurrTotal(parseFloat(currTotal) - parseFloat(price));
    } else {
      setSelectedServices([...selectedServices, e.target.value]);
      setCurrTotal(parseFloat(currTotal) + parseFloat(price));
    }
  };

  const onChangeText = (e) =>
    setFrmData({
      ...frmData,
      [e.target.name]: e.target.value,
    });

  const getSubTotal = () => {
    let total = currTotal;
    let visitTypeFee = frmData.visit_type_fee;
    let selDiscountType = frmData.discount_type;
    let discList = discountList;
    let returnValue = total;
    let toAdd = 0;
    let toMinus = 0;

    if (visitTypeFee !== undefined) {
      if (
        visitTypeFee !== undefined ||
        visitTypeFee !== 0 ||
        visitTypeFee !== "" ||
        visitTypeFee !== null
      ) {
        toAdd = visitTypeFee;
      }
    }

    if (selDiscountType !== undefined) {
      if (
        selDiscountType !== undefined ||
        parseInt(selDiscountType) !== 0 ||
        selDiscountType !== "" ||
        selDiscountType !== null
      ) {
        if (parseInt(selDiscountType) === 7) {
          toMinus = frmData.discount_others || 0;
        } else {
          let discType = discList.filter((disc) => {
            return parseInt(disc.id) === parseInt(selDiscountType);
          });

          toMinus = discType[0].discount_amount;

          if (parseInt(discType[0].discount_type) === 1) {
            toMinus =
              parseFloat(returnValue) *
              parseFloat(parseFloat(discType[0].discount_amount) / 100);
          }
        }
      }
    }
    returnValue += parseFloat(toAdd);
    returnValue -= parseFloat(toMinus);

    return (
      <div>
        <div>Services: {total}</div>
        <div>Discount: ({toMinus})</div>
        <div>Fees: {toAdd}</div>
        <div>
          <strong>Total:</strong> {returnValue}
        </div>
      </div>
    );
  };

  const saveVisit = async (e) => {
    e.preventDefault();
    let data = {
      frmData,
      selectedServices,
    };
    let config = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch(`${process.env.REACT_APP_API_URL}visit`, config).then(
      (response) => {
        response.json();
        toast("Visit successfully recorded!");
        visitForm.current.reset();
      }
    );
  };

  React.useEffect(() => {
    let isMounted = true;

    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    axios.get(`${process.env.REACT_APP_API_URL}service`, config).then((res) => {
      if (isMounted) setServicesList(res.data.data);
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}visit_type`, config)
      .then((res) => {
        if (isMounted) setVisitType(res.data.data);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}discount`, config)
      .then((res) => {
        if (isMounted) setDiscountList(res.data.data);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}users_list`, config)
      .then((res) => {
        if (isMounted) setUserList(res.data.data);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="new-visit">
      <form ref={visitForm} onSubmit={saveVisit}>
        <div className="row form-group-row">
          <div className="col-12">
            Select client:
            <SearchClient selectClient={selectClient} />
          </div>
        </div>
        <div className="row form-group-row">
          <div className="col-12">
            <strong>Selected Client:</strong> {selectedCt}
          </div>
        </div>
        <div className="row form-group-row">
          <div className="col-4 new-visit-form-field">
            <TextInput
              inputLabel="Visit Date:"
              onChange={onChangeText}
              required
              type="date"
              className="new-visit-text"
              name="visit_date"
              id="visit_date"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-4 new-visit-form-field">
            <TextInput
              inputLabel="Time in:"
              onChange={onChangeText}
              required
              type="time"
              className="new-visit-text"
              name="time_in"
              id="time_in"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-4 new-visit-form-field">
            <TextInput
              inputLabel="Time out:"
              onChange={onChangeText}
              required
              type="time"
              className="new-visit-text"
              name="time_out"
              id="time_out"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row form-group-row">
          <div className="col-6 new-visit-form-field">
            <div>
              <label>Service:</label>
            </div>
            {servicesList.length >= 1
              ? servicesList.map((d) => {
                  return (
                    <CheckBox
                      key={d.id}
                      inputLabel={
                        d.service_name +
                        " " +
                        (parseInt(d.availability) === 1
                          ? ""
                          : "(" + d.not_available_text + ")")
                      }
                      value={d.id}
                      onChange={servicesCheck.bind(this)}
                      disabled={parseInt(d.availability) === 1 ? false : true}
                      data-amount={d.price}
                    />
                  );
                })
              : ""}
          </div>
          <div className="col-6 new-visit-form-field">
            {visitType !== undefined ? (
              <DropdownSelect
                inputLabel="Visit Type"
                options={visitType}
                id="visit_type"
                name="visit_type"
                defaultOption="Select"
                onChange={onChangeText}
              />
            ) : (
              ""
            )}
            <TextInput
              inputLabel="Visit type fee:"
              onChange={(e) => {
                setFrmData({ ...frmData, [e.target.name]: e.target.value });
              }}
              required
              type="text"
              className="new-visit-text"
              name="visit_type_fee"
              id="visit_type_fee"
              style={{ width: "100%" }}
            />
            {discountList !== undefined || discountList === [] ? (
              <div style={{ width: "100%" }}>
                <label htmlFor="discount_type">Discount Type:</label>
                <select
                  style={{ maxWidth: "250px" }}
                  name="discount_type"
                  id="discount_type"
                  onChange={onChangeText}
                >
                  <option value={0}>Select</option>
                  {discountList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.discount_name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
            {parseInt(frmData.discount_type) === 7 ? (
              <TextInput
                inputLabel="Custom Discount:"
                onChange={onChangeText}
                required
                type="text"
                className="new-visit-text"
                name="discount_others"
                id="discount_others"
                style={{ width: "100%" }}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Total:</label>
          </div>
          <div>{getSubTotal()}</div>
        </div>
        <div className="row form-group-row">
          <div className="col-6 new-visit-form-field">
            {userList !== undefined || userList === [] ? (
              <div style={{ width: "100%" }}>
                <label htmlFor="hd_representative">
                  shift101 HD Representative:
                </label>
                <select
                  style={{ width: "100%" }}
                  name="hd_representative"
                  id="hd_representative"
                  onChange={onChangeText}
                >
                  <option value={0}>Select</option>
                  {userList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.first_name + " " + d.last_name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="col-6 new-visit-form-field">
            {userList !== undefined || userList === [] ? (
              <div style={{ width: "100%" }}>
                <label htmlFor="wc_representative">
                  wecollab Representative:
                </label>
                <select
                  style={{ width: "100%" }}
                  name="wc_representative"
                  id="wc_representative"
                  onChange={onChangeText}
                >
                  <option value={0}>Select</option>
                  {userList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.first_name + " " + d.last_name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row form-group-row">
          <div className="col-12 new-visit-form-field">
            <Button type="submit" text="Save Visit" icon="save" />
          </div>
        </div>
      </form>
    </div>
  );
};

const SearchClient = ({ selectClient }) => {
  let [searchCt, setSearchCt] = React.useState("");
  let [searchRes, setSearchRes] = React.useState([]);

  const runSearchCt = async () => {
    let data = {
      search_query: searchCt,
    };
    let config = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(
      `${process.env.REACT_APP_API_URL}search_client`,
      config
    ).then((response) => response.json());
    setSearchRes(res.data);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter name or client ID"
          onChange={(e) => setSearchCt(e.target.value)}
        />{" "}
        <Button type="button" onClick={runSearchCt} text="Search" />
      </div>
      <div>
        <ul style={{ listStylePosition: "inside" }}>
          {searchRes.length <= 0
            ? ""
            : searchRes.map((d) => (
                <li
                  style={{ cursor: "pointer" }}
                  key={d.id}
                  onClick={selectClient.bind(
                    this,
                    d.id,
                    d.first_name + " " + d.middle_name + " " + d.last_name
                  )}
                >
                  ({d.client_id}){" "}
                  {d.first_name + " " + d.middle_name + " " + d.last_name}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Visits;
