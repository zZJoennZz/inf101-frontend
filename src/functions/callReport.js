import ReportMyBody from "../components/Reports/ReportMyBody";
export const callReport = (reportName, visitId, reportId, clientId) => {
    if (reportName === "myBody") {
        return <ReportMyBody visitId={visitId} reportId={reportId} clientId={clientId} />
    }
}