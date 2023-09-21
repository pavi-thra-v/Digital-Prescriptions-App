
document.addEventListener('DOMContentLoaded', () => {



/*Smooth scrolling when anchor links are clicked--------------------------------------------------------*/ 
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              // Scroll to the target section with smooth behavior
              target.scrollIntoView({
                behavior: 'smooth'
              });
            }
          });
        });




/**To add doctor user posting data obtained from form elements to the server------------------------------------------ */
        const handleAddDocUser = addEventListener('submit', async (e) => {
          e.preventDefault();
          const useraddr = document.querySelector('.doc-EthAddr').value;
          const username = document.querySelector('.doc-FullName').value;
          const useremail = document.querySelector('.doc-emailId').value;
          const usermobilenum = document.querySelector('.doc-mobileNum').value;
          const userreg_num = document.querySelector('.doc-regNum').value;
          const userreg_yr = document.querySelector('.doc-regyear').value;
          const userstate_med_name = document.querySelector('.doc-stateMed').value;
          const useraadhaar_num = document.querySelector('.doc-Aadhaar').value;
          const userpassword = document.querySelector('.doc-ConfirmPass').value; 
          const user_type = document.querySelector('.doc-UserDesig').value;

          const response = await fetch('http://localhost:3000/addDoctorUser', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ addr : useraddr, usname : username, email : useremail, mobile_num : usermobilenum, reg_num : userreg_num, reg_yr : userreg_yr, state_med_name : userstate_med_name, aadhaar_num : useraadhaar_num, password : userpassword, usertype : user_type})
          });

          const data = await response.json();
          console.log(data);
          window.location.href = '/Login';
          alert('Doctor registered successfully. Transaction hash: ' + data.transactionHash);
        });



 

/**To add patient user posting data obtained from form elements to the server------------------------------------------ */
        const handleAddPatUser = addEventListener('submit', async (e) => {
          e.preventDefault();
          const useraddr = document.querySelector('.pat-EthAddr').value;
          const username = document.querySelector('.pat-FullName').value;
          const useremail = document.querySelector('.pat-emailId').value;
          const usermobilenum = document.querySelector('.pat-mobileNum').value;
          const useraadhaar_num = document.querySelector('.pat-Aadhaar').value;
          const userpassword = document.querySelector('.pat-ConfirmPass').value; 
          const user_type = document.querySelector('.pat-UserDesig').value;

          const response = await fetch('http://localhost:3000/addPatientUser', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ addr : useraddr, usname : username, email : useremail, mobile_num : usermobilenum, aadhaar_num : useraadhaar_num, password : userpassword, usertype : user_type})
          });

          const data = await response.json();
          console.log(data);
          window.location.href = '/Login';
          alert('Patient registered successfully. Transaction hash: ' + data.transactionHash);
        });




/**To add Pharmacy user posting data obtained from form elements to the server------------------------------------------ */
      const handleAddPharmUser = addEventListener('submit', async (e) => {
        e.preventDefault();
        const useraddr = document.querySelector('.phar-EthAddr').value;
        const pharmname = document.querySelector('.PharmName').value;
        const pharmbranch = document.querySelector('.PharmBranch').value;
        const useremail = document.querySelector('.phar-emailId').value;
        const usermobilenum = document.querySelector('.phar-mobileNum').value;
        const useraadhaar_num = document.querySelector('.phar-Aadhaar').value;
        const userpassword = document.querySelector('.phar-Pass').value; 
        const user_type = document.querySelector('.phar-UserDesig').value;

        const response = await fetch('http://localhost:3000/addPharmacyUser', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({ addr : useraddr, phname : pharmname, phbranch : pharmbranch, email : useremail, mobile_num : usermobilenum, aadhaar_num : useraadhaar_num, password : userpassword, usertype : user_type})
        });

        const data = await response.json();
        console.log(data);
        window.location.href = '/Login';
        alert('Pharmacy registered successfully. Transaction hash: ' + data.transactionHash);
      });
      



/**To add new prescription------------------------------------------------------------------------*/
    const handleAddNewPres = addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = document.querySelector('.newp-date').value;
        console.log(date);
        const patUsername = document.querySelector('.newp-patUsername').value;
        console.log(patUsername);
        const docUsername = document.querySelector('.newp-docUsername').value;
        const MedDescrip = document.querySelector('.newp-MedDescrip').value;
        const Medicine= document.querySelector('.newp-Medicine').value;
        const dosage = document.querySelector('.newp-dosage').value;
        const PrescripReuseLim = document.querySelector('.newp-PrescripReuseLim').value; 
        const HospitalName = document.querySelector('.newp-HospitalName').value;

        const response = await fetch('http://localhost:3000/NewPrescription', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({ date : date, patUsername : patUsername, docUsername : docUsername, MedDescrip : MedDescrip, Medicine : Medicine, dosage : dosage, PrescripReuseLim : PrescripReuseLim, HospitalName : HospitalName})
        });

        const data = await response.json();
        console.log(data);
        window.location.href = '/homeDoctor';
        alert('Prescription Generated successfully. Transaction hash: ' + data.transactionHash);
      });




/* Patient - to get his prescription ---------------------------------------------- */
      const handlePatgetPres = addEventListener('submit', async (e) =>{
        e.preventDefault();
        const recID = document.querySelector(".presID").value;
        console.log(recID); 
        const username = sessionStorage.getItem('username');
        console.log(username)
        const response = await fetch('http://localhost:3000/homePatient', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({recID : recID, username : username})
        });

        const data = await response.json();
        console.log(data);
        const pptyToStore = ["recordID", 'date', "patientId", "patientName", "patientAddr", "doctorId", "doctorName", "doctorAddr", "MedDescrip", "Medicine", "dosage", "PrescripReuseLim", "HospitalName"];
        // Loop through the properties and store them in sessionStorage
        for (const prop of pptyToStore) {
          sessionStorage.setItem(prop, data[prop]);
      }
        window.location.href = '/homePatient'; // Redirect without passing fullName as a query parameter
        alert('Prescription Fetched successfully.');
    });

  /* Pharmacist - to get patient prescription ---------------------------------------------- */
    const handlePharmgetPres = addEventListener('submit', async (e) =>{
      e.preventDefault();
      const recID = document.querySelector(".presID").value;
      console.log(recID); 
      const username = document.querySelector('.userID').value;
      console.log(username)
      const response = await fetch('http://localhost:3000/homePharmacy', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({recID : recID, username : username})
      });

      const data = await response.json();
      console.log(data);
      const pptyToStore = ["recordID", 'date', "patientId", "patientName", "patientAddr", "doctorId", "doctorName", "doctorAddr", "MedDescrip", "Medicine", "dosage", "PrescripReuseLim", "HospitalName"];
      // Loop through the properties and store them in sessionStorage
      for (const prop of pptyToStore) {
        sessionStorage.setItem(prop, data[prop]);
    }
      window.location.href = '/homePharmacy'; // Redirect without passing fullName as a query parameter
      alert('Patient Prescription Fetched successfully.');
  });

  /* Pharmacist - to get patient prescription ---------------------------------------------- */
  /*const handleDocgetPres = addEventListener('submit', async (e) =>{
    e.preventDefault();
    const recID = document.querySelector(".presID").value;
    console.log(recID); 
    const username = document.querySelector('.userID').value;
    console.log(username)
    const response = await fetch('http://localhost:3000/homeDoctor', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({recID : recID, username : username})
    });

    const data = await response.json();
    console.log(data);
    const pptyToStore = ["recordID", 'date', "patientId", "patientName", "patientAddr", "doctorId", "doctorName", "doctorAddr", "MedDescrip", "Medicine", "dosage", "PrescripReuseLim", "HospitalName"];
    // Loop through the properties and store them in sessionStorage
    for (const prop of pptyToStore) {
      sessionStorage.setItem(prop, data[prop]);
  }
    window.location.href = '/homeDoctor'; // Redirect without passing fullName as a query parameter
    alert('Patient Prescription Fetched successfully.');
});*/


// Function to decrement the prescription count in sessionStorage
function decrementPrescriptionCount() {
  // Check if the prescriptionCount exists in sessionStorage
  if (sessionStorage.getItem("PrescripReuseLim")) {
      // Get the current count as an integer
      let count = parseInt(sessionStorage.getItem("PrescripReuseLim"));
      
      // Check if the count is greater than 0 before decrementing
      if (count > 0) {
          count--;
          // Update the count in sessionStorage
          sessionStorage.setItem("PrescripReuseLim", count.toString());

      }
  }
}

const handlePresCnt = addEventListener('submit', function(event) {
  // Prevent the form from submitting (if needed)
  console.log("1");
  event.preventDefault;
  // Add your code here to handle the "Checked out" button click
  if (event.submitter && event.submitter.id === 'chk-out1'){
  console.log("Checked out button clicked");
  // Call the function to decrement the count
  decrementPrescriptionCount();
  alert('Medicines Checked Out. Prescription Reuse Limit updated successfully.');
  window.location.href = '/homePharmacy'; // Redirect without passing fullName as a query parameter
  }
  // Now, you can submit the form or perform other actions if required
  // For example, you can submit the form programmatically
  // event.target.submit();
});

/**Login Radio Button Select ------------------------------------------------------------- */
      
      let selectedValue = ''; // Declare selectedValue as a global variable
      function getvalue() {
        // Get all radio buttons with the class 'btn-check'
        const radioButtons = document.querySelectorAll('.btn-check');
        // Loop through the radio buttons to find the selected one
        radioButtons.forEach((radio) => {
          if (radio.checked) {
            // If a radio button is checked, set the selectedValue to its value
            selectedValue = radio.value;
          }
        });
        // Use the selectedValue for any further processing or actions
        console.log('Selected Value:', selectedValue);
      }

      const radioButtons = document.querySelectorAll('.btn-check');
      // Add an event listener to each radio button with the class 'btn-check'
      radioButtons.forEach((radio) => {
        radio.addEventListener('click', getvalue);
      });



/**Login Submission ------------------------------------------------------------------------ */
      const handleLoginSubmit = addEventListener('submit', async (event) => {
        event.preventDefault();
        const usernam = document.querySelector('.login-usernam').value;
        const passwd = document.querySelector('.login-passwd').value;
        console.log(usernam);
        console.log(passwd);
        console.log(selectedValue); // Now selectedValue should be accessible

        const response = await fetch('http://localhost:3000/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({usname: usernam, pass: passwd, radioBtn: selectedValue })
        });
        const data = await response.json();
        console.log(data);

        if (data['Msg'] == "Doctor Login Successful") {
              alert('Doctor Logged In successfully.');
              const pptyToStore = ['userid', 'username', 'ethaddr', 'fullName', 'email', 'mobnum', 'regnum', 'regyr', 'statemed', 'aadhaar', 'password', 'desig', 'doctorid'];
              // Loop through the properties and store them in sessionStorage
              for (const prop of pptyToStore) {
                sessionStorage.setItem(prop, data[prop]);
            }
              window.location.href = '/homeDoctor'; // Redirect without passing fullName as a query parameter
              
        }
        else if (data['Msg'] == "Patient Login Successful") {
                console.log(data);
                alert('Patient Logged In successfully.');
                const pptyToStore = ['userid', 'username', 'ethaddr', 'fullName', 'email', 'mobnum', 'aadhaar', 'password', 'desig', 'patientid', 'patienttotRec'];
                // Loop through the properties and store them in sessionStorage
                for (const prop of pptyToStore) {
                  sessionStorage.setItem(prop, data[prop]);
              }
                window.location.href = '/homePatient'; // Redirect without passing fullName as a query parameter
        }
        else if (data['Msg'] == "Pharmacy Login Successful") {
                alert('Pharmacy Logged In successfully.');
                const pptyToStore = ['userid', 'username', 'ethaddr', 'pharmName', 'pharmBranch', 'email', 'mobnum', 'aadhaar', 'password', 'desig', 'pharmacyid'];
                // Loop through the properties and store them in sessionStorage
                for (const prop of pptyToStore) {
                  sessionStorage.setItem(prop, data[prop]);
              }
                window.location.href = '/homePharmacy'; // Redirect without passing fullName as a query parameter
        }
        else {
                console.log('Login unsuccessful:', data['Msg']);
        }
      });

  


/**Clearing Session storage on Logout ------------------------------------------------------------*/
      const logoutButton = document.querySelector('.logout-button');

      // Add a click event listener to the logout button
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault;
        console.log("2");
        // Clear the sessionStorage
        sessionStorage.clear();

        // Redirect the user to the logout page
        window.location.href = '/Home'; // Replace '/logout' with the actual URL of your logout page
        // Manipulate the browser history to replace the current URL with the homepage URL
        history.replaceState({}, '', '/Home'); // Replace '/' with the actual URL of your homepage
    });







  
      // Attach the event listeners to the respective forms
      const LoginSpace = document.querySelector('.login-form');
      const AddDocUserForm = document.querySelector('.AddDocUserForm');
      const AddPatUserForm = document.querySelector('.AddPatUserForm');
      const AddPharmUserForm = document.querySelector('.AddPharmUserForm');
      const AddPresForm = document.querySelector('.new-pres.generate');
      const GetPresByPat = document.querySelector('.GetPresByID');
      const GetPresByPharm = document.querySelector('.pharm-pres-get');
      //const GetPresByDoctor = document.querySelector('.doctor-pres-get')
      const DecPresCount = document.querySelector('.chk-out');

      LoginSpace.addEventListener('submit', handleLoginSubmit);
      AddDocUserForm.addEventListener('submit', handleAddDocUser);
      AddPatUserForm.addEventListener('submit', handleAddPatUser);
      AddPharmUserForm.addEventListener('submit', handleAddPharmUser);
      AddPresForm.addEventListener('submit',handleAddNewPres);
      GetPresByPat.addEventListener('submit', handlePatgetPres);
      GetPresByPharm.addEventListener('submit',handlePharmgetPres);
      //GetPresByDoctor.addEventListener('submit',handleDocgetPres);
      DecPresCount.addEventListener('submit',handlePresCnt);
});
