# Chef Claude Recipe Suggestion App

## Overview
Chef Claude is a web application that suggests recipes based on a list of ingredients provided by the user. It leverages AI models to generate recipe ideas, making cooking easier and more enjoyable.

## Project Structure
```
Chef-Claude
├── src
│   ├── ai.js                # Main logic for interacting with AI models
│   └── components           # React components for the application
├── .env                     # Environment variables for API keys
├── package.json             # npm configuration file
├── README.md                # Project documentation
└── .gitignore               # Files and directories to ignore by Git
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Chef-Claude
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your API keys:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   HF_ACCESS_TOKEN=your_huggingface_access_token
   ```

4. **Run the Application**
   Start the application using:
   ```bash
   npm start
   ```

## Usage
- Input a list of ingredients you have on hand.
- Receive a recipe suggestion based on those ingredients.

## Contributing
Feel free to submit issues or pull requests to improve the application. 

## License
This project is licensed under the MIT License.