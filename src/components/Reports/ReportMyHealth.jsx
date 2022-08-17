import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServiceReportRecords,
  postServiceReportRecords,
  editServiceReportRecords,
} from "../../functions/apiCalls";
import ContentLoading from "../ContentLoading";
import { SaveIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

const ReportMyHealth = ({ visitId, reportId, clientId }) => {
  const queryKey = "myHealthReport" + visitId + reportId + clientId;
  const [frmData, setFrmData] = useState({
    medical_device: false,
    health_supplements: false,
    others: false,
    additional_details: "",
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
    onError: (res) => {
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
    onError: (res) => {
      queryClient.invalidateQueries([queryKey]);
      toast("Something went wrong.");
    },
  });

  const tdClasses = "border p-2";
  const textInputFullW =
    "w-full bg-slate-100 border border-slate-300 p-2 outline-none";

  function onChangeText(e) {
    setFrmData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
    return () => (isMounted = false);
  }, [data, status]);

  if (status === "loading") return <ContentLoading />;

  return (
    <div className="p-3 overflow-x-auto rounded-lg border border-slate-200">
      <div className={frmMode === 0 ? "hidden" : "block"}>
        <div className="msg text-sm text-center italic">{sysMsg}</div>

        <h1 className="mb-3 text-lg font-bold">myHeart</h1>

        <form onSubmit={submitForm}>
          <table className="text-left w-full mb-3">
            <tbody>
              <tr>
                <td className={tdClasses}>Item/s Acquired</td>
                <td className={tdClasses}>
                  <div className="flex items-center mr-5">
                    <input
                      type="checkbox"
                      name="medical_device"
                      className="inline-block mr-1"
                      id="medical_device"
                      checked={frmData.medical_device}
                      onChange={() =>
                        setFrmData((prev) => {
                          return {
                            ...prev,
                            medical_device: !prev.medical_device,
                          };
                        })
                      }
                    />
                    <label htmlFor="medical_device">Medical Device</label>
                  </div>
                  <div className="flex items-center mr-5">
                    <input
                      type="checkbox"
                      name="health_supplements"
                      className="inline-block mr-1"
                      id="health_supplements"
                      checked={frmData.health_supplements}
                      onChange={() =>
                        setFrmData((prev) => {
                          return {
                            ...prev,
                            health_supplements: !prev.health_supplements,
                          };
                        })
                      }
                    />
                    <label htmlFor="medical_device">Health Supplements</label>
                  </div>
                  <div className="flex items-center mr-5">
                    <input
                      type="checkbox"
                      name="others"
                      className="inline-block mr-1"
                      id="others"
                      checked={frmData.others}
                      onChange={() =>
                        setFrmData((prev) => {
                          return { ...prev, others: !prev.others };
                        })
                      }
                    />
                    <label htmlFor="medical_device">Others</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Additional Details</td>
                <td className={tdClasses}>
                  <textarea
                    name="additional_details"
                    id="additional_details"
                    value={frmData.additional_details}
                    onChange={onChangeText}
                    className={textInputFullW}
                  />
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

export default ReportMyHealth;
