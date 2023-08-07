import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Identity from './Identity';
import Link from 'next/link';

const Progress = () => {
    // const [next, setNext] = useState(false)
    // const [identity, setIdentity] = useState(false)
    // const [show, setShow] = useState(true)
    // const handleIdentity = () => {
    //    setIdentity(true)
    // }
    const handleNext = () => {
        setNext(true)
    }
    return (
        <div>
            <div className="container" style={{fontSize: "1.2rem"}}>
                <div className="content">
                    <div className="flex_box1">
                <div className="form-section r_align">
                            <h2 className='pr_title2'>Great Progress</h2>
                            <p className='prg_para'>Your profile is just a few steps away from going live.</p>
                            <label className='labal' htmlFor="city">Section A: Profile details</label> <br />
                            <p className='prg_para'>Doctor’s basic details, medical registration, <br />
                                education qualification, establishment details etc.</p>
                                <div className="flex_icon">
                                <Icon icon="teenyicons:tick-circle-solid" width={14} height={14} className='bl_icon' />
                                <Link href="/Health/doctors/profiles"><p color='blue'>change</p></Link>

                                </div>
                                <label className='labal' htmlFor="city">Section B: Profile verification</label> <br />
                            <p className='prg_para'>Doctor’s basic details, medical registration, <br />
                                education qualification, establishment details etc.</p><br />
                                <label className='labal' htmlFor="city">Section C: Start getting patients</label> <br />
                            <p className='prg_para'>start earning money </p>
                            <div className="flex_icon">
                                <Icon icon="teenyicons:tick-circle-solid" width={14} height={14} className='bl_icon' />
                                <Link href="/Health/doctors/profiles"><p color='blue'>change</p></Link>

                                </div>
                            <div className="flex m_3">
                            <button className='continue_btn1'><a href="/Health/doctors/profiles">Continue</a></button>
                            </div>
                        </div>
                    <div>
                    <div className="img-sec">
                        <img
                            src='/images/pages/doctor-profile-snapshot.png'
                            alt=''
                            style={{ maxWidth: '541px', width: '100%', height: 'auto' }}
                        />
                    </div> 
                    </div>
                    </div>
                    <div className="img_sec1">
                            <Box
                            sx={{
                                background: '#DFF8F6',
                                border: '2px solid #ACE5DF',
                                borderRadius: '4px',
                                color: '#40B09C',
                                maxWidth: '390px',
                                p: '18px'
                            }}
                        >
                            <Icon icon="heroicons-outline:light-bulb" color='#40B09C' width={22} height={22} />
                            <br />
                            This information helps us perform critical checks to ensure that only licensed and genuine medical
                            practitioners are listed on Practo. Your profile will get a “Verified” badge on verification. Doctors with
                            verified profiles get 95% more patient views on Practo.
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress
