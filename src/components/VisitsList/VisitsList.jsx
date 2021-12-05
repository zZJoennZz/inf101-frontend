import React from 'react';
import './visitslist.scss';

const VisitsList = (props) => {

    const { data } = props;

    return (
        data.map(e => 
            <div className="visits-list" key={e.visitId}>
                <div className="visits-list-inner">
                    <div className="row">
                        <div className="col-2">
                            <img src={e.userImg} alt={e.name} className="visits-list-client-img" />
                        </div>
                        <div className="col-8">
                            <div className="visits-list-info"><span className="visits-list-label">Client:</span> <span className="visits-list-client-name">{e.name}</span> <span className="visits-list-client-id">{e.clientId}</span></div>
                            <div className="visits-list-info"><span className="visits-list-label">Visit Date:</span> <span className="visits-list-date">{e.visitDate}</span></div>
                            <button className="visits-list-view"><i class="fas fa-folder-open"></i> View</button>
                        </div>
                        <div className="col-2">
                            <button className="visits-list-delete"><i class="fas fa-trash-alt"></i></button>
                            <button className="visits-list-print"><i class="fas fa-print"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default VisitsList;