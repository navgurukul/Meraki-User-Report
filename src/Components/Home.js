import React from 'react'
import { useState } from 'react';
import axios from 'axios';


export default function Home() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // Event handler for when the end date changes
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleDownload = () => {
        axios.get(`${BASE_URL}/users/get-users-datas?start_date=${startDate}&end_date=${endDate}`, {
            responseType: 'blob',
            headers: {
                accept: "application/json",
            },
        })
            .then(response => {
                console.log(response, 'response');
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'downloadedFile.csv'; // Naming the file with a .csv extension
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            })
            .catch(error => {
                console.log(error, 'There was an error!');
            }
            );

    };
    return (
        <div className='lll' style={{ width: '100%', display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div className='navbar' style={{
                // backgroundColor: '#55AD9B',  
                width: '100%',
                margin: '3rem',


            }}>
                <h1>Meraki's New Users</h1>
                <p style={{ fontWeight: 'bold' }}>
                    Download the data of new users who have joined Meraki between two dates.
                </p>
            </div>
            <div className='input-box' style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'white',
                width: '500px',
                margin: 'auto',
                backgroundColor: '#D8EFD3',
            }}>
                <label

                    style={{
                        color: 'black',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        textAlign: 'left',
                        // marginTop: '1rem',
                    }}
                    htmlFor="startDate"
                >
                    Start Date
                </label>
                <input type="date" value={startDate}
                    onChange={handleStartDateChange} style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        color: 'black',
                        height: '25px',
                        // backgroundColor: '#D8EFD3',
                    }} />
                <label
                    className="form-label"
                    htmlFor="grid-first-name"
                    style={{
                        marginTop: '2rem',
                        color: 'black',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        textAlign: 'left',
                    }}
                >
                    End Date
                </label>
                <input type="date" value={endDate}
                    onChange={handleEndDateChange}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        color: 'black',
                        height: '25px',
                        // backgroundColor: '#D8EFD3',
                    }} />
                <button onClick={handleDownload} style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    // backgroundColor: '#007bff',
                    backgroundColor: '#55AD9B',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    height: '50px',
                    marginTop: '2rem',
                }}>Download
                </button>

                {/* <h1 style={{color:'black',padding:'1rem'}}>Downloade File</h1> */}
            </div>
        </div>
    )
}
