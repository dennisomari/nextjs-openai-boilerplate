const ResponseDisplay = ({ data, error, loading }) => {
  let content;

  if (loading) {
    content = "Loading...";
  } else if (error) {
    content = `Error: ${error.message}`;
  } else if (data) {
    console.log("Data from OpenAI API in display: ", data.result);

    const name = data.name || ""; // Get the name from the data or set it to an empty string if not present
    let characteristics = data.characteristics || ""; // Get the characteristics from the data or set it to an empty string if not present

    // Check if characteristics is an array and join them into a string
    if (Array.isArray(characteristics)) {
      characteristics = characteristics.map(trait => trait.trait).join(", ");
    }

    content = (
      <>
        <p>Name: {name}</p>
        <p>Characteristics: {characteristics}</p>
        <p>Prompt Result: {data.promptResult}</p> {/* Display the prompt result */}
      </>
    );
  } else {
    content = "";
  }

  return <div className="response-display">{content}</div>;
};

export default ResponseDisplay;
