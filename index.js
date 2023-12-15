const express = require('express')
const shortid = require('shortid')
const morgan = require('morgan')
const TelegramBot = require('node-telegram-bot-api/lib/telegram')
require("dotenv").config()
const token = process.env.TOKEN
const serverUrl = process.env.SERVER_URL
const bot = new TelegramBot(token, { polling: true })
const cron = require("node-cron");
const axios = require("axios");
const port = 5000
const cors = require("cors")
app.use(cors())
const app = express();

app.listen(port, ()=>{
    console.log("server Started")
})

// middle wares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.get('/generate', async (request, response)=>{

   const id = await shortid.generate()

   response.status(200).json({status: "sucess", yourUniqueId: id})

    
})

bot.on("message", async (msg) => {
    
    const chatId = msg.chat.id
    const message = msg.text

    console.log(message)


    try{

  
   
        const response = await fetch(process.env.SERVER_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }, body: JSON.stringify({ message: message })
        })
    
        const data = await response.json();

        console.log(data)

        bot.sendMessage(chatId, data.response)

    } catch(error){

        console.log(error)

        bot.sendMessage(chatId, `Internal Server Error`)
    }

})

cron.schedule("*/10 * * * *", () => {
  try {
    console.log("cron running for server");
    axios.get("https://rsunx.onrender.com/starter");
    axios.get("https://nxtbot.onrender.com/generate");
  } catch (e) {
    console.log(e.message);
  }
});


