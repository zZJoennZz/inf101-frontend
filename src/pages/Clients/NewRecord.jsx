import React from 'react';
import { useParams, Link } from 'react-router-dom';

const NewRecord = () => {

    const { clientId } = useParams();

    return (
        <div className="view-records">
            <div className="container">
                <div className="record-header">
                    <div className="row">
                        <div className="col-12">
                            <Link to={"/clients/" + clientId}>{"<"} Back</Link>
                            <div className="page-header">
                                Add New Record
                            </div>
                        </div>
                        <div className="col-12">
                            {clientId}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRecord;
