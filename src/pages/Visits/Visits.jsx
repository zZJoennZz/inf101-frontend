import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
//components
import VisitsList from "../../components/VisitsList/VisitsList";
import ContentLoading from "../../components/ContentLoading";
import Modal from "../../components/Modal";
//icons
import { PlusIcon, SearchIcon, SaveIcon } from "@heroicons/react/solid";
//api
import { postVisit } from "../../functions/apiCalls";

const Visits = () => {
  return <VisitsContent />;
};

const VisitsContent = () => {
  let [openModal, setOpenModal] = React.useState(false);
  let [visitList, setVisitList] = React.useState([]);
  let [loading, setLoading] = React.useState(false);
  let [reloadPage, setReloadPage] = React.useState(0);
  let [searchTxt, setSearchTxt] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
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
        if (isMounted) {
          setVisitList(res.data.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setVisitList([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [reloadPage]);

  return (
    <div className="w-full">
      <div className="p-2">
        <div className="mb-3">
          <Modal
            isOpen={openModal}
            content={
              <AddNewVisit
                runReload={() => setReloadPage(reloadPage + 1)}
                closeModal={(e) => setOpenModal(e)}
              />
            }
            title="Add new visit"
            closeModal={() => setOpenModal(!openModal)}
            btnClass="float-right flex items-center text-gray-700 border border-gray-700 p-3 rounded-full hover:bg-cyan-700 hover:border-cyan-700 hover:text-white"
            btnText={
              <>
                <PlusIcon className="inline-block w-5 h-5 md:mr-2" /> Add new
              </>
            }
          />
          <h1 className="text-2xl font-bold text-teal-700">Visits</h1>
          <p className="italic">Manage client visits</p>
        </div>

        <div className="flex items-center p-2 md:p-4 bg-gray-100 rounded-full mb-5">
          <SearchIcon className="w-8 h-8 text-gray-400" />
          <input
            type="text"
            className="w-full border-none outline-none p-2 bg-transparent"
            placeholder="Search..."
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </div>

        <div className="row clients-list">
          <div className="col-12">
            {loading ? (
              <ContentLoading />
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto mx-auto min-w-full">
                  <thead className="text-left border-b">
                    <tr>
                      <th className="w-3/12 pb-2 text-sm uppercase">
                        Visit Detail
                      </th>
                      <th className="w-7/12 pb-2 text-sm uppercase">Client</th>
                      <th className="w-2/12 pb-2 text-sm uppercase">
                        Controls
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <VisitsList
                      filterText={searchTxt}
                      data={visitList}
                      runReload={() => setReloadPage(reloadPage + 1)}
                    />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddNewVisit = ({ runReload, closeModal }) => {
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
    postVisit(data)
      .then((res) => {
        toast(res.message);
        visitForm.current.reset();
        runReload();
        closeModal(false);
      })
      .catch((error) => {
        toast(error.data.message);
      });
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
    <div className="p-4">
      <div className="border-b">
        <div className="mb-2 text-sm">Search for the client who visited:</div>
        <SearchClient selectClient={selectClient} />
      </div>
      <div className="px-2 pt-2 text-slate-400 italic text-sm">
        Selected client:
      </div>
      <div className="px-4 font-bold text-2xl mb-3">
        {selectedCt === "" ? "Select first!" : selectedCt}
      </div>
      <form
        ref={visitForm}
        onSubmit={saveVisit}
        className={selectedCt === "" ? "hidden" : "block"}
      >
        <div className="overflow-y-scroll h-72 w-full mb-3 border p-3 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 space-x-1">
            <div>
              <label htmlFor="visit_date">Visit Date</label>
              <input
                className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
                type="date"
                name="visit_date"
                id="visit_date"
                onChange={onChangeText}
                required
              />
            </div>
            <div>
              <label htmlFor="time_in">Time In</label>
              <input
                className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
                type="time"
                name="time_in"
                id="time_in"
                onChange={onChangeText}
                required
              />
            </div>
            <div>
              <label htmlFor="time_out">Time Out</label>
              <input
                className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
                type="time"
                name="time_out"
                id="time_out"
                onChange={onChangeText}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 space-x-1">
            <div>
              <label>Service:</label>

              <div className="text-left">
                {servicesList.length >= 1
                  ? servicesList.map((d) => {
                      return (
                        <div key={d.id}>
                          <input
                            className="inline-block"
                            value={d.id}
                            onChange={servicesCheck.bind(this)}
                            disabled={
                              parseInt(d.availability) === 1 ? false : true
                            }
                            type="checkbox"
                            data-amount={d.price}
                          />{" "}
                          <span className="inline-block">
                            {d.service_name +
                              " " +
                              (parseInt(d.availability) === 1
                                ? ""
                                : "(" + d.not_available_text + ")")}
                          </span>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>

            <div>
              <div className="mb-3">
                <label htmlFor="visit_type">Visit Type</label>
                <select
                  className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
                  id="visit_type"
                  name="visit_type"
                  onChange={onChangeText}
                >
                  <option value={0}>Select</option>
                  {visitType !== undefined
                    ? visitType.map((vt) => (
                        <option key={vt.id} value={vt.id}>
                          {vt.type_name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="visit_type_fee">Visit Type Fee</label>
                <input
                  className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
                  type="text"
                  id="visit_type_fee"
                  name="visit_type_fee"
                  onChange={onChangeText}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="discount_type">Discount Type:</label>
                <select
                  className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
                  name="discount_type"
                  id="discount_type"
                  onChange={onChangeText}
                >
                  <option value={0}>Select</option>
                  {discountList &&
                    discountList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.discount_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-3">{getSubTotal()}</div>

              <div className="mb-3">
                <div className="grid grid-cols-2 space-x-1">
                  <div>
                    {userList !== undefined || userList === [] ? (
                      <div style={{ width: "100%" }}>
                        <label htmlFor="hd_representative">
                          shift101 HD Representative:
                        </label>
                        <select
                          className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
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

                  <div>
                    {userList !== undefined || userList === [] ? (
                      <div style={{ width: "100%" }}>
                        <label htmlFor="wc_representative">
                          wecollab Representative:
                        </label>
                        <select
                          className="w-full text-sm outline-none bg-slate-100 p-2 rounded-md border border-slate-300"
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
              </div>
            </div>
          </div>

          {/* <div className="row form-group-row">
            <div className="col-6 new-visit-form-field">
              <div></div>
            </div>
            <div className="col-6 new-visit-form-field">
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
          </div> */}
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 px-3 flex items-center rounded-md hover:bg-cyan-500 font-bold"
          >
            <SaveIcon className="w-5 h-5 inline-block mr-2" />
            Save Visit
          </button>
        </div>
      </form>
    </div>
  );
};

const SearchClient = ({ selectClient }) => {
  let [searchCt, setSearchCt] = React.useState("");
  let [searchRes, setSearchRes] = React.useState([]);

  const runSearchCt = async () => {
    if (searchCt.trim() === "") {
      window.alert("Empty string is not allowed.");
      return;
    }
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
          className="w-full p-2 bg-slate-200 rounded-lg mb-2"
          placeholder="Enter name or client ID"
          onChange={(e) => setSearchCt(e.target.value)}
        />{" "}
        <button
          className="mb-2 bg-cyan-600 text-white p-2 w-full rounded-md font-bold hover:bg-cyan-500"
          onClick={runSearchCt}
        >
          Search client
        </button>
      </div>
      <div>
        <ul className="list-inside mb-2">
          {searchRes.length <= 0
            ? ""
            : searchRes.map((d) => (
                <li
                  className="hover:bg-slate-300 cursor-pointer text-base bg-slate-100 p-1 mb-1 rounded-lg flex items-center"
                  key={d.id}
                  onClick={selectClient.bind(
                    this,
                    d.id,
                    d.first_name + " " + d.middle_name + " " + d.last_name
                  )}
                >
                  <span className="bg-cyan-600 text-sm p-1 text-white rounded-md mr-2">
                    {d.client_id}
                  </span>{" "}
                  <span className="font-bold text-slate-600">
                    {d.first_name + " " + d.middle_name + " " + d.last_name}
                  </span>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Visits;
