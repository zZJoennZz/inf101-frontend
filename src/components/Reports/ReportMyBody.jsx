import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServiceReportRecords,
  postServiceReportRecords,
  editServiceReportRecords,
} from "../../functions/apiCalls";
import { SaveIcon } from "@heroicons/react/outline";
import ContentLoading from "../ContentLoading";
import { toast } from "react-toastify";

const ReportMyBody = ({ visitId, reportId, clientId }) => {
  const queryKey = "myBodyReport" + visitId + reportId + clientId;
  const [frmData, setFrmData] = React.useState({
    body_weight: "",
    target_weight: "",
    body_height: "",
    body_mass_index: "",
    random_blood_sugar: "",
    body_temp_before: "",
    body_temp_after: "",
    blood_pressure_before: "",
    blood_pressure_after: "",
    oxygen_level_before: "",
    oxygen_level_after: "",
    pulse_rate_before: "",
    pulse_rate_after: "",
  });
  //0 initial/disabled form, 1 new record form, 2 edit record form
  const [frmMode, setFrmMode] = React.useState(1);
  const [currReport, setCurrReport] = React.useState(0);
  const [sysMsg, setSysMsg] = React.useState("Please complete the form.");

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
    onError: () => {
      queryClient.invalidateQueries([queryKey]);
      toast("Something went wrong.");
    },
  });

  const editRecord = useMutation(editServiceReportRecords, {
    onSuccess: (res) => {
      queryClient.invalidateQueries([queryKey]);
      toast("Yay! " + res.message);
      setFrmMode(2);
    },
    onError: () => {
      queryClient.invalidateQueries([queryKey]);
      toast("Something went wrong.");
    },
  });

  const thClasses = "border px-2 py-3 w-1/3";
  const tdClasses = "border p-2";
  const textInputFullW =
    "w-full bg-slate-100 border border-slate-300 p-2 outline-none";

  function onChangeText(e) {
    setFrmData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const onSubmitForm = async (e) => {
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
  };

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted && status !== "error" && status !== "loading") {
      if (data.success) {
        setFrmData(JSON.parse(data.data[0].record));
        setCurrReport(data.data[0].id);
        setFrmMode(2);
        setSysMsg("You can edit the record below.");
      }
    }

    return () => (isMounted = false);
  }, [data, status]);
  if (status === "loading") return <ContentLoading />;
  return (
    <div className="p-3 overflow-x-auto rounded-lg border border-slate-200">
      <div className="flex flex-col items-center">
        <span className="mb-3 text-sm italic">{sysMsg}</span>
      </div>

      <h1 className="mb-3 text-lg font-bold">myBody</h1>

      <form onSubmit={onSubmitForm}>
        <table className="text-left w-full mb-3">
          <thead>
            <tr>
              <th className={thClasses}>Item</th>
              <th className={thClasses}>Before Therapy</th>
              <th className={thClasses}>After Therapy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdClasses}>Body Weight / Waistline</td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="body_weight"
                  name="body_weight"
                  className={textInputFullW}
                  value={frmData["body_weight"]}
                  onChange={onChangeText}
                  required
                />
              </td>
              <td className={tdClasses}>
                Target Weight:{" "}
                <input
                  type="text"
                  id="target_weight"
                  name="target_weight"
                  className={`${textInputFullW} mb-2`}
                  value={frmData["target_weight"]}
                  onChange={onChangeText}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={tdClasses}>Body Height</td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="body_height"
                  name="body_height"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["body_height"]}
                />
              </td>
              <td className={tdClasses}>
                <span className="italic">Not Applicable/Required</span>
              </td>
            </tr>
            <tr>
              <td className={tdClasses}>Body Mass Index</td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="body_mass_index"
                  name="body_mass_index"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["body_mass_index"]}
                />
              </td>
              <td className={tdClasses}>
                <span className="italic">Not Applicable/Required</span>
              </td>
            </tr>
            <tr>
              <td className={tdClasses}>Random Blood Sugar Test</td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="random_blood_sugar"
                  name="random_blood_sugar"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["random_blood_sugar"]}
                />
              </td>
              <td className={tdClasses}>
                <span className="italic">Not Applicable/Required</span>
              </td>
            </tr>
            <tr>
              <th className={tdClasses}>Body Temperature</th>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="body_temp_before"
                  name="body_temp_before"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["body_temp_before"]}
                />
              </td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="body_temp_after"
                  name="body_temp_after"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["body_temp_after"]}
                />
              </td>
            </tr>
            <tr>
              <th className={tdClasses}>Blood Pressure</th>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="blood_pressure_before"
                  name="blood_pressure_before"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["blood_pressure_before"]}
                />
              </td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="blood_pressure_after"
                  name="blood_pressure_after"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["blood_pressure_after"]}
                />
              </td>
            </tr>
            <tr>
              <th className={tdClasses}>Oxygen Level</th>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="oxygen_level_before"
                  name="oxygen_level_before"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["oxygen_level_before"]}
                />
              </td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="oxygen_level_after"
                  name="oxygen_level_after"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["oxygen_level_after"]}
                />
              </td>
            </tr>
            <tr>
              <th className={tdClasses}>Pulse Rate</th>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="pulse_rate_before"
                  name="pulse_rate_before"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["pulse_rate_before"]}
                />
              </td>
              <td className={tdClasses}>
                <input
                  type="text"
                  id="pulse_rate_after"
                  name="pulse_rate_after"
                  className={textInputFullW}
                  onChange={onChangeText}
                  required
                  value={frmData["pulse_rate_after"]}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-cyan-600 inline-block text-white font-bold p-2 rounded-md hover:bg-cyan-500 transition-all ease-in-out"
        >
          <SaveIcon className="h-4 w-4 inline-block" /> Save Record
        </button>
      </form>
    </div>
  );
};

export default ReportMyBody;
