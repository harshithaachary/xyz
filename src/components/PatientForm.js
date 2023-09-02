import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contactDetails: '',
    medicalHistory: '',
  });
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createPatient = async () => {
    try {
      await axios.post('http://localhost:8084/api/patients', formData);
      setFormData({
        name: '',
        age: '',
        gender: '',
        contactDetails: '',
        medicalHistory: '',
      });
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const updatePatient = async () => {
    try {
      await axios.put(`http://localhost:8084/api/patients/${patientId}`, formData);
      setFormData({
        name: '',
        age: '',
        gender: '',
        contactDetails: '',
        medicalHistory: '',
      });
      setPatientId(null);
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const editPatient = (patient) => {
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contactDetails: patient.contactDetails,
      medicalHistory: patient.medicalHistory,
    });
    setPatientId(patient.id);
  };

  return (
    <div>
      <h3>Add/Update Patient</h3>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        <label>Contact Details:</label>
        <input
          type="text"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={handleInputChange}
        />
        <label>Medical History:</label>
        <input
          type="text"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleInputChange}
        />
        {patientId ? (
          <button type="button" onClick={updatePatient}>
            Update
          </button>
        ) : (
          <button type="button" onClick={createPatient}>
            Add
          </button>
        )}
      </form>
      <h3>Patient List</h3>
      {patients.length > 0? (
<ul>
{patients.map((patient) => (
<li key={patient.id}>
<span>{patient.name}</span>
<button type="button" onClick={() => editPatient(patient)}>
Edit
</button>
<button type="button" onClick={() => deletePatient(patient.id)}>
Delete
</button>
</li>
))}
</ul>
) : (
<p>No patients found</p>
)}
</div>
);
};

export default PatientForm;
