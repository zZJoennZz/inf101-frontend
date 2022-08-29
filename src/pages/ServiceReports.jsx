import { Link } from "react-router-dom";
import {
  ArrowCircleLeftIcon,
  ChevronDoubleRightIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  getServiceReportConfigurations,
  getServices,
  getServiceReports,
  postServiceReport,
  deleteServiceReportConfiguration,
} from "../functions/apiCalls";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ContentLoading from "../components/ContentLoading";
import AddServiceReportConfig from "../components/AddServiceReportConfig";
import { toast } from "react-toastify";

const ServiceReports = () => {
  const queryClient = useQueryClient();
  const getSrc = useQuery(["getSrc"], () => getServiceReportConfigurations(), {
    refetchOnWindowFocus: false,
  });
  const getServ = useQuery(["getService"], () => getServices(), {
    refetchOnWindowFocus: false,
  });
  const getServReps = useQuery(
    ["getServiceReport"],
    () => getServiceReports(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const postReportConfig = useMutation(postServiceReport, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["getSrc"]);
      toast(res.message);
    },
    onError: (res) => {
      toast(res.data.message);
    },
  });

  const deleteReportConfig = useMutation(deleteServiceReportConfiguration, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["getSrc"]);
      toast(res.message);
    },
    onError: (res) => {
      toast(res.data.message);
    },
  });

  async function addNew(frmData) {
    postReportConfig.mutate(frmData);
  }

  async function removeSrc(srcId) {
    let conf = window.confirm(
      "Are you sure to remove this report from this service?"
    );
    if (conf) {
      deleteReportConfig.mutate(srcId);
    }
  }

  return (
    <div>
      <div className="text-lg mb-3">
        <Link to="/manage-objects">
          <ArrowCircleLeftIcon className="h-7 w-7" />
        </Link>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold mb-4">Manage Service Reports</h1>

        <AddServiceReportConfig
          services={getServ.data && getServ.data.data}
          serviceReports={getServReps.data && getServReps.data.data}
          submitForm={addNew}
        />

        {getSrc.isLoading && getServ.isLoading && getServReps.isLoading && (
          <ContentLoading />
        )}
        {getSrc.isError &&
          getServ.isError &&
          getServReps.isError &&
          "Something went wrong. Cannot fetch report configurations."}

        <div>
          {getSrc.data &&
            getServ.data &&
            getServReps.data &&
            getServ.data.data.map((service) => (
              <div key={service.id}>
                <div className="p-4 transition-all ease-in-out bg-slate-100 hover:bg-slate-50 border border-slate-300 mb-3 rounded">
                  <div className="font-bold mb-3 text-cyan-600 text-lg">
                    {service.service_name}
                  </div>
                  <div className="italic text-slate-500 mb-2 font-bold text-sm">
                    Reports:
                  </div>
                  <div className="text-slate-500 ml-2 text-sm italic">
                    {getSrc.data.data.filter(
                      (config) => config.service_id === service.id
                    ).length <= 0 && (
                      <div className="text-slate-400">
                        No reports configured for this service
                      </div>
                    )}
                    {getSrc.data.data
                      .filter((config) => config.service_id === service.id)
                      .map((service_config) => (
                        <div
                          key={service_config.id}
                          className="flex items-center"
                        >
                          <ChevronDoubleRightIcon className="h-3 w-3 mr-3 inline-block text-slate-300" />
                          <TrashIcon
                            className="h-5 w-5 mr-3 text-red-500 cursor-pointer hover:text-red-400"
                            onClick={removeSrc.bind(this, service_config.id)}
                          />

                          {service_config.report_name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceReports;
