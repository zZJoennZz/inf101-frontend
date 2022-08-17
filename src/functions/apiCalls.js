import axios from "axios";

axios.defaults.headers.common["Allow-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.validateStatus = true;

//start clients functions
export async function getClients() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const res = await axios.get(`client`, config);
  return res.data;
}

export async function getClient(clientId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const res = await axios.get(`client/${clientId}`, config);
  return res.data;
}

export async function postClient(frmData) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(`client`, frmData, config);
  return response.data;
}

export async function delClient(clientId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.delete(`client/${clientId}`, config);

  return response.data;
}

export async function putClient(data) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(
    `client/${data.clientId}?_method=PUT`,
    data.data,
    config
  );

  return response.data;
}
//end clients functions

//start reports functions

export async function getServiceReportRecords(visitId, reportId, clientId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.get(
    `service_report_records/${visitId}/${reportId}/${clientId}`,
    config
  );

  return response.data;
}

export async function postServiceReportRecords(frmData) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.post(`service_report_records`, frmData, config);

  return response.data;
}

export async function editServiceReportRecords(frmData) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.put(
    `service_report_records/${frmData.currReport}`,
    frmData,
    config
  );

  return response.data;
}

//end reports functions

// start user accounts

export async function getUsers() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.get(`users_list`, config);

  return response.data;
}

// end user accounts

// start visits

export async function getVisits() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.get(`visit`, config);

  return response.data;
}

export async function postVisit(frmData) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.post(`visit`, frmData, config);

  return response.data;
}

// end visits

// start service report configurations

export async function getServiceReportConfigurations() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.get(`service_report_config`, config);

  return response.data;
}

export async function postServiceReportConfiguration() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.post(`service_report_config`, null, config);

  return response.data;
}

// end service report configurations

// start service

export async function getServices() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.get(`service`, config);

  return response.data;
}

// end service

// start service report

export async function getServiceReports() {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.get("service_report", config);

  return response.data;
}

export async function postServiceReport(frmData) {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const response = await axios.post("service_report_config", frmData, config);
  return response.data;
}

// end service report
