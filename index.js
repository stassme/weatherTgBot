require('dotenv').config()
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, session} = require('grammy')
const { I18n } = require('@grammyjs/i18n')

const bot = new Bot(process.env.Bot_KEY)

const i18n = new I18n({
    directory: './locales', // directory where your language files are located
    useSession: true,
    defaultLocale: 'en'
});

bot.use(
    session({
      initial: () => {
        return {};
      },
    }),
  );

bot.use(i18n);

bot.api.setMyCommands([
  {command: 'language', description: 'Change language/Поменять язык'},
  {command: 'forecast', description: 'Forecast duration/Продолжительность прогноза'}
])

const inline_keyboard_language = new InlineKeyboard().text("🇬🇧English", 'english-lang')
.text("🇷🇺Русский", 'russian-lang')

bot.command(['language', 'start'], async (ctx)=>{
    await ctx.reply("Choose language / Выберите язык", {
        reply_markup: inline_keyboard_language,
        parse_mode:"HTML"
    })
})
    
const weather_dur_en = new InlineKeyboard()
    .text("1 Day", 'forecastForOneDay')
    .text("3 Days", 'forecastForThreeDays')

bot.callbackQuery('english-lang', async (ctx)=>{
    await ctx.i18n.setLocale('en');
    await ctx.answerCallbackQuery("Language set to English")
    await ctx.reply("Choose the duration of forecast", {
      reply_markup: weather_dur_en
    })
  })

  const weather_dur_ru = new InlineKeyboard()
  .text("1 День", 'forecastForOneDay')
  .text("3 Дня", 'forecastForThreeDays')

bot.callbackQuery('russian-lang', async (ctx)=>{
  await ctx.i18n.setLocale('ru');
  await ctx.answerCallbackQuery("Язык изменен на Русский")
  await ctx.reply("Выберите продолжительность прогноза", {
    reply_markup: weather_dur_ru
  })
  
})

bot.command('forecast', async (ctx)=>{
  let a = await ctx.i18n.getLocale()
  console.log(a);
  if(a === 'en'){
    await ctx.reply("Choose the duration of forecast", {
      reply_markup: weather_dur_en
  })
  }
  else {
    await ctx.reply("Выберите продолжительность прогноза", {
      reply_markup: weather_dur_ru
  })
  }
})

  const loc1 = new Keyboard().requestLocation('📍Location').resized()

  let userState = {};

  bot.callbackQuery('forecastForOneDay', async (ctx)=>{
    userState[ctx.from.id] = 'forecastForOneDay';
    await ctx.reply(ctx.t("location_request"), {
          reply_markup: loc1
        })
  })

  bot.callbackQuery('forecastForThreeDays', async (ctx)=>{
    userState[ctx.from.id] = 'forecastForThreeDays';
    await ctx.reply(ctx.t("location_request"), {
          reply_markup: loc1
        })
  })

  bot.on(':location', async (ctx)=>{
    if(userState[ctx.from.id] === 'forecastForOneDay')
    {
      let lat = ctx.message.location.latitude
      let long = ctx.message.location.longitude
      let lang = await ctx.i18n.getLocale()
      let apiKey = process.env.WEATHER_KEY
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&lang=${lang}&exclude=current,minutely,hourly&units=metric`)
      .then(function(resp) {
        return resp.json()
      })
    .then(data=>{
      let date = data.daily[0].dt
      let specificDate = new Date(date * 1000)
      let smth = specificDate.getDay()

      let numberdate = specificDate.toLocaleDateString()

      let t = Math.round(data.daily[0].temp.day)
      let t_min = Math.round(data.daily[0].temp.min)
      let t_feels = Math.round(data.daily[0].feels_like.day)
      let humid = Math.round(data.daily[0].humidity)
      let wind = Math.round(data.daily[0].wind_speed)
      let summary = data.daily[0].weather[0].description

      ctx.reply(ctx.t('weather-msg', {
        day:ctx.t(`day${smth}`),
        date:numberdate,
        temp:t,
        tempmin:t_min,
        tempfeels:t_feels,
        humidity:humid,
        windspeed:wind,
        sumdes:summary
      }).replace(/\\n/g, '\n'), {
        parse_mode:'HTML'
      })
      delete userState[ctx.from.id]

    })
    }
    else if (userState[ctx.from.id] === 'forecastForThreeDays'){
      let lat = ctx.message.location.latitude
      let long = ctx.message.location.longitude
      let lang = await ctx.i18n.getLocale()
      let apiKey = process.env.WEATHER_KEY
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&lang=${lang}&exclude=current,minutely,hourly&units=metric`)
      .then(function(resp) {
        return resp.json()
    })
    .then(data=>{
      let date = data.daily[0].dt
      let specificDate = new Date(date * 1000)
      let smth = specificDate.getDay()
      let numberdate = specificDate.toLocaleDateString()
      let t = Math.round(data.daily[0].temp.day)
      let t_min = Math.round(data.daily[0].temp.min)
      let t_feels = Math.round(data.daily[0].feels_like.day)
      let humid = Math.round(data.daily[0].humidity)
      let wind = Math.round(data.daily[0].wind_speed)
      let summary = data.daily[0].weather[0].description

      let date2 = data.daily[1].dt
      let specificDate2 = new Date(date2 * 1000)
      let smth2 = specificDate2.getDay()
      let numberdate2 = specificDate2.toLocaleDateString()
      let t2 = Math.round(data.daily[1].temp.day)
      let t_min2 = Math.round(data.daily[1].temp.min)
      let t_feels2 = Math.round(data.daily[1].feels_like.day)
      let humid2 = Math.round(data.daily[1].humidity)
      let wind2 = Math.round(data.daily[1].wind_speed)
      let summary2 = data.daily[1].weather[0].description

      let date3 = data.daily[2].dt
      let specificDate3 = new Date(date3 * 1000)
      let smth3 = specificDate3.getDay()
      let numberdate3 = specificDate3.toLocaleDateString()
      let t3 = Math.round(data.daily[2].temp.day)
      let t_min3 = Math.round(data.daily[2].temp.min)
      let t_feels3 = Math.round(data.daily[2].feels_like.day)
      let humid3 = Math.round(data.daily[2].humidity)
      let wind3 = Math.round(data.daily[2].wind_speed)
      let summary3 = data.daily[2].weather[0].description


      ctx.reply(ctx.t('weather-msg', {
        day:ctx.t(`day${smth}`),
        date:numberdate,
        temp:t,
        tempmin:t_min,
        tempfeels:t_feels,
        humidity:humid,
        windspeed:wind,
        sumdes:summary
      }).replace(/\\n/g, '\n'), {
        parse_mode:'HTML'
      })

      ctx.reply(ctx.t('weather2-msg', {
        day:ctx.t(`day${smth2}`),
        date:numberdate2,
        temp:t2,
        tempmin:t_min2,
        tempfeels:t_feels2,
        humidity:humid2,
        windspeed:wind2,
        sumdes:summary2
      }).replace(/\\n/g, '\n'), {
        parse_mode:'HTML'
      })

      ctx.reply(ctx.t('weather3-msg', {
        day:ctx.t(`day${smth3}`),
        date:numberdate3,
        temp:t3,
        tempmin:t_min3,
        tempfeels:t_feels3,
        humidity:humid3,
        windspeed:wind3,
        sumdes:summary3
      }).replace(/\\n/g, '\n'), {
        parse_mode:'HTML'
      })
      delete userState[ctx.from.id]
    })
    }
    
  })


bot.command("language", async (ctx) => {
    if (ctx.match === "") {
      return await ctx.reply(ctx.t("language.specify-a-locale"));
    }
  
    // `i18n.locales` contains all the locales that have been registered
    if (!i18n.locales.includes(ctx.match)) {
      return await ctx.reply(ctx.t("language.invalid-locale"));
    }
  
    // `ctx.i18n.getLocale` returns the locale currently using.
    if ((await ctx.i18n.getLocale()) === ctx.match) {
      return await ctx.reply(ctx.t("language.already-set"));
    }
  
    await ctx.i18n.setLocale(ctx.match);
    await ctx.reply(ctx.t("language.language-set"));
  });


  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

 



  bot.on('msg', async (ctx)=>{
    console.log(ctx);
    await ctx.reply(ctx.t('random'))
})

bot.start()

