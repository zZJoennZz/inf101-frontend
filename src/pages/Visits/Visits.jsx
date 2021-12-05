import React from 'react';
import './visits.scss';

//components
import VisitsList from '../../components/VisitsList/VisitsList';

const Visits = () => {
    const dummyData = [
        {
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'visitId' : '1',
            'name' : 'Joenn S. Aquilino',
            'clientId' : '101-1',
            'visitDate' : '2021-12-10'
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'visitId' : '3',
            'name' : 'Jewelynn S. Aquilino',
            'clientId' : '101-3',
            'visitDate' : '2021-12-6'
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'visitId' : '4',
            'name' : 'Ena Lynn S. Aquilino',
            'clientId' : '101-2',
            'visitDate' : '2021-12-6'
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'visitId' : '2',
            'name' : 'Joenn S. Aquilino',
            'clientId' : '101-1',
            'visitDate' : '2021-12-01'
        }
    ]
    return (
        <div className="visits">
            <div className="visits-inner">
                <div className="row">
                    <div className="col-9">
                        <h1>Visits</h1>
                        <h2>Manage client visits</h2>
                    </div>
                    <div className="col-3">
                        <button className="add-visit">
                            <i class="fas fa-plus-square"></i> Add new
                        </button>
                    </div>
                </div>
                <hr className="divider" />
                <input type="text" className="clients-search" placeholder="Search..." />
                <div className="row clients-list">
                    <div className="col-12">
                        <VisitsList data={dummyData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visits;
