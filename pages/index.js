// file: /pages/index.js

import Head from "next/head";
import { useState } from "react";
import TextInput from "@/components/TextInput"; // Import the TextInput component
import SubmitButton from "@/components/SubmitButton";
import ResponseDisplay from "@/components/ResponseDisplay";
import useApi from "@/hooks/useApi";
import { getUserPrompt } from "../prompts/promptUtils";

const Home = () => {
  const [nameInput, setNameInput] = useState(""); // State to store user input name
  const { data, error, loading, fetchData } = useApi();

  // Function to handle form submission and API call
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitValue = getUserPrompt(nameInput); // Generate user prompt with the input name
    // Make API call using useApi hook
    await fetchData("/api/openai", "POST", submitValue);
  };

  // Function to handle input field change
  const handleInputChange = (event) => {
    setNameInput(event.target.value); // Update the nameInput state with user input
  };

  return (
    <>
      <Head>
        <title>Name Characteristics Generator</title>
        <meta name="description" content="Name Characteristics Generator - Generate symbolic meanings and personality traits associated with names." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Name Characteristics Generator</h1>
        <p>Enter a name to generate symbolic meanings and personality traits associated with it:</p>
        <form onSubmit={handleSubmit}>
          <ResponseDisplay data={data} error={error} loading={loading} />
          <TextInput
            value={nameInput}
            onChange={handleInputChange}
            placeholder="Enter a name"
          />
          <SubmitButton disabled={loading} />
        </form>
      </main>
    </>
  );
};

export default Home;
