import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServiceReportRecords,
  postServiceReportRecords,
  editServiceReportRecords,
  getUsers,
} from "../../functions/apiCalls";
import ContentLoading from "../ContentLoading";
import { SaveIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

const ReportMyTherapyForBodyFullMat = ({ visitId, reportId, clientId }) => {
  const queryKey = "myTherapyForFullBodyMat" + visitId + reportId + clientId;
  const [frmData, setFrmData] = useState({
    first_program: "",
    second_program: "",
    first_duration: "",
    second_duration: "",
    first_frequency: "",
    second_frequency: "",
    first_start_time: "",
    second_start_time: "",
    first_rest_time: "",
    second_rest_time: "",
    first_end_time: "",
    second_end_time: "",
    first_assessment: "",
    second_assessment: "",
    assessed_by: 0,
  });
  //0 initial/disabled form, 1 new record form, 2 edit record form
  const [frmMode, setFrmMode] = React.useState(1);
  const [currReport, setCurrReport] = React.useState(0);
  const [sysMsg, setSysMsg] = React.useState("Please complete the form.");
  const [users, setUsers] = React.useState([]);
  const queryClient = useQueryClient();

  const { data, status } = useQuery(
    [queryKey],
    () => getServiceReportRecords(visitId, reportId, clientId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const newRecord = useMutation(postServiceReportRecords, {
    onSuccess: (res) => {
      queryClient.invalidateQueries([queryKey]);
      toast(res.message);
      setFrmMode(2);
    },
    onError: (res) => {
      queryClient.removeQueries([queryKey]);
      toast("Something went wrong.");
    },
  });

  const editRecord = useMutation(editServiceReportRecords, {
    onSuccess: (res) => {
      queryClient.invalidateQueries([queryKey]);
      toast(res.message);
      setFrmMode(2);
    },
    onError: (res) => {
      queryClient.invalidateQueries([queryKey]);
      toast("Something went wrong.");
    },
  });

  const thClasses = "border uppercase text-sm px-2 py-3 w-1/3";
  const tdClasses = "border p-2";
  const textInputFullW =
    "w-full bg-slate-100 border border-slate-300 p-2 outline-none";

  function onChangeText(e) {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();

    let newData = {
      visit_id: visitId,
      report_id: reportId,
      record: frmData,
      currReport: currReport,
    };
    if (frmMode === 1) {
      newRecord.mutate(newData);
    } else if (frmMode === 2) {
      editRecord.mutate(newData);
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && status !== "error" && status !== "loading") {
      if (data.success) {
        setFrmData(JSON.parse(data.data[0].record));
        setCurrReport(data.data[0].id);
        setFrmMode(2);

        setSysMsg("You can edit the record below.");
      }
    }
    getUsers().then((res) => {
      if (isMounted) {
        setUsers(res.data);
      }
    });
    return () => (isMounted = false);
  }, [data, status]);

  if (status === "loading") return <ContentLoading />;

  return (
    <div className="p-3 overflow-x-auto rounded-lg border border-slate-200">
      <div className={frmMode === 0 ? "hidden" : "block"}>
        <div className="msg text-sm text-center italic">{sysMsg}</div>

        <h1 className="mb-3 text-lg font-bold">myTherapy for Body Full Mat</h1>

        <form onSubmit={submitForm}>
          <table className="text-left w-full mb-3">
            <thead>
              <tr>
                <th className={thClasses}>Session</th>
                <th className={thClasses}>First</th>
                <th className={thClasses}>Second</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClasses}>Program</td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="first_program"
                    name="first_program"
                    className={textInputFullW}
                    value={frmData.first_program}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="second_program"
                    name="second_program"
                    className={textInputFullW}
                    value={frmData.second_program}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Duration</td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="first_duration"
                    name="first_duration"
                    className={textInputFullW}
                    value={frmData.first_duration}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="second_duration"
                    name="second_duration"
                    className={textInputFullW}
                    value={frmData.second_duration}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Frequency</td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="first_frequency"
                    name="first_frequency"
                    className={textInputFullW}
                    value={frmData.first_frequency}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="second_frequency"
                    name="second_frequency"
                    className={textInputFullW}
                    value={frmData.second_frequency}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Start Time</td>
                <td className={tdClasses}>
                  <input
                    type="time"
                    id="first_start_time"
                    name="first_start_time"
                    className={textInputFullW}
                    value={frmData.first_start_time}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="time"
                    id="second_start_time"
                    name="second_start_time"
                    className={textInputFullW}
                    value={frmData.second_start_time}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Rest Time</td>
                <td className={tdClasses}>
                  <input
                    type="time"
                    id="first_rest_time"
                    name="first_rest_time"
                    className={textInputFullW}
                    value={frmData.first_rest_time}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="time"
                    id="second_rest_time"
                    name="second_rest_time"
                    className={textInputFullW}
                    value={frmData.second_rest_time}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>End Time</td>
                <td className={tdClasses}>
                  <input
                    type="time"
                    id="first_end_time"
                    name="first_end_time"
                    className={textInputFullW}
                    value={frmData.first_end_time}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="time"
                    id="second_end_time"
                    name="second_end_time"
                    className={textInputFullW}
                    value={frmData.second_end_time}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Assessment</td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="first_assessment"
                    name="first_assessment"
                    className={textInputFullW}
                    value={frmData.first_assessment}
                    onChange={onChangeText}
                    required
                  />
                </td>
                <td className={tdClasses}>
                  <input
                    type="text"
                    id="second_assessment"
                    name="second_assessment"
                    className={textInputFullW}
                    value={frmData.second_assessment}
                    onChange={onChangeText}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Assessed By</td>
                <td colSpan={2} className={tdClasses}>
                  <select
                    id="assessed_by"
                    name="assessed_by"
                    className={textInputFullW}
                    value={frmData.assessed_by}
                    onChange={onChangeText}
                    required
                  >
                    <option value={0}>Select personel</option>
                    {users &&
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name + " " + user.last_name}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="bg-cyan-600 inline-block text-white font-bold p-2 rounded-md hover:bg-cyan-500 transition-all ease-in-out">
            <SaveIcon className="inline-block w-4 h-4" /> Save Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportMyTherapyForBodyFullMat;
