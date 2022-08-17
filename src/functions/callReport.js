import ReportMyBody from "../components/Reports/ReportMyBody";
import ReportMyTherapyForBodyFullMat from "../components/Reports/ReportMyTherapyForBodyFullMat";
import ReportMyTherapyForBodyMiniMat from "../components/Reports/ReportMyTherapyForBodyMiniMat";
import ReportMyTherapyForFace from "../components/Reports/ReportMyTherapyForFace";
import ReportMyHeart from "../components/Reports/ReportMyHeart";
import ReportMyHealth from "../components/Reports/ReportMyHealth";

export const callReport = (reportName, visitId, reportId, clientId) => {
    if (reportName === "myBody") {
        return <ReportMyBody visitId={visitId} reportId={reportId} clientId={clientId} />
    } else if (reportName === "myTherapyFullMat") {
        return <ReportMyTherapyForBodyFullMat visitId={visitId} reportId={reportId} clientId={clientId} />
    } else if (reportName === "myTherapyMiniMat") {
        return <ReportMyTherapyForBodyMiniMat visitId={visitId} reportId={reportId} clientId={clientId} />
    } else if (reportName === "myTherapyForFace") {
        return <ReportMyTherapyForFace visitId={visitId} reportId={reportId} clientId={clientId} />
    } else if (reportName === "myHeart") {
        return <ReportMyHeart visitId={visitId} reportId={reportId} clientId={clientId} />
    } else if (reportName === "myHealth") {
        return <ReportMyHealth visitId={visitId} reportId={reportId} clientId={clientId} />
    }
}