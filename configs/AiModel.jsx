/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// === Text Model ===
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// === Generation Config ===
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// === Generate Course Layout ===
export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter \nName ,about, Duration: Category: 'Programming',\nTopic: Python, Level:Basic, Duration: 1 hours,\nNoOf Chapters:5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Python Programming for Beginners",\n    "description": "Learn the fundamentals of Python programming, from basic syntax to core concepts like variables, data types, loops, and functions. This course is designed for absolute beginners with no prior programming experience.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "This chapter covers the history of Python, its features, and why it\'s a popular choice for beginners. We\'ll also set up your development environment and write your first Python program.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Variables and Data Types",\n        "about": "Learn about different data types in Python, such as integers, floats, strings, and booleans. We\'ll explore how to assign values to variables and perform basic operations on them.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Control Flow and Loops",\n        "about": "Discover how to control the flow of your Python programs using conditional statements (if, elif, else). You\'ll learn about loops (for, while) and how to iterate over collections of data.",\n        "duration": "25 minutes"\n      },\n      {\n        "name": "Functions and Modules",\n        "about": "This chapter teaches you how to create and use your own functions to organize code and improve reusability. We\'ll also explore how to import and use modules to extend your Python capabilities.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Lists, Tuples, and Dictionaries",\n        "about": "Learn about different data structures in Python, including lists (ordered collections), tuples (immutable sequences), and dictionaries (key-value pairs). You\'ll explore common operations and methods associated with each structure.",\n        "duration": "20 minutes"\n      }\n    ],\n    "duration": "1 hour",\n    "category": "Programming",\n    "topic": "Python",\n    "level": "Basic",\n    "noOfChapters": 5\n  }\n}\n```',
        },
      ],
    },
  ],
});

// === Generate Chapter Content ===
export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Python Basic Chapter:variables and Data types in JSON Format with list of array with field as title,explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```json\n{\n  \"title\": \"Variables and Data Types in Python\",\n  \"explanation\": \"Variables are like containers that hold data in your Python programs.  They allow you to store and manipulate information efficiently. Data types define what kind of information a variable can hold.  Let's explore these concepts in detail:\\n\\n**1. Variables:**\\n... (truncated for brevity) ...\n}\n```",
        },
      ],
    },
  ],
});