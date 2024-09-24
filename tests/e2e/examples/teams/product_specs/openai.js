const { Agent, Task, Team } = require('kaibanjs');
const {
  TavilySearchResults,
} = require('@langchain/community/tools/tavily_search');

// Define tools
const _searchTool = new TavilySearchResults({
  maxResults: 1,
  apiKey: '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',
});

// Define agents
const requirementsAnalyst = new Agent({
  name: 'Emma',
  role: 'Requirements Analyst',
  goal: 'Outline core functionalities and objectives for new features based on the founder’s input.',
  background: 'Business Analysis',
  tools: [],
});

const technicalWriter = new Agent({
  name: 'Lucas',
  role: 'Technical Writer',
  goal: 'Convert functional outlines into detailed technical specifications.',
  background: 'Technical Writing',
  tools: [],
});

const validator = new Agent({
  name: 'Mia',
  role: 'Validator',
  goal: 'Ensure the specifications are accurate and complete.',
  background: 'Quality Assurance',
  tools: [],
});

// Define tasks
const analysisTask = new Task({
  description: `Analyze the founder's idea: {founderIdea} and outline the necessary functionalities to implement it.`,
  expectedOutput: 'A functional outline of the Founder Idea',
  agent: requirementsAnalyst,
});

const writingTask = new Task({
  description: `Create detailed technical specifications based on the functional outline provided. Include user stories, system requirements, and acceptance criteria.`,
  expectedOutput:
    'A detailed technical specifications document. Must be in Markdown format.',
  isDeliverable: true,
  agent: technicalWriter,
});

const validationTask = new Task({
  description: `Review the technical specifications to ensure they match the founder's vision and that are technically feasible.`,
  expectedOutput:
    'A validated technical specifications document ready for development. Must be in Markdown format.',
  agent: validator,
});

// Create a team
const team = new Team({
  name: 'Product Specs Team',
  agents: [requirementsAnalyst, technicalWriter, validator],
  tasks: [analysisTask, writingTask, validationTask],
  inputs: {
    founderIdea: 'I want to add a Referral program to our SAAS platform.',
  }, // Initial input for the first task,
  env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY }, // Environment variables for the team
  logLevel: 'error',
});

module.exports = team;
