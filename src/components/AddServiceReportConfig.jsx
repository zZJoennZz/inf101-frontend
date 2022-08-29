import React, { useState } from "react";
import { PlusSmIcon } from "@heroicons/react/outline";

function AddServiceReportConfig({ services, serviceReports, submitForm }) {
  const [reportConfig, setReportConfig] = useState({
    service_id: 0,
    service_report_id: 0,
  });

  function textOnChange(e) {
    setReportConfig((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function formSubmit(e) {
    e.preventDefault();
    submitForm(reportConfig);
  }
  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className="grid grid-cols-1 space-x-0 md:grid-cols-5 md:space-x-3 mb-5 md:mb-0">
          <div className="col-span-2">
            <label htmlFor="service_id" className="uppercase">
              Service:
            </label>
            <select
              className="form-input-text mb-2"
              name="service_id"
              id="service_id"
              onChange={textOnChange}
            >
              <option value={0}>Select</option>
              {services &&
                services.map((service) => (
                  <option value={service.id} key={service.id}>
                    {service.service_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="service_report_id" className="uppercase">
              Available Reports to Add:
            </label>
            <select
              name="service_report_id"
              id="service_report_id"
              className="form-input-text mb-3"
              onChange={textOnChange}
            >
              <option value={0}>Select</option>
              {serviceReports &&
                serviceReports.map((report) => (
                  <option value={report.id} key={report.id}>
                    {report.report_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="md:mt-6 bg-cyan-600 text-white w-full md:w-auto p-2 rounded hover:bg-cyan-500 transition-all ease-in-out"
            >
              <PlusSmIcon className="h-6 w-6 mx-auto" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddServiceReportConfig;
