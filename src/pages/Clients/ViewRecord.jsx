import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewRecord = () => {
    const { clientId, inputId } = useParams();
    return (
        <div className="view-records">
            <div className="container">
                <div className="record-header">
                    <div className="row">
                        <div className="col-12">
                            <Link to={"/clients/" + clientId}>{"<"} Back</Link>
                            <div className="page-header">
                                myHeart
                            </div>
                        </div>
                        {/* <div className="col-12">February 19, 2021</div>
                        <div className="col-12 header-title">Digital Wellness Solutions Report</div>
                        <div className="col-12">
                            <div className="client-name">101-1/IGNACIO, ERICK DEANG</div>
                            <div className="client-detail">Male / 37 / August 6, 1983</div>
                            <div className="client-address">012 Mabini St., Tibag, Baliwag, Bulacan 3006 Philippines</div>
                            <div className="client-contact">+63 942 486 4931 / extreme.edi@gmail.com</div>
                        </div> */}

                        <div className="col-12">
                            Record ID: {inputId}
                            <div className="form-line"><span className="form-label">Treatment/Reading Date:</span> 2021-10-09</div>
                            <div className="form-line"><span className="form-label">Recommendation:</span> Test</div>
                            <div className="form-line"><span className="form-label">Document saved and sent to client/cardiologist:</span> Yes</div>
                            <div className="form-line"><span className="form-label">Document printed and provided to client:</span> No</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewRecord;
