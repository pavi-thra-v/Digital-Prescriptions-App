<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="app.js" defer></script>
    <link rel="stylesheet" href="styles.css"/>
    <title>Registration Form</title>
</head>
<body>
    <heading>
        <h2>User Registration Form</h2>
    </heading>
    <form class="AddUserForm">
        <label for="EthAddr">Ethereum Address</label>
        <input type="text" id="EthAddr" required>
        <label for="FullName">Name:</label>
        <input type="text" id="FullName" required>
        <label for="emailId">Email</label>
        <input type="text" id="emailId" required>
        <label for="mobileNum">Mobile Num</label>
        <input type="text" id="mobileNum" required>
        <label for="regNum">Reg Num</label>
        <input type="text" id="regNum" required>
        <label for="regyear">Reg Year</label>
        <input type="text" id="regyear" required>
        <label for="stateMed">State Medical Council</label>
        <input type="text" id="stateMed" required>
        <label for="Aadhaar">Aadhaar Number</label>
        <input type="text" id="Aadhaar" required>
        <label for="ConfirmPass">ConfirmPass</label>
        <input type="text" id="ConfirmPass" required>
        <label for="UserDesig">User Designation</label>
        <input type="text" id="UserDesig" required>
        <button type="submit" id="user-reg-btn">Add User</button>
    </form>
        /*<form class="UserProfile">
            <label for="ethereumAddr">Ethereum Address</label>
            <input type="text" id="ethereumAddr" required>
            <button type="submit" id="profile-btn">view Profile</button>
        </form>
        <contents class="ProfileContents"></contents>*/
</body>
</html>
