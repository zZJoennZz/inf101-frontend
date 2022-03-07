import React from 'react';
import { Navigate } from 'react-router-dom';
import './clients.scss';

import { toast } from 'react-toastify';

//components
import ClientList from '../../components/ClientsList/ClientsList';
import Modal from '../../components/Modal/Modal';
import TextInput from '../../components/FormElements/TextInput';
import DropdownSelect from '../../components/FormElements/Dropdown';
import Button from '../../components/FormElements/Button';

import { regions, provinces, cities, barangays } from 'select-philippines-address';

import api from '../../api/api';

import axios from 'axios';

const Clients = ({ isAuthenticated }) => {
    let  [clientList, setClientList] = React.useState(false);

    React.useEffect(() => {
        let isSub = true;
        const getClients  = async () => {
            await api.get('client')
                .then(res => isSub ? setClientList(res.data.data) : null)
                .catch(err => isSub ? setClientList(false) : null);
        }
        getClients();
        return () => (isSub = false)
    }, []);
    // const dummyData = [
    //     {
    //         'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
    //         'name' : 'Joenn S. Aquilino',
    //         'clientId' : '101-1' 
    //     },{
    //         'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
    //         'name' : 'Ena Lynn S. Aquilino',
    //         'clientId' : '101-2' 
    //     },{
    //         'userImg' : 'https://i.postimg.cc/YqDt5jpm/user-img.jpg',
    //         'name' : 'Jewelynn S. Aquilino',
    //         'clientId' : '101-3' 
    //     },
    // ];

    return (
        <>
            {
                !isAuthenticated ?
                    <Navigate to="/" />
                :
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
                                    {
                                        !clientList ?
                                            <>Loading...</>
                                        :
                                            <ClientList data={clientList} />
                                    }
                                </div>
                            </div>
                        </div>  
                    </div> 
            }
        </>
    )
}

const NewClient = () => {

    let [frmData, setFrmData] = React.useState(false);
    let [regionsList, setRegionsList] = React.useState(false);
    let [provincesList, setProvincesList] = React.useState(false);
    let [citiesList, setCitiesList] = React.useState(false);
    let [barangaysList, setBarangaysList] = React.useState(false);

    let [ctImage, setCtImage] = React.useState(false);
    let [ctSig, setCtSig] = React.useState(false);

    const onSubmitFrm = async (e) => {
        e.preventDefault();
        let imageData = new FormData();
        let imgPath, sigPath;
        imageData.append('image', ctImage);
        imageData.append('sig', ctSig);

        await axios.post(process.env.REACT_APP_API_IMG, imageData)
            .then(res => {
                imgPath = res.data.img_url;
                sigPath = res.data.sig_url;
            })
            .catch(err => {
                console.log(err)
                return;
            });
        let data = new FormData();
        for (var key of Object.keys(frmData)) {
            data.append(key, frmData[key]);
        }
        data.append('image', imgPath);
        data.append('signature', sigPath);
        await api.post(`client`, data)
            .then(res => {
                toast('Client profile added!');
            });
    }

    const onChangeText = async (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value
        setFrmData({...frmData, [fieldName] : fieldValue})

        switch (fieldName) {
            case "region":
                await provinces(fieldValue).then(province => setProvincesList(province));
                break;
            case "province":
                await cities(fieldValue).then(cities => setCitiesList(cities));
                break;
            case "city" :
                await barangays(fieldValue).then(bgry => setBarangaysList(bgry));
                break;
            default:
                break;
        }
    }

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

    React.useEffect(() => {
        regions().then((region) => setRegionsList(region));
    }, []);

    return (
        <div className="new-client">
            <form className="new-client-form" onSubmit={onSubmitFrm} name="new-client-form" id="new-client-form">
                <div className="row">
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="First Name:" 
                            onChange={onChangeText} required
                            type="text" 
                            className="new-client-text" 
                            name="first_name" id="first_name" 
                            placeholder="Juan" 
                            style={{width: '100%'}} 
                        />
                    </div>
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="Middle Name:" 
                            onChange={onChangeText} required
                            type="text" 
                            className="new-client-text" 
                            name="middle_name" id="middle_name" 
                            placeholder="Middle name" 
                            style={{width: '100%'}} 
                        />
                    </div>
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="Last Name:" 
                            onChange={onChangeText} required
                            type="text" 
                            className="new-client-text" 
                            name="last_name" id="last_name" 
                            placeholder="Dela Cruz" 
                            style={{width: '100%'}} 
                        /> 
                    </div>
                    <div className="col-3 new-client-form-field">
                        <TextInput 
                            inputLabel="Suffix:" 
                            onChange={onChangeText} required
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
                            onChange={onChangeText} required
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
                            onChange={onChangeText} required
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
                            onChange={onChangeText} required
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
                        {
                            regionsList && 
                            <div>
                                <label htmlFor="region">Region:</label>
                                <select className="new-client-text" style={{width: '100%'}} name="region" id="region" onChange={onChangeText} required> 
                                    <option value={0}>Select Region</option>
                                    {
                                        regionsList.map(d => 
                                            <option key={d.region_code} value={d.region_code}>{d.region_name}</option>   
                                        )
                                    }
                                </select>
                            </div>
                        }
                    </div>

                    <div className="col-6 new-client-form-field">
                        {
                            provincesList &&
                            <div>
                                <label htmlFor="province">Province:</label>
                                <select className="new-client-text" style={{width: '100%'}} name="province" id="province" onChange={onChangeText} required> 
                                    <option value={0}>Select Province</option>
                                    {
                                        provincesList.map(d => 
                                            <option key={d.province_code + d.id} value={d.province_code}>{d.province_name}</option>   
                                        )
                                    }
                                </select>
                            </div>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        {
                            citiesList && 
                            <div>
                                <label htmlFor="city">City:</label>
                                <select className="new-client-text" style={{width: '100%'}} name="city" id="city" onChange={onChangeText} required> 
                                    <option value={0}>Select City</option>
                                    {
                                        citiesList.map(d => 
                                            <option key={d.city_code + d.id} value={d.city_code}>{d.city_name}</option>   
                                        )
                                    }
                                </select>
                            </div>
                        }
                    </div>

                    <div className="col-6 new-client-form-field">
                        {
                            barangaysList &&
                            <div>
                                <label htmlFor="province">Barangay:</label>
                                <select className="new-client-text" style={{width: '100%'}} name="barangay" id="barangay" onChange={onChangeText} required> 
                                    <option value={0}>Select Barangay</option>
                                    {
                                        barangaysList.map(d => 
                                            <option key={d.brgy_code + d.id} value={d.brgy_code}>{d.brgy_name}</option>   
                                        )
                                    }
                                </select>
                            </div>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Zip Code:"
                            onChange={onChangeText} required
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
                            onChange={onChangeText} required
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
                            onChange={onChangeText} required
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
                            onChange={onChangeText} required
                            type="email"
                            className="new-client-text"
                            name="email_address" id="email_address"
                            placeholder="example@example.com"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Facebook:"
                            onChange={onChangeText} required
                            type="text"
                            className="new-client-text"
                            name="facebook" id="facebook"
                            placeholder="Enter your Facebook username"
                            style={{width: '100%'}}
                        />
                    </div>

                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Instagram:"
                            onChange={onChangeText} required
                            type="text"
                            className="new-client-text"
                            name="instagram" id="instagram"
                            placeholder="Enter your Facebook username"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>

                <div className="row new-client-form-field">
                    <div className="col-12">
                        <TextInput
                            inputLabel="Maintenance:"
                            onChange={onChangeText} required
                            type="text"
                            className="new-client-text"
                            name="maintenance" id="maintenance"
                            placeholder="Enter client maintenance"
                            style={{width: '100%'}}
                        />  
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Signature:"
                            onChange={(e) => setCtSig(e.target.files[0])} required
                            type="file"
                            className="new-client-text"
                            name="signature" id="signature"
                            style={{width: '100%'}}
                            accept="image/png, image/jpg, image/jpeg"
                            />  
                    </div>
                    <div className="col-6 new-client-form-field">
                        <TextInput
                            inputLabel="Image:"
                            onChange={(e) => setCtImage(e.target.files[0])} required
                            type="file"
                            className="new-client-text"
                            name="image" id="image"
                            style={{width: '100%'}}
                            accept="image/png, image/jpg, image/jpeg"
                        />  
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Button
                            text="Save Profile"
                            name="save_profile" id="save_profile"
                            icon="save"
                            type="submit"
                            style={{marginRight: '5px'}}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Clients;