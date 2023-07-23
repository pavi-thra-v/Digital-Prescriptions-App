const { expect } = require('chai');
const MyContract = artifacts.require('PRapp'); // Replace 'MyContract' with the actual name of your contract

contract('MyContract', (accounts) => {
    let myContract;

    before(async () => {
        myContract = await MyContract.deployed();
    });

    it('should add a doctor user', async () => {
        // Parameters for the doctor user
        const addr = accounts[1];
        const name = 'John Doe';
        const email = 'john@example.com';
        const mobile_num = '1234567890';
        const reg_num = 'ABC123';
        const reg_yr = '2023';
        const state_med_name = 'State Medical Council';
        const aadhaar_num = '123456789012';
        const password = 'password';
        const usertype = 'Doctor';

        // Call the addDoctorUser function
        await myContract.addDoctorUser(
            addr,
            name,
            email,
            mobile_num,
            reg_num,
            reg_yr,
            state_med_name,
            aadhaar_num,
            password,
            usertype
        );

        // Fetch the doctorUser struct to check if it was added correctly
        const doctorUser = await myContract.doctors(addr);

        // Assert the doctorUser values
        expect(doctorUser.user_id.toNumber()).to.equal(0); // Check the expected user_id based on the initial state
        expect(doctorUser.username).to.equal(email);
        expect(doctorUser.userAddr).to.equal(addr);
        expect(doctorUser.name).to.equal(name);
        expect(doctorUser.email).to.equal(email);
        expect(doctorUser.mobile_num).to.equal(mobile_num);
        expect(doctorUser.reg_num).to.equal(reg_num);
        expect(doctorUser.reg_yr).to.equal(reg_yr);
        expect(doctorUser.state_med_name).to.equal(state_med_name);
        expect(doctorUser.aadhaar_num).to.equal(aadhaar_num);
        expect(doctorUser.password).to.equal(password);
        expect(doctorUser.usertype).to.equal(usertype);
        expect(doctorUser.doctorId.toNumber()).to.equal(0); // Check the expected doctorId based on the initial state
    });

    it('should add a patient user', async () => {
        // Parameters for the doctor user
        const addr = accounts[2];
        const name = 'Nandini';
        const email = 'nandini@gmail.com';
        const mobile_num = '8273838728';
        const aadhaar_num = '8735 8755 8374';
        const password = 'password1';
        const usertype = 'Patient';

        // Call the addDoctorUser function
        await myContract.addPatientUser(
            addr,
            name,
            email,
            mobile_num,
            aadhaar_num,
            password,
            usertype
        );

        // Fetch the doctorUser struct to check if it was added correctly
        const patientUser = await myContract.patients(addr);

        // Assert the doctorUser values
        expect(patientUser.user_id.toNumber()).to.equal(1); // Check the expected user_id based on the initial state
        expect(patientUser.username).to.equal(email);
        expect(patientUser.userAddr).to.equal(addr);
        expect(patientUser.name).to.equal(name);
        expect(patientUser.email).to.equal(email);
        expect(patientUser.mobile_num).to.equal(mobile_num);
        expect(patientUser.aadhaar_num).to.equal(aadhaar_num);
        expect(patientUser.password).to.equal(password);
        expect(patientUser.usertype).to.equal(usertype);
        expect(patientUser.patientId.toNumber()).to.equal(0); // Check the expected doctorId based on the initial state
    });

    it('should add a pharmacy user', async () => {
        // Parameters for the doctor user
        const addr = accounts[3];
        const pharmName = 'Apollo Pharmacy';
        const pharmBranch = 'Velachery';
        const email = 'apollo@gmail.com';
        const mobile_num = '6716376662';
        const aadhaar_num = '123456789012';
        const password = 'password';
        const usertype = 'Pharmacy';

        // Call the addDoctorUser function
        await myContract.addPharmacyUser(
            addr,
            pharmName,
            pharmBranch,
            email,
            mobile_num,
            aadhaar_num,
            password,
            usertype
        );

        // Fetch the doctorUser struct to check if it was added correctly
        const pharmacyUser = await myContract.pharmacies(addr);

        // Assert the doctorUser values
        expect(pharmacyUser.user_id.toNumber()).to.equal(2); // Check the expected user_id based on the initial state
        expect(pharmacyUser.username).to.equal(email);
        expect(pharmacyUser.userAddr).to.equal(addr);
        expect(pharmacyUser.pharmName).to.equal(pharmName);
        expect(pharmacyUser.pharmBranch).to.equal(pharmBranch);
        expect(pharmacyUser.email).to.equal(email);
        expect(pharmacyUser.mobile_num).to.equal(mobile_num);
        expect(pharmacyUser.aadhaar_num).to.equal(aadhaar_num);
        expect(pharmacyUser.password).to.equal(password);
        expect(pharmacyUser.usertype).to.equal(usertype);
        expect(pharmacyUser.pharmacyId.toNumber()).to.equal(0); // Check the expected pharmacyId based on the initial state
    });


    
});
