import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ContentLoading from "../components/ContentLoading";
import { DotsCircleHorizontalIcon, SaveIcon } from "@heroicons/react/outline";

function MyAccount() {
  const [myAccount, setMyAccount] = useState({
    username: "",
    email: "",
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const [personalDet, setPersonalDet] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    contact_number: "",
    up_id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}my_account`, config, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setMyAccount({
          username: res.data.data[0].username,
          email: res.data.data[0].email,
          new_password: "",
          confirm_password: "",
        });
        setPersonalDet({
          first_name: res.data.data[0].first_name,
          last_name: res.data.data[0].last_name,
          middle_name: res.data.data[0].middle_name,
          contact_number: res.data.data[0].contact_number,
          up_id: res.data.data[0].up_id,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          toast(err);
        } else {
          toast("Something went wrong!");
        }
        setIsLoading(false);
      });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  function onChangeText(e) {
    setMyAccount((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function onChangeTextPer(e) {
    setPersonalDet((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function updateLogin(e) {
    e.preventDefault();
    if (
      myAccount.new_password !== undefined ||
      myAccount.new_password.trim() !== ""
    ) {
      if (myAccount.new_password !== myAccount.confirm_password) {
        toast("Your new password does not match the confirmation");
        return;
      }
    }
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
      },
    };
    setIsSaving(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}update_my_account`,
        myAccount,
        config
      )
      .then((res) => {
        toast(res.data.message);
        setIsSaving(false);
      })
      .catch((err) => {
        toast(err);
        setIsSaving(false);
      });
  }

  async function updatePersonalDet(e) {
    e.preventDefault();
    setIsSaving(true);
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}user_profile/${personalDet.up_id}`,
        personalDet,
        config
      )
      .then((res) => {
        toast(res.data.message);
        setIsSaving(false);
      })
      .catch((err) => {
        toast(err);
        setIsSaving(false);
      });
  }

  if (isLoading) return <ContentLoading />;
  return (
    <div className="w-full">
      <div className="border-b text-lg font-bold uppercase">My Account</div>
      <div className="flex flex-col pt-10">
        <div className="my-account-box mb-10">
          <div className="-mt-7">
            <span className="bg-white p-1">Login:</span>
          </div>
          <div className="w-full">
            <form onSubmit={updateLogin}>
              <label htmlFor="username">Username:</label>{" "}
              <input
                type="text"
                className="form-input-text mb-2"
                name="username"
                id="username"
                autoComplete="current-username"
                // onChange={onChangeText}
                value={myAccount.username}
                readOnly
              />
              <label htmlFor="email">Email Address:</label>{" "}
              <input
                type="email"
                className="form-input-text mb-2"
                name="email"
                id="email"
                onChange={onChangeText}
                value={myAccount.email}
              />
              <label htmlFor="password">Current Password:</label>{" "}
              <input
                type="password"
                className="form-input-text mb-2"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={onChangeText}
              />
              <hr className="mb-2" />
              <label htmlFor="password">New Password:</label>{" "}
              <input
                type="password"
                className="form-input-text mb-2"
                name="new_password"
                id="new_password"
                autoComplete="current-password"
                onChange={onChangeText}
              />
              <label htmlFor="password">Confirm Password:</label>{" "}
              <input
                type="password"
                className="form-input-text mb-2"
                name="confirm_password"
                id="confirm_password"
                autoComplete="current-password"
                onChange={onChangeText}
              />
              <small className="text-xs italic">
                * Leave empty if you're not changing your password.
              </small>
              <button
                disabled={isSaving}
                type="submit"
                className="bg-cyan-600 text-white flex items-center font-bold p-2 rounded float-right hover:bg-cyan-500 transition-all ease-in-out"
              >
                {isSaving ? (
                  <>
                    <DotsCircleHorizontalIcon className="inline-block w-5 h-5 mr-2" />{" "}
                    Saving
                  </>
                ) : (
                  <>
                    <SaveIcon className="inline-block w-5 h-5 mr-2" /> Save
                    Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="my-account-box">
          <div className="-mt-7">
            <span className="bg-white p-1">Personal Information:</span>
          </div>
          <div className="w-full">
            <form onSubmit={updatePersonalDet}>
              <label htmlFor="first_name">First Name:</label>{" "}
              <input
                type="text"
                className="form-input-text mb-2"
                name="first_name"
                id="first_name"
                value={personalDet.first_name}
                onChange={onChangeTextPer}
              />
              <label htmlFor="last_name">Middle Name:</label>{" "}
              <input
                type="text"
                className="form-input-text mb-2"
                name="middle_name"
                id="middle_name"
                value={personalDet.middle_name}
                onChange={onChangeTextPer}
              />
              <label htmlFor="last_name">Last Name:</label>{" "}
              <input
                type="text"
                className="form-input-text mb-2"
                name="last_name"
                id="last_name"
                value={personalDet.last_name}
                onChange={onChangeTextPer}
              />
              <label htmlFor="contact_number">Contact Number:</label>{" "}
              <input
                type="text"
                className="form-input-text mb-2"
                name="contact_number"
                id="contact_number"
                value={personalDet.contact_number}
                onChange={onChangeTextPer}
              />
              <button
                disabled={isSaving}
                type="submit"
                className="bg-cyan-600 text-white flex items-center font-bold p-2 rounded float-right hover:bg-cyan-500 transition-all ease-in-out"
              >
                {isSaving ? (
                  <>
                    <DotsCircleHorizontalIcon className="inline-block w-5 h-5 mr-2" />{" "}
                    Saving
                  </>
                ) : (
                  <>
                    <SaveIcon className="inline-block w-5 h-5 mr-2" /> Save
                    Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
