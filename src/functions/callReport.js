import ReportMyBody from "../components/Reports/ReportMyBody";
import ReportMyTherapyForBodyFullMat from "../components/Reports/ReportMyTherapyForBodyFullMat";
import ReportMyTherapyForBodyMiniMat from "../components/Reports/ReportMyTherapyForBodyMiniMat";
import ReportMyTherapyForFace from "../components/Reports/ReportMyTherapyForFace";
import ReportMyHeart from "../components/Reports/ReportMyHeart";
import ReportMyHealth from "../components/Reports/ReportMyHealth";
import ReportMyFitness from "../components/Reports/ReportMyFitness";
import ReportMyConsultation from "../components/Reports/ReportMyConsultation";
import ReportMyLife from "../components/Reports/ReportMyLife";
import ReportMyCommunity from "../components/Reports/ReportMyCommunity";

export const callReport = (reportName, visitId, reportId, clientId) => {
  if (reportName === "myBody") {
    return (
      <ReportMyBody visitId={visitId} reportId={reportId} clientId={clientId} />
    );
  } else if (reportName === "myTherapyFullMat") {
    return (
      <ReportMyTherapyForBodyFullMat
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myTherapyMiniMat") {
    return (
      <ReportMyTherapyForBodyMiniMat
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myTherapyForFace") {
    return (
      <ReportMyTherapyForFace
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myHeart") {
    return (
      <ReportMyHeart
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myHealth") {
    return (
      <ReportMyHealth
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myFitness") {
    return (
      <ReportMyFitness
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myConsultation") {
    return (
      <ReportMyConsultation
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else if (reportName === "myLife") {
    return (
      <ReportMyLife visitId={visitId} reportId={reportId} clientId={clientId} />
    );
  } else if (reportName === "myCommunity") {
    return (
      <ReportMyCommunity
        visitId={visitId}
        reportId={reportId}
        clientId={clientId}
      />
    );
  } else {
    return <div>Invalid report</div>;
  }
};
