### Overview

This Telegram bot is designed to provide users with up-to-date weather information for their specific location. Built using JavaScript and the GrammyJS library. It relies on the OpenWeatherMap API for fetching weather data.

### Features

1. **Current Weather**: Users can get the current weather conditions for their location.
2. **Forecast**: Can provide a weather forecast for the upcoming days.

### Installation

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/your-repo/weather-bot.git
   ```

2. Install dependencies using npm or yarn.
   ```bash
   npm install
   ```

3. Sign up on [OpenWeatherMap](https://openweathermap.org/api) to obtain an API key.

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key.
   ```
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

5. Set up a Telegram bot and obtain the API token.

6. Add your Telegram bot token to the `.env` file.
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   ```

7. Run the bot.
   ```bash
   npm start
   ```

### Usage

You can find my Bot by simply typing @w34ather_bot in the Telegram search bar.
These are the following commands:
- `/language`: You can choose from English and Russian language.
- `/forecast`: You can get the weather forecast for the upcoming days.

### Dependencies

- **GrammyJS**: A library for building Telegram bots and clients in JavaScript. [Link](https://github.com/grammyjs)
- **OpenWeatherMap API**: Provides weather data for any location worldwide. [Link](https://openweathermap.org/api)

### Contributing

Contributions to this project are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

---

Thank you for using the Weather Telegram Bot! If you encounter any issues or have suggestions for improvements, please don't hesitate to reach out.
