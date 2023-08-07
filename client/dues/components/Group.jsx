import React, { useEffect, useState } from 'react';
import { useAddDuesMutation } from '../../pages/store/vtpassApi';
// import Select2 from 'react-select2-wrapper';


const Group = () => {

    const [serviceType, setServiceType] = useState("");
    const [subscription, setSubscription] = useState("");
    const [groupService, setGroupService] = useState();
    const [amount, setAmount] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [serviceId, setServiceId] = useState('');
    const [platform, setPlatform] = useState('');
    const getRequest = async()=>{
      try {
       const response = await fetch('http://localhost:3000/api/v1/dues')
       const data = await response.json()
       console.log(data);
      } catch (error) {
       console.log(error);
      }
     }
     
      //  const submitForm = async () => {
      //    try {
      //      const myHeaders = new Headers();
      //      myHeaders.append('Content-Type', 'application/json');
     
      //      const data = {
      //        serviceType,
      //        subscription,
      //        groupService,
      //        mobileNumber,
      //        amount,
      //      };
     
      //      const requestOptions = {
      //        method: 'POST',
      //        headers: myHeaders,
      //        body: JSON.stringify(data),
      //        redirect: 'follow',
      //      };
     
      //      const response = await fetch('http://localhost:3000/api/v1/dues/', requestOptions);
      //      const result = await response.json();
      //      console.log(result);
      //    } catch (error) {
      //      console.log('error', error);
      //    }
      //    setAmount('');
      //    setMobileNumber('');
      //    setServiceType('');
      //    setSubscription('');
      //    setGroupService('');
      //  };
       const [addDues] = useAddDuesMutation();
       const [data, setData] = useState([])
       const submitForm = async (e) => {
        e.preventDefault();
        addDues({ service_id: serviceId, platform: platform });
      };


    return (
        <>
        <div className="form-group row">
                    <label className="col-lg-5 col-form-label"> Type</label>
                    <div className="col-lg-7">
                      <select className="form-control" value={serviceType} onChange={(e)=> setServiceType(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option value="Groups/Association">Groups/Association</option>
                        <option value="Service/Subscription">Service Subscription</option>
                      </select>
                    </div>
                  </div>
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Group or Service Type </label>
                <div className="col-lg-7">
                <select className="form-control" value={groupService} onChange={(e)=> setGroupService(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option value="Sons of the Propheton">Sons of the Prophet</option>
                        <option value="Peoples Club of Nigeria">Peoples Club of Nigeria</option>
                        <option value="Born Again Association">Born Again Association</option>
                      </select>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Subscription Name </label>
                <div className="col-lg-7">
                <select className="form-control" value={subscription} onChange={(e)=> setSubscription(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option value="Monthly Prophetic">Monthly Prophetic</option>
                        <option value="Case 2">Case 2</option>
                        <option value="Case 3">Case 3</option>
                      </select>
                </div>
            </div>
         
            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Mobile Number</label>
                <div className="col-lg-7">
                    <input type="text" className="form-control" name='mobileNumber' value={serviceId} placeholder="Mobile Phone Number" onChange={(e)=> setServiceId(e.target.value)}  />
                </div>
            </div>



            <div className="form-group row">
                <label className="col-lg-5 col-form-label">Amount</label>
                <div className="col-lg-7">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="mySpanClass input-group-text" id="basic-addon1">₦</span>
                        </div>
                        <input type="text" className="form-control" onChange={(e)=> setPlatform(e.target.value)} value={platform} placeholder="Amount" aria-label="amount" />
                    </div>
                </div>
            </div>
                <br />
                <div className="text-right">
                    <button type="submit" className="btn btn-primary" onClick={submitForm}>
                      Submit
                    </button>
                  </div>
        </>
    )
}
export default Group;