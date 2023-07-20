// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract PrescribeRight{
    uint32 public patient_id = 0; //Patient ID is stored here
    uint32 public doctor_id = 0; //Doctor ID is stored here
    uint32 public pharm_id = 0; //Pharmacist ID is stored here
    uint32 public participant_id = 0; //Participant ID is stored here
    uint32 public record_id = 0; //Patient record ID is stored here

    struct participant{ //Participant Structure
        string userName; //User Name
        string password; //Password
        string participantType; //Type of Participant (Doctor, Patient, Pharmacist)
        address participantAddress; //Ethereum address of Participant
        string aadhaar_no;
    }

    mapping(uint32 => participant) public participants; //accessing by participant details by index values(id nos)
    mapping(address => string) public participants_addr; //accessing participant type by address 

    //addParticipant() function adds a new participant
    function addParticipant(string memory _name, string memory _pass, address _pAdd, string memory _pType, string memory _aadhaar) public returns (uint32){
        uint32 userId=0;
        /**To check whether the participant is Doctor/Patient/Pharmacist and increment their corresponding ids and update the user id */
        if (keccak256(abi.encodePacked(_pType)) == keccak256(abi.encodePacked("Doctor"))){
            doctor_id++; //doctor ID is stored in blockchain
        }
        else if (keccak256(abi.encodePacked(_pType)) == keccak256(abi.encodePacked("Patient"))){
            patient_id++; //patient ID is stored in blockchain
        }
        else if (keccak256(abi.encodePacked(_pType)) == keccak256(abi.encodePacked("Pharmacist"))){
            pharm_id++; //pharmacist ID is stored in blockchain
        }
        else{
            return userId; //If incorrect type is received, do nothing, return 0
        }
        
        userId = participant_id++;
        participants[userId].userName = _name; 
        participants[userId].password = _pass;
        participants[userId].participantAddress = _pAdd;
        participants[userId].participantType = _pType;
        participants[userId].aadhaar_no = _aadhaar; 

        participants_addr[_pAdd] = _pType;

        return userId; //Return user_id
    }
    
//getParticipant() function fetches the requested participant and returns the attributes that describe the participant
    function getParticipant(uint32 _participant_id) public view returns (string memory,address,string memory) {
        return (participants[_participant_id].userName, //Name of the participant
                participants[_participant_id].participantAddress, //Ethernet address
                participants[_participant_id].participantType); //Participent type
    }


    modifier onlyDoctor() {
        require(keccak256(abi.encodePacked(participants_addr[msg.sender])) == keccak256(abi.encodePacked("Doctor")), "Only doctors allowed");
        _;
    }

    struct Prescription { //structure of a prescription
        address PatientAddr;
        uint256 patientRecordId;
        string medicine;
        uint32 timestamp;
    }

    mapping(address => mapping(uint256 => Prescription)) public patientRecords;

    function addPrescription(address patient, string memory medicine, uint32 timestamp) public onlyDoctor(){
        uint256 recordID = record_id++;
        patientRecords[patient][recordID] = Prescription(patient, recordID, medicine, timestamp);
    }

    function getPrescription(address patient, uint256 recordId) public view returns (address, uint256, string memory, uint32) {
        Prescription memory prescription = patientRecords[patient][recordId];
        return (prescription.PatientAddr, prescription.patientRecordId, prescription.medicine, prescription.timestamp);
    }
    
}
