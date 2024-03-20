// file: /prompts/promptUtils.js

// Function to generate a prompt for the "Name Characteristics Generator" MVP
export function getUserPrompt(name) {
  return {
    role: "user",
    content: `Generate symbolic meanings and personality traits associated with the name "${name}".`,
  };
}

// Function to define functions for generating name characteristics
export function getFunctions() {
  return [
    {
      name: "generate_name_characteristics",
      description: "Generate symbolic meanings and personality traits associated with a name.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name for which characteristics are generated",
          },
          characteristics: {
            type: "string",
            description: "The generated symbolic meanings and personality traits",
          },
        },
        required: ["name", "characteristics"]
      },
    },
  ];
}
