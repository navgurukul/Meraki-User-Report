import React from 'react'
import { useState } from 'react';

export default function Home() {

    // Initialize state variables for the date inputs
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Event handler for when the start date changes
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // Event handler for when the end date changes
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    // Yoss

    const handleDownload = () => {
        console.log('Downloading file...');
        console.log(startDate, endDate, 'start and end date');
        // Replace 'https://api.example.com/file' with your actual API URL
        fetch(`http://localhost:5000/users/get-users-datas?start_date=${startDate}&end_date=${endDate}`)
            .then(response => response.blob()) // Assuming the response is a Blob
            .then(blob => {
                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);
                // Create a temporary <a> element and trigger a download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'downloadedFile'; // You can name the file here
                document.body.appendChild(a); // Append the <a> element to the document
                a.click(); // Trigger a click on the element to start the download
                window.URL.revokeObjectURL(url); // Clean up by revoking the Blob URL
                a.remove(); // Remove the <a> element
            })
            .catch(error => console.error('Error downloading file:', error));
    };

    return (
        <div style={{ width: '100%', display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div className='navbar' style={{
                // backgroundColor: '#55AD9B',  
                width: '100%',
                margin: '3rem',


            }}>
                <h1>Meraki's New Users</h1>
                <p style={{fontWeight:'bold'}}>
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
