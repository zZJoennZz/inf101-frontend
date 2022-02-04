import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewClient = () => {

    const dummyData = [
        {
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'firstName' : 'Joenn',
            'middleName' : 'Sese',
            'lastName' : 'Aquilino',
            'gender' : 1,
            'birthday' : '14/06/1996',
            'address' : 'Block 7 Lot 14 Phase 2, Amanda Village, Mabalas-balas',
            'city' : 'San Rafael',
            'province' : 'Bulacan',
            'zipCode' : '3008',
            'country' : 'Philippines',
            'contactNumber' : '0929 022 5464',
            'emailAddress' : 'zzjoennzz@gmail.com',
            'clientId' : '101-1' 
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'firstName' : 'Ena Lynn',
            'middleName' : 'Sese',
            'lastName' : 'Aquilino',
            'gender' : 2,
            'birthday' : '05/02/1974',
            'address' : 'Block 7 Lot 14 Phase 2, San Rafael Village 1, Mabalas-balas',
            'city' : 'San Rafael',
            'province' : 'Bulacan',
            'zipCode' : '3008',
            'country' : 'Philippines',
            'contactNumber' : '0929 022 5464',
            'emailAddress' : 'enalynnsese@gmail.com',
            'clientId' : '101-2' 
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'firstName' : 'Jewelynn',
            'middleName' : 'Sese',
            'lastName' : 'Aquilino',
            'gender' : 2,
            'birthday' : '26/05/1999',
            'address' : 'Block 7 Lot 14 Phase 2, San Rafael Village 1, Mabalas-balas',
            'city' : 'San Rafael',
            'province' : 'Bulacan',
            'zipCode' : '3008',
            'country' : 'Philippines',
            'contactNumber' : '0929 022 5464',
            'emailAddress' : 'jewelynnaquilino@gmail.com',
            'clientId' : '101-3' 
        },
    ];
    const { clientId } = useParams();

    const results = dummyData.filter(data => data.clientId === clientId);

    const userAddress = results[0].address + ', ' + results[0].city + ', ' + results[0].province + ', ' + results[0].country;

    return (
        <div className="view-client">
            <div className="view-client-inner">
                <div className="row">
                    <div className="col-12">
                        <Link to="/clients">{"<"} Back</Link>
                    </div>                    
                </div>
                <div className="row client-info">
                    <div className="col-6">
                        <img src={results[0].userImg} alt={results[0].firstName} className="client-img" />
                    </div>

                    <div className="col-6">
                        <button className="edit-btn"><i className="fas fa-user-edit"></i></button>
                    </div>
                </div>
                <div className="row client-info">
                    <div className="col-12">
                        <div className="client-name">{results[0].firstName + ' ' + results[0].middleName + ' ' + results[0].lastName} <span className="client-gender">{results[0].gender === 1 ? <i className="fas fa-mars" style={{'color': 'skyblue'}}></i> : <i className="fas fa-venus" style={{'color': 'pink'}}></i>} <span className="client-id">{results[0].clientId}</span></span></div>
                        <div className="client-birthday">{results[0].birthday}</div>
                    </div>
                </div>

                <div className="row client-info">
                    <div className="col-12">
                        <span className="client-address">
                            <a href={"https://www.google.com/maps/place/" + userAddress} target="_blank" rel="noreferrer">{userAddress}</a>
                        </span>
                    </div>
                </div>

                <div className="row client-info">
                    <div className="col-6 client-contact-num">
                        <i className="fas fa-phone"></i> {results[0].contactNumber}
                    </div>
                    <div className="col-6 client-email-address">
                        <i className="fas fa-envelope"></i> {results[0].emailAddress}
                    </div>
                </div>

                <div className="row client-info">
                    <div className="col-12">
                        <div className="sec-header">
                            Maintenance/Medications
                        </div>
                        <div className="client-main-card">
                            <div className="client-main-card-inner">
                                <div className="card-header">
                                    <span className="client-main-label">Maintenance: </span> Biogesic <span className="date-added">Date added: 21-11-2021</span>
                                </div>
                                <div className="card-body">
                                    500mg, 3 times a day
                                </div>
                            </div>
                        </div>

                        <div className="client-main-card">
                            <div className="client-main-card-inner">
                                <div className="card-header">
                                    <span className="client-main-label">Maintenance: </span> Biogesic <span className="date-added">Date added: 21-11-2021</span>
                                </div>
                                <div className="card-body">
                                    500mg, 3 times a day
                                </div>
                            </div>
                        </div>

                        <div className="client-main-card">
                            <div className="client-main-card-inner">
                                <div className="card-header">
                                    <span className="client-main-label">Maintenance: </span> Biogesic <span className="date-added">Date added: 21-11-2021</span>
                                </div>
                                <div className="card-body">
                                    500mg, 3 times a day
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row records-section">
                    <div className="col-10">
                        <div className="sec-header">
                            Records
                        </div>
                    </div>
                    <div className="col-2">
                        <Link to={"/clients/records/new/" + results[0].clientId}><button className="primary-btn" style={{'float' : 'right'}}>Add New</button></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="records-card"><button className="primary-btn" style={{'float' : 'right'}}><i className="fas fa-print"></i></button> <Link to={"/clients/records/" + results[0].clientId + "/1"}><button className="primary-btn" style={{'float' : 'right'}}>Open</button></Link>
                            <div className="records-card-service">myTherapy</div>
                            <div className="records-card-date"><span className="records-card-date-text">Treatment/Reading Date:</span> December 12, 2021</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewClient;