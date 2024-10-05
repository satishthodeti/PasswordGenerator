import { useState } from "react"; // Import useState hook from React for state management
import { ToastContainer, toast } from "react-toastify"; // Import Toast components for notifications
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify styling
import Swal from "sweetalert2"; // Import SweetAlert2 for alert dialogs
import "./GeneratePassword.css"; // Import custom CSS styles for the GeneratePassword component

function GeneratePassword() {
  const [length, setLength] = useState(0); // Default length is 6
  const [numberAllowed, setNumberAllowed] = useState(false); // State for including numbers
  const [charAllowed, setCharAllowed] = useState(false); // State for including special characters
  const [password, setPassword] = useState(""); // State to hold the generated password

  // Function to generate a password based on user-selected criteria
  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"; // Lowercase letters
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Uppercase letters
    const numberChars = "0123456789"; // Numbers
    const specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?"; // Special characters

    let characterPool = lowercaseChars + uppercaseChars;

    if (numberAllowed) characterPool += numberChars;
    if (charAllowed) characterPool += specialChars;

    if (length === 0) {
      toast.error("Password length must be at least 6 characters.");
      Swal.fire({
        title: "Error!",
        text: "Password length must be at least 6 characters. Use the range bar to set the length.",        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
    toast.success("New Password Generated.");
  };

  // Function to reset all states to their default values
  const handleReset = () => {
    setPassword("");
    setLength(6); // Reset length to 6
    setNumberAllowed(false);
    setCharAllowed(false);
    toast.info("Fields have been reset.");
  };

  // Function to copy the generated password to the clipboard
  const handleCopy = () => {
    if (password === "") {
      toast.error("Please generate the password first to copy.");
      return;
    }
    navigator.clipboard.writeText(password);
    toast.info("Copied to clipboard!");
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard! This is only for functionality.");
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="card">
        <h1>Password Generator</h1>
        <div className="input-container">
          <input
            type="text"
            value={password}
            className="outline-none"
            placeholder="Password"
            readOnly
          />
          <button className="copy-button" onClick={handleCopy}>
            Copy
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label htmlFor="length" className="ml-4">
            Length: {length}
          </label>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
            id="numbers"
          />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
            id="characters"
          />
          <label htmlFor="characters">Special Characters</label>
        </div>

        {/* Conditionally render buttons based on whether a password is generated */}
        <div className="generator-reset-container">
          {password ? (
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          ) : (
            <>
              <button className="generate-btn" onClick={generatePassword}>
                Generate Password
              </button>
              <p className="note">
                Note: This is not for manual password generation
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeneratePassword;
