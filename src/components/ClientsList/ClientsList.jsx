import React from 'react';
import { Link } from 'react-router-dom';

const ClientsList = (props) => {
    const { data, deleteClient } = props;
    return (
        data.map(e => 
            <div className="client-card" key={e.id}>
                <div className="row">
                    <div className="col-2">
                        <img src={process.env.REACT_APP_IMG_URL + e.image} alt={e.first_name} className="client-img" />
                    </div>
                    <div className="col-5">
                        <div className="client-name">{e.first_name + ' ' + e.middle_name + ' ' + e.last_name}</div>
                        <div className="client-id">{e.client_id}</div>
                    </div>
                    <div className="col-5">
                        <div className="buttons-list">
                            <Link to={"/clients/" + e.id} className="view-button">
                                <i className="fas fa-folder-open"></i> View
                            </Link>
                            <button onClick={deleteClient.bind(this, e.id)} className="delete-button">
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
