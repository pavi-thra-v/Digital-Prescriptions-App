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

const contractABI = /*Replace with your contract ABI*/;

  const contractAddress = ''; // Replace with the address of your deployed SupplyChain smart contract
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


  /*app.post('/homePatient', async (req, res) => {
    const { username, recID } = req.body;
    console.log(username);
    console.log(recID);
    userAddress = await inboxContract.methods.getAddress(username).call();
    console.log(userAddress);
    try {
      const msg = await inboxContract.methods.getPrescription(username,recID).call({from: addR, gas: gasLimit});
      // Now you can display the user details on your website or use them as needed
      console.log( msg);
      res.json({ Msg : msg}); // Respond with the fetched user details
    } catch (error) {
      console.error("Error Fetching pharmacy details");
    }
  });*/


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



