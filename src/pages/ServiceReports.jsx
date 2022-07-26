import { Navigate, Link } from "react-router-dom";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

const ServiceReports = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className="text-lg mb-3">
        <Link to="/manage-objects">
          <ArrowCircleLeftIcon className="h-7 w-7" />
        </Link>
      </div>
      <div className="text-2xl text-slate-400 text-center italic">
        This page is not yet available.
      </div>
    </div>
  );
};

export default ServiceReports;
