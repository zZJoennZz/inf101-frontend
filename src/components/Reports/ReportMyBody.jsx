import React from "react";
import axios from "axios";
import { SaveIcon } from "@heroicons/react/outline";
import ContentLoading from "../ContentLoading";

const ReportMyBody = ({ visitId, reportId, clientId }) => {
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
  const [frmMode, setFrmMode] = React.useState(0);
  const [currReport, setCurrReport] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sysMsg, setSysMsg] = React.useState("Report form is loading...");

  const thClasses = "border px-2 py-3 w-1/3";
  const tdClasses = "border p-2";
  const textInputFullW =
    "w-full bg-slate-100 border border-slate-300 p-2 outline-none";

  const onChangeText = (e) =>
    setFrmData({ ...frmData, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSysMsg("Submitting your changes...");
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    let data = {
      visit_id: visitId,
      report_id: reportId,
      record: frmData,
    };

    if (frmMode === 1) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}service_report_records`,
          data,
          config
        )
        .then((res) => {
          setSysMsg(res.data.message);
          setIsLoading(false);
          setFrmMode(2);
        })
        .catch((err) => {
          setSysMsg(err);
          setIsLoading(false);
        });
    } else if (frmMode === 2) {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}service_report_records/${currReport}`,
          data,
          config
        )
        .then((res) => {
          setSysMsg(res.data.message);
          setIsLoading(false);
          setFrmMode(2);
        })
        .catch((err) => {
          setSysMsg(err);
          setIsLoading(false);
        });
    }
  };

  React.useEffect(() => {
    let isMounted = true;
    const getReport = async () => {
      setSysMsg("Checking for records...");
      let config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Allow-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}service_report_records/${visitId}/${reportId}/${clientId}`,
          config
        )
        .then((res) => {
          if (isMounted) {
            setFrmData(JSON.parse(res.data.data[0].record));
            setCurrReport(res.data.data[0].id);
            setSysMsg("You can edit the record below.");
            setIsLoading(false);
            setFrmMode(2);
          }
        })
        .catch(() => {
          if (isMounted) {
            setSysMsg("Please complete the form.");
            setIsLoading(false);
            setFrmMode(1);
          }
        });
    };

    getReport();
    return () => (isMounted = false);
  }, [visitId, reportId, clientId]);

  return (
    <div className="p-3 overflow-x-auto rounded-lg border border-slate-200">
      <div className="flex flex-col items-center">
        <span className="mb-3 text-sm italic">{sysMsg}</span>{" "}
        {isLoading && <ContentLoading />}
      </div>
      <div className={frmMode === 0 ? "hidden" : "block"}>
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
    </div>
  );
};

export default ReportMyBody;
