//SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract PRapp {
    /**Defining necessary public variables --------------------------------------------- */
    uint32 public doctor_id = 0;
    uint32 public patient_id = 0;
    uint32 public pharmacy_id = 0;
    uint32 public totalUsers = 0;
    uint32 public record_id = 0;

    /**Defining necessary Structures --------------------------------------------------------- */
    struct doctorUser {
        uint32 user_id;
        string username;
        address userAddr;
        string name;
        string email;
        string mobile_num;
        string reg_num;
        string reg_yr;
        string state_med_name;
        string aadhaar_num;
        string password;
        string usertype;
        uint32 doctorId;
    }

    struct patientUser {
        uint32 user_id;
        string username;
        address userAddr;
        string name;
        string email;
        string mobile_num;
        string aadhaar_num;
        string password;
        string usertype;
        uint32 patientId;
        uint32 patientTotRecords;
        //mapping(uint32 => prescription) PrescriptionHistory;
    }

    struct pharmacyUser {
        uint32 user_id;
        string username;
        address userAddr;
        string pharmName;
        string pharmBranch;
        string email;
        string mobile_num;
        string aadhaar_num;
        string password;
        string usertype;
        uint32 pharmacyId;
    }

    struct prescription {
        uint32 recordID;
        string date;
        uint32 patientId;
        string patientName;
        address patientAddr;
        uint32 doctorId;
        string doctorName;
        address doctorAddr;
        string MedDescrip;
        string Medicine;
        string dosage;
        uint8 PrescripReuseLim;
        string HospitalName;
    }

    /**Defining necessary mappings ------------------------------------------------------------- */
    mapping(address => doctorUser) public doctors;
    mapping(address => patientUser) public patients;
    mapping(address => pharmacyUser) public pharmacies;
    mapping(uint32 => prescription) public prescriptions;
    mapping(address => mapping(uint32 => prescription)) public patientRecords;
    mapping(string => address) public userAddresses;

    /**Function to login ----------------------------------------------------------------------- */
    function login(
        string memory _username,
        address _address,
        string memory _password,
        string memory _radiobtn
    ) public view returns (string memory) {
        if (
            keccak256(abi.encodePacked(doctors[_address].usertype)) ==
            keccak256(abi.encodePacked(_radiobtn))
        ) {
            require(
                keccak256(abi.encodePacked(doctors[_address].username)) ==
                    keccak256(abi.encodePacked(_username)) &&
                    keccak256(abi.encodePacked(doctors[_address].password)) ==
                    keccak256(abi.encodePacked(_password)),
                "Incorrect Username or password"
            );
            return ("Doctor Login Successful");
        } else if (
            keccak256(abi.encodePacked(patients[_address].usertype)) ==
            keccak256(abi.encodePacked(_radiobtn))
        ) {
            require(
                keccak256(abi.encodePacked(patients[_address].username)) ==
                    keccak256(abi.encodePacked(_username)) &&
                    keccak256(abi.encodePacked(patients[_address].password)) ==
                    keccak256(abi.encodePacked(_password)),
                "Incorrect Username or password"
            );
            return ("Patient Login Successful");
        } else if (
            keccak256(abi.encodePacked(pharmacies[_address].usertype)) ==
            keccak256(abi.encodePacked(_radiobtn))
        ) {
            require(
                keccak256(abi.encodePacked(pharmacies[_address].username)) ==
                    keccak256(abi.encodePacked(_username)) &&
                    keccak256(
                        abi.encodePacked(pharmacies[_address].password)
                    ) ==
                    keccak256(abi.encodePacked(_password)),
                "Incorrect Username or password"
            );
            return ("Pharmacy Login Successful");
        }
        return ("Login unsuccessful");
    }

    /**Defining generic functions for usage in the other functions -----------------------------------------*/

    /**Function to get user address using username(emailId) */
    function getAddress(string memory _email) public view returns (address) {
        return (userAddresses[_email]);
    }

    /**Function to get userID using username(emailId)*/
    function getUserId(string memory _email) public view returns (uint32) {
        return (patients[userAddresses[_email]].user_id);
    }

    /**Function to get name using username(emailId)*/
    function getName(string memory _email) public view returns (string memory) {
        return (patients[userAddresses[_email]].name);
    }

    /**Defining necessary add participant functions -------------------------------------------------------- */

    /**Adding Doctor User */
    function addDoctorUser(
        address _addr,
        string memory _name,
        string memory _email,
        string memory _mobile_num,
        string memory _reg_num,
        string memory _reg_yr,
        string memory _state_med_name,
        string memory _aadhaar_num,
        string memory _password,
        string memory _usertype
    ) public {
        doctors[_addr] = doctorUser({
            user_id: totalUsers++,
            username: _email,
            userAddr: _addr,
            name: _name,
            email: _email,
            mobile_num: _mobile_num,
            reg_num: _reg_num,
            reg_yr: _reg_yr,
            state_med_name: _state_med_name,
            aadhaar_num: _aadhaar_num,
            password: _password,
            usertype: _usertype,
            doctorId: doctor_id++
        });

        userAddresses[_email] = _addr;
    }

    /**Adding Patient User */
    function addPatientUser(
        address _addr,
        string memory _name,
        string memory _email,
        string memory _mobile_num,
        string memory _aadhaar_num,
        string memory _password,
        string memory _usertype
    ) public {
        patients[_addr] = patientUser({
            user_id: totalUsers++,
            username: _email,
            userAddr: _addr,
            name: _name,
            email: _email,
            mobile_num: _mobile_num,
            aadhaar_num: _aadhaar_num,
            password: _password,
            usertype: _usertype,
            patientId: patient_id++,
            patientTotRecords: 0
        });
        userAddresses[_email] = _addr;
    }

    /**Adding Pharmacy User */
    function addPharmacyUser(
        address _addr,
        string memory _pharmName,
        string memory _pharmBranch,
        string memory _email,
        string memory _mobile_num,
        string memory _aadhaar_num,
        string memory _password,
        string memory _usertype
    ) public {
        pharmacies[_addr] = pharmacyUser({
            user_id: totalUsers++,
            username: _email,
            userAddr: _addr,
            pharmName: _pharmName,
            pharmBranch: _pharmBranch,
            email: _email,
            mobile_num: _mobile_num,
            aadhaar_num: _aadhaar_num,
            password: _password,
            usertype: _usertype,
            pharmacyId: pharmacy_id++
        });
        userAddresses[_email] = _addr;
    }

    /**Defining necessary get participant functions --------------------------------------------- */

    /**To retrieve Doctor Information by the doctor*/
    function getDoctor()
        public
        view
        returns (
            uint32,
            string memory,
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint32
        )
    {
        return (
            doctors[msg.sender].user_id, //Name of the participant
            doctors[msg.sender].username, //Ethernet address
            doctors[msg.sender].userAddr,
            doctors[msg.sender].name,
            doctors[msg.sender].email,
            doctors[msg.sender].mobile_num,
            doctors[msg.sender].reg_num,
            doctors[msg.sender].reg_yr,
            doctors[msg.sender].state_med_name,
            doctors[msg.sender].aadhaar_num,
            doctors[msg.sender].password,
            doctors[msg.sender].usertype,
            doctors[msg.sender].doctorId
        );
    }

    /**To retreive Patient information by the patient */
    function getPatient()
        public
        view
        returns (
            uint32,
            string memory,
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint32,
            uint32
        )
    {
        return (
            patients[msg.sender].user_id, //Name of the participant
            patients[msg.sender].username, //Ethernet address
            patients[msg.sender].userAddr,
            patients[msg.sender].name,
            patients[msg.sender].email,
            patients[msg.sender].mobile_num,
            patients[msg.sender].aadhaar_num,
            patients[msg.sender].password,
            patients[msg.sender].usertype,
            patients[msg.sender].patientId,
            patients[msg.sender].patientTotRecords
        );
    }

    /**To retreive pharmacy information by the pharmacist */
    function getPharmacy()
        public
        view
        returns (
            uint32,
            string memory,
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint32
        )
    {
        return (
            pharmacies[msg.sender].user_id, //Name of the participant
            pharmacies[msg.sender].username, //Ethernet address
            pharmacies[msg.sender].userAddr,
            pharmacies[msg.sender].pharmName,
            pharmacies[msg.sender].pharmBranch,
            pharmacies[msg.sender].email,
            pharmacies[msg.sender].mobile_num,
            pharmacies[msg.sender].aadhaar_num,
            pharmacies[msg.sender].password,
            pharmacies[msg.sender].usertype,
            pharmacies[msg.sender].pharmacyId
        );
    }

    /**Defining necessary access modifiers ------------------------------------------------------ */
    /**To verify that the user is a doctor */
    modifier onlyDoctor() {
        require(
            keccak256(abi.encodePacked(doctors[msg.sender].usertype)) ==
                keccak256(abi.encodePacked("Doctor")),
            "Only doctors allowed"
        );
        _;
    }

    /**Defining functions related to prescriptions ---------------------------------------------- */
    function addNewPrescription(
        string memory _date,
        string memory _patientUsername,
        string memory _doctorUsername,
        string memory _MedDescrip,
        string memory _Medicine,
        string memory _dosage,
        uint8 _PrescripReuseLim,
        string memory _HospitalName
    ) public onlyDoctor {
        record_id++;
        prescriptions[record_id] = prescription({
            recordID: record_id,
            date: _date,
            patientId: getUserId(_patientUsername),
            patientName: getName(_patientUsername),
            patientAddr: getAddress(_patientUsername),
            doctorId: getUserId(_doctorUsername),
            doctorName: getName(_doctorUsername),
            doctorAddr: getAddress(_doctorUsername),
            MedDescrip: _MedDescrip,
            Medicine: _Medicine,
            dosage: _dosage,
            PrescripReuseLim: _PrescripReuseLim,
            HospitalName: _HospitalName
        });

        patientUser storage p = patients[getAddress(_patientUsername)];
        p.patientTotRecords++;
        patientRecords[getAddress(_patientUsername)][
            p.patientTotRecords
        ] = prescriptions[record_id];
    }

    function getPrescription(
        string memory _patientUserName,
        uint32 _recordId
    ) public view returns (prescription memory) {
        prescription memory P = patientRecords[getAddress(_patientUserName)][
            _recordId
        ];
        return P;
    }
}
