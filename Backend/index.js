// index.js
const express = require('express');
const cors = require('cors');
const {Web3} = require('web3'); // Use Web3 version 4.x
const Web3Utils = require('web3-utils');

const app = express();
app.use(express.json());
app.use(cors()); 

const ganacheUrl = 'HTTP://127.0.0.1:7545'; // Replace with your Ganache RPC URL
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

const contractABI = [
  {
    "inputs": [],
    "name": "doctor_id",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "doctors",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "user_id",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "userAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mobile_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "reg_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "reg_yr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "state_med_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "aadhaar_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "usertype",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "doctorId",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "patientRecords",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "recordID",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "patientId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "patientName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "patientAddr",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "doctorId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "doctorName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "doctorAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "MedDescrip",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Medicine",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dosage",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "PrescripReuseLim",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "HospitalName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "patient_id",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "patients",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "user_id",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "userAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mobile_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "aadhaar_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "usertype",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "patientId",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "patientTotRecords",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pharmacies",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "user_id",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "userAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "pharmName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pharmBranch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mobile_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "aadhaar_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "usertype",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "pharmacyId",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "pharmacy_id",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "prescriptions",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "recordID",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "patientId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "patientName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "patientAddr",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "doctorId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "doctorName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "doctorAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "MedDescrip",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Medicine",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dosage",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "PrescripReuseLim",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "HospitalName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "record_id",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalUsers",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "userAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "getAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mobile_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_reg_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_reg_yr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_state_med_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_aadhaar_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_usertype",
        "type": "string"
      }
    ],
    "name": "addDoctorUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mobile_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_aadhaar_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_usertype",
        "type": "string"
      }
    ],
    "name": "addPatientUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_pharmName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pharmBranch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mobile_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_aadhaar_num",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_usertype",
        "type": "string"
      }
    ],
    "name": "addPharmacyUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDoctor",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPatient",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPharmacy",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_date",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "_patientId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "_patientName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_patientAddr",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "_doctorId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "_doctorName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_doctorAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_MedDescrip",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_Medicine",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dosage",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_PrescripReuseLim",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_HospitalName",
        "type": "string"
      }
    ],
    "name": "addNewPrescription",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_patientUserName",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "_recordId",
        "type": "uint32"
      }
    ],
    "name": "getPrescription",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "recordID",
            "type": "uint32"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "uint32",
            "name": "patientId",
            "type": "uint32"
          },
          {
            "internalType": "string",
            "name": "patientName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "patientAddr",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "doctorId",
            "type": "uint32"
          },
          {
            "internalType": "string",
            "name": "doctorName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "doctorAddr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "MedDescrip",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "Medicine",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dosage",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "PrescripReuseLim",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "HospitalName",
            "type": "string"
          }
        ],
        "internalType": "struct PRapp.prescription",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

  const contractAddress = '0x88364e51004AEdf7159F197D3F3925726C9c9076'; // Replace with the address of your deployed SupplyChain smart contract
  const inboxContract = new web3.eth.Contract(contractABI, contractAddress);
  const gasLimit = 900000; // Set your desired gas limit here

  app.post('/addDoctorUser', async (req, res) => {
    const { addr, usname, email, mobile_num, reg_num, reg_yr, state_med_name, aadhaar_num, password, usertype } = req.body;
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await inboxContract.methods.addDoctorUser(addr, usname, email, mobile_num, reg_num, reg_yr, state_med_name, aadhaar_num, password, usertype).send({ from: accounts[0], gas: gasLimit});
      res.json({ transactionHash: result.transactionHash });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Failed to add User' });
    }
  });

  app.post('/addPatientUser', async (req, res) => {
    const { addr, usname, email, mobile_num, aadhaar_num, password, usertype } = req.body;
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await inboxContract.methods.addPatientUser(addr, usname, email, mobile_num, aadhaar_num, password, usertype).send({ from: accounts[0], gas: gasLimit});
      res.json({ transactionHash: result.transactionHash });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Failed to add User' });
    }
  });

  app.post('/addPharmacyUser', async (req, res) => {
    const { addr, pharmName, pharmBranch, email, mobile_num, aadhaar_num, password, usertype } = req.body;
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await inboxContract.methods.addPharmacyUser(addr, pharmName, pharmBranch, email, mobile_num, aadhaar_num, password, usertype).send({ from: accounts[0], gas: gasLimit});
      res.json({ transactionHash: result.transactionHash });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Failed to add User' });
    }
  });

  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });



