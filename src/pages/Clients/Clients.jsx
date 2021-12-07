import React from 'react';
import './clients.scss';

//components
import ClientList from '../../components/ClientsList/ClientsList';
import Modal from '../../components/Modal/Modal';
import TextInput from '../../components/FormElements/TextInput';
import DropdownSelect from '../../components/FormElements/Dropdown';
import Button from '../../components/FormElements/Button';

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
    ];

    return (
        <div className="clients">
            <div className="clients-inner">
                <div className="row">
                    <div className="col-9">
                        <h1>Clients</h1>
                        <h2>Manage your clients</h2>
                    </div>
                    <div className="col-3">
                        <Modal 
                            content={<NewClient />} 
                            title="Add new client" 
                            defaultMode={false} 
                            buttonText="Add new"
                            buttonClass="add-client" 
                            buttonIcon="plus-square"
                        />
                    </div>
                </div>
                <hr className="divider" />
                <input type="text" className="clients-search" placeholder="Search..." style={{width: '100%'}} />
                <div className="row clients-list">
                    <div className="col-12">
                        <ClientList data={dummyData} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const NewClient = () => {

    const genders = [
        {
            'id': 1,
            'label': 'Male',
            'value': 1
        },{
            'id': 2,
            'label': 'Female',
            'value': 2
        }
    ]
    return (
        <div className="new-client">
            <form className="new-client-form" name="new-client-form" id="new-client-form">
                <div className="row">
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="First Name:" 
                            type="text" 
                            className="new-client-text" 
                            name="first-name" id="first-name" 
                            placeholder="Juan" 
                            style={{width: '100%'}} 
                        />
                    </div>
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="Middle Name:" 
                            type="text" 
                            className="new-client-text" 
                            name="middle-name" id="middle-name" 
                            placeholder="Middle name" 
                            style={{width: '100%'}} 
                        />
                    </div>
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="Last Name:" 
                            type="text" 
                            className="new-client-text" 
                            name="last-name" id="last-name" 
                            placeholder="Dela Cruz" 
                            style={{width: '100%'}} 
                        /> 
                    </div>
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="Last Name:" 
                            type="text" 
                            className="new-client-text" 
                            name="suffix" id="suffix" 
                            placeholder="e.g. Jr." 
                            style={{width: '100%'}} 
                        /> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-5 new-client-form-field">
                        <DropdownSelect
                            inputLabel="Gender:"
                            className="new-client-select"
                            name="gender" id="gender"
                            options={genders}
                            style={{width: '100%'}}
                            defaultOption="Select Gender"
                        />
                    </div>
                    <div className="col-7 new-client-form-field">
                        <TextInput
                            inputLabel="Birthday:" 
                            type="date" 
                            className="new-client-text" 
                            name="birthday" id="birthday" 
                            style={{width: '100%'}} 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 new-client-form-field">
                        <TextInput 
                            inputLabel="Address:"
                            type="text"
                            className="new-client-text"
                            name="address" id="address"
                            placeholder="Line 1 address"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="City:"
                            type="text"
                            className="new-client-text"
                            name="city" id="city"
                            placeholder="City"
                            style={{width: '100%'}}
                        />
                    </div>

                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Province:"
                            type="text"
                            className="new-client-text"
                            name="province" id="province"
                            placeholder="Province"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Zip Code:"
                            type="text"
                            className="new-client-text"
                            name="zip_code" id="zip_code"
                            placeholder="0000"
                            style={{width: '100%'}}
                        />
                    </div>

                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Country:"
                            type="text"
                            className="new-client-text"
                            name="country" id="country"
                            value="Philippines"
                            style={{width: '100%'}}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Contact Number:"
                            type="text"
                            className="new-client-text"
                            name="contact_number" id="contact_number"
                            placeholder="0999 999 9999"
                            style={{width: '100%'}}
                        />
                    </div>

                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Email Address:"
                            type="text"
                            className="new-client-text"
                            name="email_address" id="email_address"
                            placeholder="example@example.com"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Button
                            text="Save Profile"
                            name="save_profile" id="save_profile"
                            icon="save"
                            style={{marginRight: '5px'}}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Clients;