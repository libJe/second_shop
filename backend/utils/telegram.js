const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const configs = require("../configs");

const token = configs.TELEGRAM_BOT_API;

// enable polling allow bot continuously send requests to telegram server if there any new updates
const bot = new TelegramBot(token, { polling: true });

// State object to keep track of user responses for each chat
const state = {};

bot.onText(/\/createproduct/, (msg) => {
  const chatId = msg.chat.id;

  // Set initial state for the chat
  state[chatId] = {
    category: null,
    answers: {},
  };

  bot.sendMessage(chatId, "Please select a category:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Appliances", callback_data: "appliances" }],
        [{ text: "Computers & Tablets", callback_data: "computers_&_tablets" }],
        [{ text: "Accessories", callback_data: "accessories" }],
        [
          {
            text: "Home, Furniture & Office",
            callback_data: "home_&_furniture_&_office",
          },
        ],
      ],
    },
  });
});

bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const category = callbackQuery.data;

  // Update state with the selected category
  state[chatId].category = category;

  // Ask the first question based on the selected category
  askNextQuestion(chatId);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const answer = msg.text;

  // Get the current question index for the chat
  const questionIndex = state[chatId].currentQuestionIndex;

  // Store the user's answer
  state[chatId].answers[questionIndex] = answer;

  // Ask the next question
  askNextQuestion(chatId);
});

function askNextQuestion(chatId) {
  const currentCategory = state[chatId].category;
  const currentQuestionIndex = state[chatId].currentQuestionIndex || 0;

  // Define the questions for each category
  const questions = {
    appliances: [
      "Please provide the appliances brand:",
      "Please provide the appliances model:",
      "Please provide the appliances color:",
    ],
    "computers_&_tablets": [
      "Please provide the computer & tablets brand:",
      "Please provide the computer & tablets model:",
      "Please provide the computer & tablets RAM size:",
      "Please provide the computer & tablets storage capacity:",
      "Please provide the computer & tablets screen size:",
    ],
    accessories: [
      "Please provide the accessories details:",
    ],
    home: [
      "Please provide the Home, Furniture & Office details:",
    ],
  };

  // If all questions have been asked, save the answers and send a completion message
  if (currentQuestionIndex >= questions[currentCategory].length) {
    const answers = state[chatId].answers;
    saveProduct(chatId, currentCategory, answers);
    bot.sendMessage(chatId, "Thank you! Your product has been saved.");
    // Optionally, perform any additional actions or notifications
    return;
  }

  const currentQuestion = questions[currentCategory][currentQuestionIndex];
  bot.sendMessage(chatId, currentQuestion);

  // Update the current question index for the chat
  state[chatId].currentQuestionIndex = currentQuestionIndex + 1;
}

function saveProduct(chatId, category, answers) {
  // Save the product to MongoDB or perform any necessary operations with the answers
  console.log("Category:", category);
  console.log("Answers:", answers);
  // Implement the appropriate logic based on your requirements
}
