// File: components/SubmitButton.js

const SubmitButton = ({ onClick }) => {
  return (
    <button type="submit" className="submit-button" onClick={onClick}>
      Generate
    </button>
  );
};

export default SubmitButton;
