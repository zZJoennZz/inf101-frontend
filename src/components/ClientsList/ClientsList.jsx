import React from 'react';
import { Link } from 'react-router-dom';

const ClientsList = (props) => {
    const { data } = props;
    return (
        data.map(e => 
            <div className="client-card" key={e.clientId}>
                <div className="row">
                    <div className="col-2">
                        <img src={e.userImg} alt={e.name} className="client-img" />
                    </div>
                    <div className="col-5">
                        <div className="client-name">{e.name}</div>
                        <div className="client-id">{e.clientId}</div>
                    </div>
                    <div className="col-5">
                        <div className="buttons-list">
                            <Link to={"/clients/" + e.clientId} className="view-button">
                                <i className="fas fa-folder-open"></i> View
                            </Link>
                            <button className="delete-button">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ClientsList
