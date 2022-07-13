import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";

const ViewVisit = ({ isAuthenticated }) => {
  let { clientId } = useParams();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <VisitDetails clientId={clientId} />;
};

const VisitDetails = ({ clientId }) => {
  let [visitDetail, setVisitDetail] = React.useState([]);
  let [servicesList, setServicesList] = React.useState([]);

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
        if (isMounted) setVisitDetail(res.data.data);
      });

    axios.get(`${process.env.REACT_APP_API_URL}service`, config).then((res) => {
      if (isMounted) setServicesList(res.data.data);
    });

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  if (visitDetail.length === 0 || servicesList.length === 0) {
    return "Loading...";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="view-visit">
      <div className="inner border-bottom">
        <Link to="/visits">{"<"} Back</Link>
      </div>

      <div className="inner border-bottom">
        <div className="row">
          <div className="col-10">
            <h1>
              {visitDetail[0].first_name} {visitDetail[0].middle_name}{" "}
              {visitDetail[0].last_name}
            </h1>
            <div className="visit-date">
              <strong>Visit Date:</strong> {visitDetail[0].visit_date}{" "}
              <strong>Time In:</strong>{" "}
              {changeTimeFormat(visitDetail[0].time_in)}{" "}
              <strong>Time Out:</strong>{" "}
              {changeTimeFormat(visitDetail[0].time_out)}
            </div>
            <div className="inner">
              <div className="smaller">{visitDetail[0].type_name}</div>
            </div>
          </div>
          <div className="col-2">
            <img
              src={`${process.env.REACT_APP_IMG_URL}` + visitDetail[0].image}
              className="client-image"
              alt={
                visitDetail[0].first_name +
                " " +
                visitDetail[0].middle_name +
                " " +
                visitDetail[0].last_name
              }
            />
          </div>
        </div>
      </div>

      <div className="inner border-bottom">
        <div className="row">
          <div className="col-12">
            <h2>Included Items</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="row inner border-bottom">
              <div className="col-8">
                <strong>Item</strong>
              </div>
              <div className="col-4 text-end">
                <strong>Amount</strong>
              </div>
            </div>
            {JSON.parse(visitDetail[0].service_id).map((d) => (
              <div className="row inner border-bottom" key={d}>
                <div className="col-8">
                  {
                    servicesList.filter((i) => i.id === parseInt(d))[0]
                      .service_name
                  }
                </div>
                <div className="col-4 text-end">
                  {Number(
                    servicesList.filter((i) => i.id === parseInt(d))[0].price
                  ).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="row inner border-bottom">
              <div className="col-8">
                <strong>Subtotal</strong>
              </div>
              <div className="col-4 text-end">
                {Number(visitDetail[0].subtotal).toFixed(2)}
              </div>
            </div>

            <div className="row inner border-bottom">
              <div className="col-8">
                <strong>Discount</strong> ({visitDetail[0].discount_name}){" "}
                {visitDetail[0].discount_discount_amount}
                {parseInt(visitDetail[0].discount_type) === 1 ? "%" : ""}
              </div>
              <div className="col-4 text-end">
                ({formatter.format(parseFloat(visitDetail[0].discount_amount))})
              </div>
            </div>

            <div className="row inner border-bottom">
              <div className="col-8">
                <strong>Additional Fee</strong>
              </div>
              <div className="col-4 text-end">
                {formatter.format(parseFloat(visitDetail[0].visit_type_fee))}
              </div>
            </div>

            <div className="row inner border-bottom">
              <div className="col-8">
                <strong>Total Amount</strong>
              </div>
              <div className="col-4 text-end">
                {formatter.format(parseFloat(visitDetail[0].total_amount))}
              </div>
            </div>
          </div>
        </div>

        <div className="row inner">
          <div className="col-12 smaller">
            Points Generated: {visitDetail[0].points}
          </div>
        </div>

        <div className="row inner">
          <div className="col-6 smaller">
            Health Division Representative: {visitDetail[0].hd_first_name}{" "}
            {visitDetail[0].hd_last_name}
          </div>
          <div className="col-6 smaller">
            wecollab Representative: {visitDetail[0].wc_first_name}{" "}
            {visitDetail[0].wc_last_name}
          </div>
        </div>
      </div>

      <div className="row border-bottom">
        <div className="inner">
          <h2>Reports</h2>
        </div>
      </div>
    </div>
  );
};

export default ViewVisit;
