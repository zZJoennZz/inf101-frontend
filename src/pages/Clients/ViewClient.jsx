import React from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../../api/api';

import { regions, provinces, cities, barangays } from 'select-philippines-address';

const ViewClient = () => {
    let [clientDetail, setClientDetail] = React.useState(false);

    let [regionsList, setRegionsList] = React.useState(false);
    let [provincesList, setProvincesList] = React.useState(false);
    let [citiesList, setCitiesList] = React.useState(false);
    let [barangaysList, setBarangaysList] = React.useState(false);

    const { clientId } = useParams();

    React.useEffect(() => {
        const getClient = async () => {
            await api.get(`client/${clientId}`)
                .then(res => {
                    setClientDetail(res.data.data)
                    regions().then(region => setRegionsList(region))
                    provinces(res.data.data.region).then(province => setProvincesList(province))
                    cities(res.data.data.province).then(city => setCitiesList(city))
                    barangays(res.data.data.city).then(barangay => setBarangaysList(barangay))
                })
                .catch(err => setClientDetail(false))
        }
        getClient();
    }, [clientId]);
    
    return (
        <div className="view-client">
            {
                !clientDetail ?
                    <div className="view-client-inner">Loading...</div>
                :
                    <div className="view-client-inner">
                        <div className="row">
                            <div className="col-12">
                                <Link to="/clients">{"<"} Back</Link>
                            </div>                    
                        </div>
                        <div className="row client-info">
                            <div className="col-6">
                                <img src={process.env.REACT_APP_IMG_URL + clientDetail.image} alt={clientDetail.first_name} className="client-img" />
                            </div>

                            <div className="col-6">
                                <button className="edit-btn"><i className="fas fa-user-edit"></i></button>
                            </div>
                        </div>
                        <div className="row client-info">
                            <div className="col-12">
                                <div className="client-name">{clientDetail.first_name + ' ' + clientDetail.middle_name + ' ' + clientDetail.last_name} <span className="client-gender">{clientDetail.gender === 1 ? <i className="fas fa-mars" style={{'color': 'skyblue'}}></i> : <i className="fas fa-venus" style={{'color': 'pink'}}></i>} <span className="client-id">{clientDetail.client_id}</span></span></div>
                                <div className="client-birthday">{clientDetail.birthday}</div>
                            </div>
                        </div>

                        <div className="row client-info">
                            <div className="col-12">
                                <span className="client-address">
                                    {
                                        !regionsList || !provincesList || !citiesList || !barangaysList ?
                                            'Loading...'
                                        :
                                        clientDetail.address + ", " + barangaysList.filter(d => d.brgy_code === clientDetail.barangay)[0].brgy_name + ", " + citiesList.filter(d => d.city_code === clientDetail.city)[0].city_name + ", " + provincesList.filter(d => d.province_code === clientDetail.province)[0].province_name + ", " + regionsList.filter(d => d.region_code === clientDetail.region)[0].region_name
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="row client-info">
                            <div className="col-6 client-contact-num">
                                <i className="fas fa-phone"></i> {clientDetail.contact_number}
                            </div>
                            <div className="col-6 client-email-address">
                                <i className="fas fa-envelope"></i> {clientDetail.email_address}
                            </div>
                        </div>

                        <div className="row client-info">
                            <div className="col-12">
                                <div className="sec-header">
                                    Maintenance
                                </div>
                                <div className="client-main-card">
                                    <div className="client-main-card-inner">
                                        <div className="card-body">
                                            {clientDetail.maintenance}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row records-section">
                            <div className="col-10">
                                <div className="sec-header">
                                    Records
                                </div>
                            </div>
                            <div className="col-2">
                                <Link to={"/clients/records/new/" + clientDetail.clientId}><button className="primary-btn" style={{'float' : 'right'}}>Add New</button></Link>
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="col-12">
                                <div className="records-card"><button className="primary-btn" style={{'float' : 'right'}}><i className="fas fa-print"></i></button> <Link to={"/clients/records/" + clientDetail.clientId + "/1"}><button className="primary-btn" style={{'float' : 'right'}}>Open</button></Link>
                                    <div className="records-card-service">myTherapy</div>
                                    <div className="records-card-date"><span className="records-card-date-text">Treatment/Reading Date:</span> December 12, 2021</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
            }
        </div>
    )
}

export default ViewClient;