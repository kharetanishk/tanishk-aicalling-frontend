# 🧠 AI Voice Portfolio

A futuristic voice-powered portfolio that lets users talk to me and hear AI-powered responses. It’s built with React, powered by the Web Speech API for voice interaction, and uses OpenAI to generate intelligent replies.

---
## 📸 Live Demo
👉 [Visit My Voice Portfolio](https://tanishk-khare.me)  
🧪 **Best viewed in Google Chrome (desktop or Android)**


## ✨ Features

- 🎙️ **Tap-to-Talk Interface** – Start conversations with a single click.
- 🧠 **AI Chat Responses** – Integrated with OpenAI to respond smartly.
- 🗣️ **Text-to-Speech** – The portfolio speaks back using Web Speech API.
- 🔄 **Mic-Aware Flow** – Automatically manages listening/speaking states.
- 🛑 **Permission Handling** – Detects and responds to mic permission denials.
- 📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop.

---

## 🧰 Tech Stack

- **Frontend**: React + Tailwind CSS
- **AI Integration**: OpenAI API (ChatGPT)
- **Speech Recognition**: Web Speech API (`SpeechRecognition`)
- **Text-to-Speech**: `SpeechSynthesis`
- **State Management**: Recoil
- **Routing**: React Router

---

## 🚦 Browser Compatibility & iOS Limitation

This project uses the **Web Speech API**, which is supported differently across browsers and devices:

- ✅ **Best Performance**: Chrome on **Windows**, **macOS**, and **Android**
- ⚠️ **Limited/No Support**: **Safari/iOS (iPhone/iPad)** has restrictions

### Why doesn't it work well on iPhone?

Apple’s **Safari** browser on iOS **does not fully support the Web Speech API**, especially `SpeechRecognition`. Unlike Chrome, iOS does not allow continuous microphone input via the browser due to **privacy sandboxing and native audio API restrictions**. That’s why the voice features may **not function properly on iPhones**.

> 💡 For best experience, use **Google Chrome on a laptop, MacBook, or Android device**.

---
☁️ Cloud deployment on AWS Free Tier

_----------------------------------------------
# Known Issues
🔇 SpeechSynthesis may not work if multiple tabs use it.

🧏‍♂️ Mic may auto-disable after inactivity.

🚫 iOS devices cannot use the mic properly due to system-level limitations.

____________________________________________

## 🚀 Getting Started

```bash
git clone https://github.com/kharetanishk/tanishk-aicalling-frontend.git
cd ai-voice-portfolio
npm install
npm run dev



 How to Use
Open the app in Google Chrome.

Click on the microphone icon.

Ask questions like:

“Tell me about yourself”

“What projects have you built?”

“What are your skills?”

Listen to the AI speak back to you.




Future Roadmap
🌍 Multi-language support

🧏 Voice visualization (waveforms)

