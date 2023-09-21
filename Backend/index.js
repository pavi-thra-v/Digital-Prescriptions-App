// index.js
const express = require('express');
const cors = require('cors');
const {Web3} = require('web3'); // Use Web3 version 4.x
const bodyParser = require('body-parser');
const session = require('express-session');
const Web3Utils = require('web3-utils');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
app.use(session({
  secret: 'a1b3c7d1p5f6g7r8i9j0!@#$%^&*()',
  resave: false,
  saveUninitialized: true
}));

const path = require("path");

// Serve the front-end files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, "../frontend/public")));
// Set the correct MIME type for JavaScript files
app.get("*.js", (req, res, next) => {
  res.set("Content-Type", "text/javascript");
  next();
});

app.get("/Home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "index.html"));
});
app.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "login.html"));
});
app.get("/addDoctorUser", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "doctor_reg.html"));
});
app.get("/homeDoctor", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "doc_home.html"));
});
app.get("/DoctorProfile", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "doctor_profile.html"));
});
app.get("/addPatientUser", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "patient_reg.html"));
});
app.get("/homePatient", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "pat_home.html"));
});
app.get("/PatientProfile", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "patient_profile.html"));
});
app.get("/addPharmacyUser", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "pharmacy_reg.html"));
});
app.get("/homePharmacy", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "pharm_home.html"));
});
app.get("/PharmacyProfile", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "pharmacy_profile.html"));
});
app.get("/NewPrescription", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "prescription.html"));
});

var userAddress;
const ganacheUrl = 'HTTP://127.0.0.1:7545'; // Replace with your Ganache RPC URL
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

const contractABI =  [
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
      },
      {
        "internalType": "string",
        "name": "_radiobtn",
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
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "getUserId",
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
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "getPatName",
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
    "name": "getDocName",
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
        "internalType": "string",
        "name": "_patientUsername",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doctorUsername",
        "type": "string"
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
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_recordId",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "_PresReuseLim",
        "type": "uint8"
      }
    ],
    "name": "updatePresReuse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

  const contractAddress = '0xB810CeC857C956387F8f4e9c3e31859B83e55d70'; // Replace with the address of your deployed SupplyChain smart contract
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
    const { addr, phname, phbranch, email, mobile_num, aadhaar_num, password, usertype } = req.body;
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await inboxContract.methods.addPharmacyUser(addr, phname, phbranch, email, mobile_num, aadhaar_num, password, usertype).send({ from: accounts[0], gas: gasLimit});
      res.json({ transactionHash: result.transactionHash });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Failed to add User' });
    }
  });

  app.post('/NewPrescription', async (req, res) => {
    const {date, patUsername, docUsername, MedDescrip, Medicine, dosage, PrescripReuseLim, HospitalName} = req.body;
    userAddress = await inboxContract.methods.getAddress(docUsername).call();
    console.log(userAddress);
    try {
      const result = await inboxContract.methods.addNewPrescription(date, patUsername, docUsername, MedDescrip, Medicine, dosage, PrescripReuseLim, HospitalName).send({ from: userAddress, gas: gasLimit});
      res.json({ transactionHash: result.transactionHash });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Failed to add Prescription' });
    }
  });
  
  async function getDoctorDetails(addR) {
    try {
      const msg = await inboxContract.methods.getDoctor().call({from: addR, gas: gasLimit});
  
      // Now you can display the user details on your website or use them as needed
      console.log("msg:", msg);
      return msg;
    } catch (error) {
      console.error("Error Fetching doctor details");
    }
  }

  async function getPatientDetails(addR) {
    try {
      console.log(1);
      const msg = await inboxContract.methods.getPatient().call({from: addR, gas: gasLimit});
  
      // Now you can display the user details on your website or use them as needed
      console.log("msg:", msg);
      return msg;
    } catch (error) {
      console.error("Error Fetching patient details");
    }
  }

  async function getPharmacyDetails(addR) {
    try {
      const msg = await inboxContract.methods.getPharmacy().call({from: addR, gas: gasLimit});
  
      // Now you can display the user details on your website or use them as needed
      console.log("msg:", msg);
      return msg;
    } catch (error) {
      console.error("Error Fetching pharmacy details");
    }
  }


  app.post('/homePatient', async (req, res) => {
    const { username, recID } = req.body;
    console.log(username);
    console.log(recID);
    userAddress = await inboxContract.methods.getAddress(username).call();
    console.log(userAddress);
    try {
      const msg = await inboxContract.methods.getPrescription(username,recID).call({from: userAddress, gas: gasLimit});
      // Now you can display the user details on your website or use them as needed
      
      msg["recordID"] = Number(msg['recordID']);
      msg["patientId"] = Number(msg['patientId']);
      msg["doctorId"] = Number(msg["doctorId"]),
      msg["PrescripReuseLim"] = Number(msg["PrescripReuseLim"]);  
      console.log( msg);
      res.json({ recordID: msg["recordID"],
        date: msg['date'],
        patientId: msg["patientId"],
        patientName: msg["patientName"],
        patientAddr: msg["patientAddr"],
        doctorId: msg["doctorId"],
        doctorName: msg["doctorName"],
        doctorAddr: msg["doctorAddr"],
        MedDescrip: msg["MedDescrip"],
        Medicine: msg["Medicine"],
        dosage: msg["dosage"],
        PrescripReuseLim: msg["PrescripReuseLim"],
        HospitalName: msg["HospitalName"]}); // Respond with the fetched user details  
    } catch (error) {
      console.log(error);
      console.error("Error Fetching pharmacy details");
    }
  });

  app.post('/homePharmacy', async (req, res) => {
    const { username, recID } = req.body;
    console.log(username);
    console.log(recID);
    //userAddress = await inboxContract.methods.getAddress(username).call();
    //console.log(userAddress);
    try {
      const msg = await inboxContract.methods.getPrescription(username,recID).call({ gas: gasLimit});
      // Now you can display the user details on your website or use them as needed
      
      msg["recordID"] = Number(msg['recordID']);
      msg["patientId"] = Number(msg['patientId']);
      msg["doctorId"] = Number(msg["doctorId"]),
      msg["PrescripReuseLim"] = Number(msg["PrescripReuseLim"]);  
      console.log( msg);
      res.json({ recordID: msg["recordID"],
        date: msg['date'],
        patientId: msg["patientId"],
        patientName: msg["patientName"],
        patientAddr: msg["patientAddr"],
        doctorId: msg["doctorId"],
        doctorName: msg["doctorName"],
        doctorAddr: msg["doctorAddr"],
        MedDescrip: msg["MedDescrip"],
        Medicine: msg["Medicine"],
        dosage: msg["dosage"],
        PrescripReuseLim: msg["PrescripReuseLim"],
        HospitalName: msg["HospitalName"]}); // Respond with the fetched user details  
    } catch (error) {
      console.log(error);
      console.error("Error Fetching pharmacy details");
    }
  });

  app.post('/homeDoctor', async (req, res) => {
    const { username, recID } = req.body;
    console.log(username);
    console.log(recID);
    //userAddress = await inboxContract.methods.getAddress(username).call();
    //console.log(userAddress);
    try {
      const msg = await inboxContract.methods.getPrescription(username,recID).call({ gas: gasLimit});
      // Now you can display the user details on your website or use them as needed
      
      msg["recordID"] = Number(msg['recordID']);
      msg["patientId"] = Number(msg['patientId']);
      msg["doctorId"] = Number(msg["doctorId"]),
      msg["PrescripReuseLim"] = Number(msg["PrescripReuseLim"]);  
      console.log( msg);
      res.json({ recordID: msg["recordID"],
        date: msg['date'],
        patientId: msg["patientId"],
        patientName: msg["patientName"],
        patientAddr: msg["patientAddr"],
        doctorId: msg["doctorId"],
        doctorName: msg["doctorName"],
        doctorAddr: msg["doctorAddr"],
        MedDescrip: msg["MedDescrip"],
        Medicine: msg["Medicine"],
        dosage: msg["dosage"],
        PrescripReuseLim: msg["PrescripReuseLim"],
        HospitalName: msg["HospitalName"]}); // Respond with the fetched user details  
    } catch (error) {
      console.log(error);
      console.error("Error Fetching pharmacy details");
    }
  });

  app.post('/login', async (req, res) => {
    const { usname, pass, radioBtn } = req.body;
    userAddress = await inboxContract.methods.getAddress(usname).call();
    console.log(userAddress);
    try {
      const result = await inboxContract.methods.login(
        usname,
        userAddress,
        pass,
        radioBtn
      ).call({from : userAddress, gas : gasLimit});
  
      if (result === "Doctor Login Successful") {
        // Perform doctor-specific actions
        // Set session data for the user
        req.session.user = {
          address: userAddress,
          userType: "Doctor"
        };
        let val = await getDoctorDetails(userAddress);
        console.log(val);
        res.json({
          Msg: result, 
          userid : Number(val['0']), 
          username : val['1'],
          ethaddr : val['2'],
          fullName : val['3'],
          email : val['4'],
          mobnum : val['5'],
          regnum : val['6'],
          regyr : val['7'],
          statemed : val['8'],
          aadhaar : val['9'],
          password : val['10'],
          desig : val['11'],
          doctorid : Number(val['12'])
      }); // Respond with the fetched user details
      } 
      else if (result === "Patient Login Successful") {
        // Perform patient-specific actions
        // Set session data for the user
        req.session.user = {
          address: userAddress,
          userType: "Patient"
        };
        let val = await getPatientDetails(userAddress);
        res.json({
          Msg: result, 
          userid : Number(val['0']), 
          username : val['1'],
          ethaddr : val['2'],
          fullName : val['3'],
          email : val['4'],
          mobnum : val['5'],
          aadhaar : val['6'],
          password : val['7'],
          desig : val['8'],
          patientid : Number(val['9']),
          patienttotRec : Number(val['10'])
      });
      } else if (result === "Pharmacy Login Successful") {
        // Perform pharmacy-specific actions
        // Set session data for the user
        req.session.user = {
          address: userAddress,
          userType: "Pharmacy"
        };
        let val = await getPharmacyDetails(userAddress);
        res.json({
          Msg: result, 
          userid : Number(val['0']), 
          username : val['1'],
          ethaddr : val['2'],
          pharmName : val['3'],
          pharmBranch : val['4'],
          email : val['5'],
          mobnum : val['6'],
          aadhaar : val['7'],
          password : val['8'],
          desig : val['9'],
          pharmacyid : Number(val['10'])
      });
      } else {
        res.json({ Msg: "Login unsuccessful" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login attempt failed due to error' });
    }
  });




  


  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });



