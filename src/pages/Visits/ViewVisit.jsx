import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { callReport } from "../../functions/callReport";
import ContentLoading from "../../components/ContentLoading";

const ViewVisit = () => {
  let { clientId } = useParams();

  return <VisitDetails clientId={clientId} />;
};

const VisitDetails = ({ clientId }) => {
  let [visitDetail, setVisitDetail] = React.useState([]);
  let [servicesList, setServicesList] = React.useState([]);
  let [reportsList, setReportsList] = React.useState([]);

  const changeTimeFormat = (timeVar) => {
    let dTimeVar = new Date("1970-01-01 " + timeVar);
    let dHours = dTimeVar.getHours();
    let dMinutes = dTimeVar.getMinutes();
    let newFormat = dHours >= 12 ? "PM" : "AM";
    dHours = parseFloat(dHours) % 12;
    dHours = dHours ? dHours : 12;
    dMinutes = dMinutes < 10 ? "0" + dMinutes : dMinutes;
    return dHours + ":" + dMinutes + " " + newFormat;
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
    axios
      .get(`${process.env.REACT_APP_API_URL}visit/${clientId}`, config)
      .then((res) => {
        if (isMounted) {
          setVisitDetail(res.data.data);
          setReportsList(res.data.reports);
        }
      });

    axios.get(`${process.env.REACT_APP_API_URL}service`, config).then((res) => {
      if (isMounted) setServicesList(res.data.data);
    });

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  if (visitDetail.length === 0 || servicesList.length === 0) {
    return <ContentLoading />;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-1 md:p-3 max-h-screen">
      <div className="text-left mb-3">
        <Link to="/visits">{"<"} Back</Link>
      </div>

      <div className="border-b pb-2 mb-3">
        <img
          src={process.env.REACT_APP_IMG_PATH_URL + visitDetail[0].image}
          className="w-24 h-24 bg-white rounded-md shadow-md md:float-right border-2 border-white"
          alt={
            visitDetail[0].first_name +
            " " +
            visitDetail[0].middle_name +
            " " +
            visitDetail[0].last_name
          }
        />
        <div className="text-sm italic">Client Name:</div>
        <h1 className="text-xl font-bold">
          <Link to={`/clients/${visitDetail[0].client}`}>
            {visitDetail[0].first_name} {visitDetail[0].middle_name}{" "}
            {visitDetail[0].last_name}
          </Link>
        </h1>
        <div className="p-3 text-sm bg-slate-100 mt-2 rounded-md mb-3">
          <strong>Visit Date:</strong> {visitDetail[0].visit_date}{" "}
          <strong>Time In:</strong> {changeTimeFormat(visitDetail[0].time_in)}{" "}
          <strong>Time Out:</strong> {changeTimeFormat(visitDetail[0].time_out)}
        </div>
      </div>

      <div className="mb-3 italic">
        <small>{visitDetail[0].type_name}</small>
      </div>

      <div className="p-0 md:p-2">
        <h2 className="text-lg font-bold">Included Items</h2>
        <div className="overflow-x-auto border p-2 mb-3">
          <table className="table-auto mx-auto w-full">
            <thead>
              <tr>
                <th className="text-left pb-1 border-b">Item(s)</th>
                <th className="text-right pb-1 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(visitDetail[0].service_id).map((service) => (
                <tr key={service}>
                  <td className="text-left p-1 border-b">
                    {
                      servicesList.filter((i) => i.id === parseInt(service))[0]
                        .service_name
                    }
                  </td>
                  <td className="text-right p-1 border-b">
                    PHP{" "}
                    {Number(
                      servicesList.filter((i) => i.id === parseInt(service))[0]
                        .price
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <th className="text-left p-1 border-b">Subtotal</th>
                <td className="text-right p-1 border-b">
                  PHP {Number(visitDetail[0].subtotal).toFixed(2)}
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-b">
                  Discount ({visitDetail[0].discount_name}){" "}
                  {visitDetail[0].discount_discount_amount}
                  {parseInt(visitDetail[0].discount_type) === 1 ? "%" : ""}
                </th>
                <td className="text-right p-1 border-b">
                  (PHP{" "}
                  {formatter.format(parseFloat(visitDetail[0].discount_amount))}
                  )
                </td>
              </tr>
              <tr>
                <th className="text-left p-1 border-b">Additional Fee</th>
                <td className="text-right p-1 border-b">
                  PHP{" "}
                  {formatter.format(parseFloat(visitDetail[0].visit_type_fee))}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th className="text-left p-1">Total Amount</th>
                <th className="text-right p-1">
                  PHP{" "}
                  {formatter.format(parseFloat(visitDetail[0].total_amount))}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-3">
          <strong>Points Generated:</strong> {visitDetail[0].points}
        </div>

        <div className="mb-3 grid grid-cols-1 md:grid-cols-2">
          <div className="text-sm">
            <div className="font-bold">Health Division Representative:</div>
            {visitDetail[0].hd_first_name} {visitDetail[0].hd_last_name}
          </div>
          <div className="text-sm">
            <div className="font-bold">wecollab Representative:</div>
            {visitDetail[0].wc_first_name} {visitDetail[0].wc_last_name}
          </div>
        </div>
      </div>

      <div className="inner border-bottom">
        <div className="row inner">
          <div className="col-6 smaller"></div>
          <div className="col-6 smaller"></div>
        </div>
      </div>

      <div className="p-2">
        <div className="border-b pb-1 mb-3">
          <h2 className="text-lg font-bold">Reports</h2>
        </div>
        {reportsList.length <= 0 && (
          <div className="text-center text-slate-400 italic">
            No reports available for the services availed.
          </div>
        )}
        {reportsList.map((report) => (
          <div key={report.id} className="mb-3">
            {callReport(
              report.form_name,
              visitDetail[0].id,
              report.service_report_id,
              visitDetail[0].client
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVisit;
