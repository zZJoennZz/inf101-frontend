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

const ReportMyLife = ({ visitId, reportId, clientId }) => {
  const queryKey = "myLifeReport" + visitId + reportId + clientId;
  const [frmData, setFrmData] = useState({
    items_consulted: "",
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

        <h1 className="mb-3 text-lg font-bold">myLife</h1>
        <form onSubmit={submitForm}>
          <table className="text-left w-full mb-3">
            <tbody>
              <tr>
                <td className={tdClasses}>Item/s Consulted</td>
                <td className={tdClasses}>
                  <textarea
                    name="items_consulted"
                    className={textInputFullW}
                    id="items_consulted"
                    value={frmData.items_consulted}
                    onChange={onChangeText}
                  />
                </td>
              </tr>
              <tr>
                <td className={tdClasses}>Additional Details</td>
                <td className={tdClasses}>
                  <textarea
                    name="additional_details"
                    className={textInputFullW}
                    id="additional_details"
                    value={frmData.additional_details}
                    onChange={onChangeText}
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

export default ReportMyLife;
