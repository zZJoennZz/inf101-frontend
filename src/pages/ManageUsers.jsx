import React, { useRef, useState } from "react";
import {
  SearchCircleIcon,
  UserAddIcon,
  EyeIcon,
  EyeOffIcon,
  SaveIcon,
  ShieldCheckIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/solid";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getUsersForAdmin,
  postUser,
  getUserForAdmin,
  putUserForAdmin,
} from "../functions/apiCalls";
import ContentLoading from "../components/ContentLoading";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function ManageUsers() {
  let [openModal, setOpenModal] = useState(false);
  let [isSaving, setIsSaving] = useState(false);
  let [search, setSearch] = useState("");
  let [isEdit, setIsEdit] = useState(false);
  let [selectedUser, setSelectedUser] = useState([]);
  const queryClient = useQueryClient();
  const getAllUser = useQuery(["allUserAdmin"], () => getUsersForAdmin(), {
    retry: false,
    retryOnMount: false,
  });

  const postNewUser = useMutation(postUser, {
    onSuccess: (res) => {
      toast(res.message);
      setIsSaving(false);
      setOpenModal(false);
      queryClient.invalidateQueries(["allUserAdmin"]);
    },
    onError: () => {
      toast("Something went wrong. User is not saved.");
      setIsSaving(false);
      setOpenModal(false);
    },
  });

  const putUserChanges = useMutation(putUserForAdmin, {
    onSuccess: (res) => {
      toast(res.message);
      setIsSaving(false);
      setIsEdit(false);
      setSelectedUser([]);
      queryClient.invalidateQueries(["allUserAdmin"]);
    },
    onError: () => {
      toast("Something went wrong. User changes is not saved.");
      setIsSaving(false);
      setIsEdit(false);
      setSelectedUser([]);
    },
  });

  function saveNewUser(frmData) {
    setIsSaving(true);
    postNewUser.mutate(frmData);
  }

  function saveUserChanges(frmData) {
    setIsSaving(true);
    let data = {
      frmData: frmData,
      user_id: selectedUser.user.id,
      profile_id: selectedUser.user_profile.id,
    };

    putUserChanges.mutate(data);
  }

  async function getUser(userId) {
    setSelectedUser([]);
    await getUserForAdmin(userId)
      .then((res) => {
        setIsEdit(true);
        setSelectedUser({
          user: res.data,
          user_profile: res.profile,
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full">
      <div className="border-b mb-5 pb-1">
        <Modal
          isOpen={openModal}
          content={<AddUser saveUser={saveNewUser} isSaving={isSaving} />}
          title="Add new user"
          closeModal={() => setOpenModal(!openModal)}
          btnClass="float-right flex items-center text-gray-700 border border-gray-700 px-2 py-1 rounded-full hover:bg-cyan-700 hover:border-cyan-700 hover:text-white text-xs"
          btnText={
            <>
              <UserAddIcon className="w-4 h-4 inline-block" />
              Add User
            </>
          }
        />
        <span className="font-bold text-lg uppercase">Manage Users</span>
      </div>
      {getAllUser.isLoading && <ContentLoading />}
      <div className={`py-2 mb-5 ${getAllUser.isLoading && "hidden"}`}>
        <div className="w-full flex bg-slate-100 p-2 rounded-xl">
          <SearchCircleIcon className="inline-block w-10 h-10 text-slate-300" />
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search user..."
            className="w-full inline-block p-1 bg-transparent outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
        </div>
      </div>

      <table
        className={`w-full text-left ${getAllUser.isLoading && "hidden"} mb-5`}
      >
        <thead>
          <tr className="border-b uppercase text-sm">
            <th className="w-4/6">Name</th>
            <th className="w-2/6 text-right">Role</th>
          </tr>
        </thead>
        <tbody>
          {getAllUser.data !== undefined &&
            getAllUser.data.data
              .filter((query) => {
                let name =
                  query.first_name +
                  " " +
                  query.middle_name +
                  " " +
                  query.last_name;

                if (search === "Actives" || search === "Active") {
                  return query.is_active === 1;
                } else if (search === "Admins" || search === "Admin") {
                  return query.is_admin === 1;
                } else if (search === "Inactives" || search === "Inactive") {
                  return query.is_active === 0;
                } else if (search === "Users" || search === "User") {
                  return query.is_admin === 0;
                } else {
                  return name.includes(search);
                }
              })
              .map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-100 transition-all ease-in-out"
                >
                  <td className="py-2 pl-1">
                    <span
                      onClick={() => getUser(user.id)}
                      className={`${
                        user.is_active === 1
                          ? "text-slate-700"
                          : "text-slate-400"
                      } cursor-pointer`}
                    >{`${user.first_name} ${user.middle_name} ${user.last_name}`}</span>{" "}
                    <div
                      className={`w-2 h-2 ${
                        user.is_active === 1 ? "bg-green-600" : "bg-red-600"
                      } rounded-full inline-block`}
                    ></div>
                  </td>
                  <td className="py-2 text-right">
                    <div
                      className={`inline-block text-xs text-white px-1 md:px-2 py-1 rounded-full ${
                        user.is_admin === 1 ? "bg-green-600" : "bg-slate-500"
                      }`}
                    >
                      {user.is_admin === 1 ? (
                        <>
                          <ShieldCheckIcon className="inline-block w-4 h-4" />{" "}
                          <span className="hidden md:inline-block">Admin</span>
                        </>
                      ) : (
                        <>
                          <UserIcon className="inline-block w-4 h-4" />{" "}
                          <span className="hidden md:inline-block">User</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <Modal
        isOpen={isEdit}
        content={
          selectedUser.length !== 0 && (
            <EditUser
              saveUser={saveUserChanges}
              data={selectedUser}
              isSaving={isSaving}
              cancelForm={() => {
                setIsEdit(false);
                setSelectedUser([]);
              }}
            />
          )
        }
        title="Edit user"
        closeModal={() => setIsEdit(!isEdit)}
        btnClass="hidden"
        btnText={
          <>
            <UserAddIcon className="w-4 h-4 inline-block" />
            Last opened user
          </>
        }
      />
    </div>
  );
}

/**
 * @param {any}       saveUser Function for saving the user
 * @param {boolean}   isSaving Mode of the form.
 * @returns The add user component
 */
function AddUser({ saveUser, isSaving }) {
  const [frmData, setFrmData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    account_type: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    contact_number: "",
    email_address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const addForm = useRef();
  function onChangeText(e) {
    setFrmData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submitForm(e) {
    e.preventDefault();
    let err = "";
    if (frmData.email !== frmData.email_address) {
      err = err + "Email fields does not match.\n";
    }

    if (frmData.password !== frmData.confirm_password) {
      err = err + "Password fields does not match.";
    }

    if (err !== "") {
      window.alert(err);
    } else {
      saveUser(frmData);
      addForm.current.reset();
    }
  }
  return (
    <div className="p-4">
      <form onSubmit={submitForm} ref={addForm}>
        <div className="border-b mb-3 text-sm">Personal Information</div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-1">
            <label className="form-label-required" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-input-text"
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Juan"
              value={frmData.first_name}
              onChange={onChangeText}
              required
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="middle_name">
              Middle Name
            </label>
            <input
              className="form-input-text"
              type="text"
              id="middle_name"
              name="middle_name"
              placeholder="Santos"
              value={frmData.middle_name}
              onChange={onChangeText}
              required
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-input-text"
              type="text"
              id="last_name"
              name="last_name"
              placeholder="dela Cruz"
              value={frmData.last_name}
              onChange={onChangeText}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
          <div className="p-1">
            <label className="form-label-required" htmlFor="contact_number">
              Contact Number
            </label>
            <input
              className="form-input-text"
              type="text"
              id="contact_number"
              name="contact_number"
              placeholder="0912 345 6789"
              value={frmData.contact_number}
              onChange={onChangeText}
              required
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="email_address">
              Email Address
            </label>
            <input
              className="form-input-text"
              type="email"
              id="email_address"
              name="email_address"
              placeholder="juan@delacruz.com"
              value={frmData.email_address}
              onChange={onChangeText}
              required
            />
          </div>
        </div>

        <div className="border-b mb-3 text-sm">Login Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-1">
            <label className="form-label-required" htmlFor="username">
              Username
            </label>
            <input
              className="form-input-text"
              type="text"
              id="username"
              name="username"
              placeholder="JuanDelaC"
              value={frmData.username}
              onChange={onChangeText}
              autoComplete="username"
              required
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="email">
              Confirm Email Address
            </label>
            <input
              className="form-input-text"
              type="email"
              id="email"
              name="email"
              placeholder="juan@delacruz.com"
              value={frmData.email}
              onChange={onChangeText}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-1">
            <button
              type="button"
              className="float-right"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 inline-block text-slate-400" />
              ) : (
                <EyeIcon className="h-5 w-5 inline-block text-slate-400" />
              )}
            </button>
            <label className="form-label-required" htmlFor="password">
              Password
            </label>
            <input
              className="form-input-text"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={frmData.password}
              onChange={onChangeText}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="p-1">
            <button
              type="button"
              className="float-right"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 inline-block text-slate-400" />
              ) : (
                <EyeIcon className="h-5 w-5 inline-block text-slate-400" />
              )}
            </button>
            <label className="form-label-required" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              className="form-input-text"
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={frmData.confirm_password}
              onChange={onChangeText}
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <div className="w-full p-1 mb-10">
          <button
            disabled={isSaving}
            type="submit"
            className={`flex items-center p-2 rounded float-right transition-all ease-in-out font-bold ${
              isSaving
                ? "bg-slate-200 cursor-not-allowed"
                : "text-white bg-cyan-600 hover:bg-cyan-500 cursor-pointer"
            }`}
          >
            {isSaving ? (
              <>
                <DotsCircleHorizontalIcon className="inline-block w-5 h-5 animate-bounce mr-1" />{" "}
                Loading
              </>
            ) : (
              <>
                <SaveIcon className="inline-block w-5 h-5 mr-1" /> Save User
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * @param {any}       saveUser Function for saving the user
 * @param {boolean}   isSaving Mode of the form.
 * @returns The add user component
 */
function EditUser({ saveUser, isSaving, data, cancelForm }) {
  const [frmData, setFrmData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    account_type: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    contact_number: "",
    email_address: "",
    is_admin: data.user.is_admin,
    is_active: data.user.is_active,
  });
  const [showPassword, setShowPassword] = useState(false);
  const addForm = useRef();
  function onChangeText(e) {
    setFrmData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submitForm(e) {
    e.preventDefault();
    let err = "";
    if (frmData.email !== frmData.email_address) {
      err = err + "Email fields does not match.\n";
    }

    if (frmData.password !== frmData.confirm_password) {
      err = err + "Password fields does not match.";
    }

    if (err !== "") {
      window.alert(err);
    } else {
      saveUser(frmData);
      addForm.current.reset();
    }
  }
  return (
    <div className="p-4">
      <form onSubmit={submitForm} ref={addForm}>
        <div className="border-b mb-3 text-sm">Personal Information</div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-1">
            <label className="form-label-required" htmlFor="first_name1">
              First Name
            </label>
            <input
              className="form-input-text"
              type="text"
              id="first_name1"
              name="first_name"
              placeholder="Juan"
              defaultValue={data.user_profile.first_name}
              onChange={onChangeText}
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="middle_name1">
              Middle Name
            </label>
            <input
              className="form-input-text"
              type="text"
              id="middle_name1"
              name="middle_name"
              placeholder="Santos"
              defaultValue={data.user_profile.middle_name}
              onChange={onChangeText}
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="last_name1">
              Last Name
            </label>
            <input
              className="form-input-text"
              type="text"
              id="last_name1"
              name="last_name"
              placeholder="dela Cruz"
              defaultValue={data.user_profile.last_name}
              onChange={onChangeText}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
          <div className="p-1">
            <label className="form-label-required" htmlFor="contact_number1">
              Contact Number
            </label>
            <input
              className="form-input-text"
              type="text"
              id="contact_number1"
              name="contact_number"
              placeholder="0912 345 6789"
              defaultValue={data.user_profile.contact_number}
              onChange={onChangeText}
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="email_address1">
              Email Address
            </label>
            <input
              className="form-input-text"
              type="email"
              id="email_address1"
              name="email_address"
              placeholder="juan@delacruz.com"
              defaultValue={data.user.email}
              onChange={onChangeText}
            />
          </div>
        </div>

        <div className="border-b mb-3 text-sm">Login Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-1">
            <label className="form-label-required" htmlFor="username1">
              Username
            </label>
            <input
              className="form-input-text"
              type="text"
              id="username1"
              name="username"
              placeholder="JuanDelaC"
              defaultValue={data.user.username}
              onChange={onChangeText}
              autoComplete="username"
            />
          </div>
          <div className="p-1">
            <label className="form-label-required" htmlFor="email1">
              Confirm Email Address
            </label>
            <input
              className="form-input-text"
              type="email"
              id="email1"
              name="email"
              placeholder="juan@delacruz.com"
              defaultValue={data.user.email}
              onChange={onChangeText}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
          <div className="p-1">
            <button
              type="button"
              className="float-right"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 inline-block text-slate-400" />
              ) : (
                <EyeIcon className="h-5 w-5 inline-block text-slate-400" />
              )}
            </button>
            <label className="form-label-required" htmlFor="password1">
              New Password
            </label>
            <input
              className="form-input-text"
              type={showPassword ? "text" : "password"}
              id="password1"
              name="password"
              value={frmData.password}
              onChange={onChangeText}
              autoComplete="new-password"
            />
          </div>
          <div className="p-1">
            <button
              type="button"
              className="float-right"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 inline-block text-slate-400" />
              ) : (
                <EyeIcon className="h-5 w-5 inline-block text-slate-400" />
              )}
            </button>
            <label className="form-label-required" htmlFor="confirm_password1">
              Confirm New Password
            </label>
            <input
              className="form-input-text"
              type={showPassword ? "text" : "password"}
              id="confirm_password1"
              name="confirm_password"
              value={frmData.confirm_password}
              onChange={onChangeText}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="border-b mb-3 text-sm">Account Settings</div>

        <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
          <div className="p-1">
            <div>Admin</div>
            <label
              htmlFor="is_admin"
              className="flex items-center cursor-pointer relative"
            >
              <input
                type="checkbox"
                id="is_admin"
                name="is_admin"
                className="sr-only"
                defaultChecked={data.user.is_admin}
                onChange={() =>
                  setFrmData((prev) => {
                    return {
                      ...prev,
                      is_admin: prev.is_admin === 1 ? 0 : 1,
                    };
                  })
                }
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
            </label>
          </div>

          <div className="p-1">
            <div>Active</div>
            <label
              htmlFor="is_active"
              className="flex items-center cursor-pointer relative"
            >
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                className="sr-only"
                defaultChecked={frmData.is_active}
                onChange={() =>
                  setFrmData((prev) => {
                    return {
                      ...prev,
                      is_active: prev.is_active === 1 ? 0 : 1,
                    };
                  })
                }
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
            </label>
          </div>
        </div>
        <div className="w-full p-1 mb-10">
          <button
            type="button"
            disabled={isSaving}
            onClick={cancelForm}
            className={`flex items-center p-2 rounded float-left transition-all ease-in-out font-bold ${
              isSaving
                ? "bg-slate-200 cursor-not-allowed"
                : "text-white bg-red-600 hover:bg-red-500 cursor-pointer"
            }`}
          >
            <XIcon className="inline-block w-5 h-5 mr-1" /> Cancel
          </button>
          <button
            disabled={isSaving}
            type="submit"
            className={`flex items-center p-2 rounded float-right transition-all ease-in-out font-bold ${
              isSaving
                ? "bg-slate-200 cursor-not-allowed"
                : "text-white bg-cyan-600 hover:bg-cyan-500 cursor-pointer"
            }`}
          >
            {isSaving ? (
              <>
                <DotsCircleHorizontalIcon className="inline-block w-5 h-5 animate-bounce mr-1" />{" "}
                Loading
              </>
            ) : (
              <>
                <SaveIcon className="inline-block w-5 h-5 mr-1" /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageUsers;
