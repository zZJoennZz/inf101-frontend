import React from 'react';
import './clients.scss';

//components
import ClientList from '../../components/ClientsList/ClientsList';

const Clients = () => {
    const dummyData = [
        {
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'name' : 'Joenn S. Aquilino',
            'clientId' : '101-1' 
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'name' : 'Ena Lynn S. Aquilino',
            'clientId' : '101-2' 
        },{
            'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
            'name' : 'Jewelynn S. Aquilino',
            'clientId' : '101-3' 
        },
    ]
    return (
        <div className="clients">
            <div className="clients-inner">
                <div className="row">
                    <div className="col-9">
                        <h1>Clients</h1>
                        <h2>Manage your clients</h2>
                    </div>
                    <div className="col-3">
                        <button className="add-client">
                            <i class="fas fa-plus-square"></i> Add new
                        </button>
                    </div>
                </div>
                <hr className="divider" />
                <input type="text" className="clients-search" placeholder="Search..." />
                <div className="row clients-list">
                    <div className="col-12">
                        <ClientList data={dummyData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients
