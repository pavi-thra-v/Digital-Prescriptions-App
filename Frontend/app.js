const AddDocUserForm = document.querySelector('.doctor-reg-details');

AddDocUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const useraddr = document.querySelector('#EthAddr').value;
  const username = document.querySelector('#FullName').value;
  const useremail = document.querySelector('#emailId').value;
  const usermobilenum = document.querySelector('#mobileNum').value;
  const userreg_num = document.querySelector('#regNum').value;
  const userreg_yr = document.querySelector('#regyear').value;
  const userstate_med_name = document.querySelector('#stateMed').value;
  const useraadhaar_num = document.querySelector('#Aadhaar').value;
  const userpassword = document.querySelector('#ConfirmPass').value;
  const user_type = document.querySelector('#UserDesig').value;

  const response = await fetch('http://localhost:3000/addDoctorUser', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ addr : useraddr, usname : username, email : useremail, mobile_num : usermobilenum, reg_num : userreg_num, reg_yr : userreg_yr, state_med_name : userstate_med_name, aadhaar_num : useraadhaar_num, password : userpassword, usertype : user_type})
  });
  const data = await response.json();
  console.log(data);
  alert('User added successfully. Transaction hash: ' + data.transactionHash);
});
