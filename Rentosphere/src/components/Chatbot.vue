<template>
  <div class="chatbot-wrapper">

    <!-- =========================================
         FLOATING CHAT BUTTON
    ========================================== -->

    <button
      v-if="!isOpen"
      class="chatbot-button"
      type="button"
      aria-label="Open Rentosphere Assistant"
      @click="openChat"
    >
      <span class="chatbot-icon">💬</span>
    </button>


    <!-- =========================================
         CHAT WINDOW
    ========================================== -->

    <transition name="chat-slide">

      <div
        v-if="isOpen"
        class="chat-window"
      >

        <!-- =====================================
             HEADER
        ====================================== -->

        <div class="chat-header">

          <div class="header-info">

            <div class="assistant-avatar">
              R
            </div>

            <div>
              <h3>Rentosphere Assistant</h3>

              <span class="online-status">
                <span class="online-dot"></span>
                Online
              </span>
            </div>

          </div>


          <button
            class="close-button"
            type="button"
            aria-label="Close chat"
            @click="closeChat"
          >
            ×
          </button>

        </div>


        <!-- =====================================
             MESSAGES
        ====================================== -->

        <div
          ref="messagesContainer"
          class="messages-container"
        >

          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'message-wrapper',
              message.sender === 'user'
                ? 'user-wrapper'
                : 'bot-wrapper'
            ]"
          >

            <div
              :class="[
                'message',
                message.sender === 'user'
                  ? 'user-message'
                  : 'bot-message'
              ]"
            >
              {{ message.text }}
            </div>

          </div>


          <!-- ===================================
               TYPING INDICATOR
          ==================================== -->

          <div
            v-if="isLoading"
            class="message-wrapper bot-wrapper"
          >

            <div class="message bot-message typing-message">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>


          <!-- ===================================
               LISTENING INDICATOR
          ==================================== -->

          <div
            v-if="isListening"
            class="listening-status"
          >

            <div class="listening-animation">

              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

            <span>
              Listening...
            </span>

          </div>

        </div>


        <!-- =====================================
             VOICE ERROR
        ====================================== -->

        <div
          v-if="voiceError"
          class="voice-error"
        >
          {{ voiceError }}
        </div>


        <!-- =====================================
             INPUT AREA
        ====================================== -->

        <form
          class="chat-input-area"
          @submit.prevent="sendMessage"
        >

          <input
            v-model="inputMessage"
            type="text"
            placeholder="Ask Rentosphere something..."
            :disabled="isLoading || isListening"
            autocomplete="off"
          />


          <!-- ===================================
               MICROPHONE BUTTON
          ==================================== -->

          <button
            class="mic-button"
            :class="{ listening: isListening }"
            type="button"
            :disabled="isLoading || !speechSupported"
            :aria-label="
              isListening
                ? 'Stop listening'
                : 'Speak your message'
            "
            :title="
              !speechSupported
                ? 'Voice input is not supported in this browser'
                : isListening
                  ? 'Stop listening'
                  : 'Speak your message'
            "
            @click="toggleListening"
          >

            <span
              v-if="isListening"
              class="stop-icon"
            >
              ■
            </span>

            <span
              v-else
              class="mic-icon"
            >
              🎤
            </span>

          </button>


          <!-- ===================================
               SEND BUTTON
          ==================================== -->

          <button
            class="send-button"
            type="submit"
            :disabled="
              !inputMessage.trim() ||
              isLoading ||
              isListening
            "
            aria-label="Send message"
          >
            ➤
          </button>

        </form>


        <!-- =====================================
             VOICE SUPPORT MESSAGE
        ====================================== -->

        <div
          v-if="!speechSupported"
          class="voice-not-supported"
        >
          Voice input is not supported in this browser.
        </div>


        <!-- =====================================
             FOOTER
        ====================================== -->

        <div class="chat-footer">
          Rentosphere Assistant
        </div>

      </div>

    </transition>

  </div>
</template>


<script setup>

import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'


/* ============================================
   CHAT STATE
============================================ */

const isOpen = ref(false)

const inputMessage = ref('')

const isLoading = ref(false)

const messages = ref([])

const messagesContainer = ref(null)


/* ============================================
   VOICE STATE
============================================ */

const isListening = ref(false)

const speechSupported = ref(false)

const voiceError = ref('')

let recognition = null

let microphoneStream = null

let voiceTranscript = ''


/* ============================================
   INITIAL WELCOME MESSAGE
============================================ */

messages.value.push({
  sender: 'bot',
  text: 'Hi! I’m the Rentosphere Assistant. How can I help you with Rentosphere today?'
})


/* ============================================
   CHECK SPEECH SUPPORT
============================================ */

function setupSpeechRecognition() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition


  if (!SpeechRecognition) {

    speechSupported.value = false

    return

  }


  speechSupported.value = true


  recognition = new SpeechRecognition()


  recognition.lang = 'en-US'

  recognition.continuous = false

  recognition.interimResults = true

  recognition.maxAlternatives = 1


  /* ==========================================
     RECOGNITION START
  ========================================== */

  recognition.onstart = () => {

    isListening.value = true

    voiceError.value = ''

    voiceTranscript = ''

  }


  /* ==========================================
     RECOGNITION RESULT
  ========================================== */

  recognition.onresult = (event) => {
    console.log(event); 
    
 
    let transcript = ''

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {

      transcript +=
        event.results[i][0].transcript

    }


    voiceTranscript =
      transcript.trim()


    inputMessage.value =
      voiceTranscript

  }


  /* ==========================================
     RECOGNITION ERROR
  ========================================== */

  recognition.onerror = (event) => {

    console.error(
      'Speech recognition error:',
      event.error
    )


    isListening.value = false


    switch (event.error) {

      case 'not-allowed':

        voiceError.value =
          'Microphone access was denied. Please allow microphone access in your browser settings.'

        break


      case 'audio-capture':

        voiceError.value =
          'No microphone was detected. Please check your microphone and try again.'

        break


      case 'no-speech':

        voiceError.value =
          'I didn’t hear anything. Please try speaking again.'

        break


      case 'network':

        voiceError.value =
          'Voice recognition could not connect. Please check your internet connection.'

        break


      default:

        voiceError.value =
          'I could not understand the voice input. Please try again.'

    }

  }


  /* ==========================================
     RECOGNITION END
  ========================================== */

  recognition.onend = async () => {

    isListening.value = false


    /*
      If we received speech, automatically
      send it to the Rentosphere chatbot.
    */

    if (voiceTranscript.trim()) {

      const messageToSend =
        voiceTranscript.trim()


      voiceTranscript = ''


      /*
        Small delay so the user can see
        the recognized text briefly.
      */

      await new Promise(
        resolve => setTimeout(resolve, 300)
      )


      inputMessage.value =
        messageToSend


      await sendMessage()

    }

  }

}


/* ============================================
   MICROPHONE PERMISSION
============================================ */

async function requestMicrophonePermission() {

  try {

    /*
      Request microphone access.

      This causes the browser's permission
      dialog to appear when necessary.
    */

    microphoneStream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      })


    /*
      We only need the permission.

      SpeechRecognition handles the actual
      speech recognition, so we stop this
      temporary stream immediately.
    */

    microphoneStream
      .getTracks()
      .forEach(track => track.stop())


    microphoneStream = null


    return true

  } catch (error) {

    console.error(
      'Microphone permission error:',
      error
    )


    if (
      error.name === 'NotAllowedError' ||
      error.name === 'PermissionDeniedError'
    ) {

      voiceError.value =
        'Microphone access was denied. Please allow microphone access in your browser settings.'

    } else if (
      error.name === 'NotFoundError'
    ) {

      voiceError.value =
        'No microphone was found. Please connect a microphone and try again.'

    } else if (
      error.name === 'NotReadableError'
    ) {

      voiceError.value =
        'Your microphone is currently being used by another application.'

    } else {

      voiceError.value =
        'Unable to access your microphone. Please check your browser permissions.'

    }


    return false

  }

}


/* ============================================
   START LISTENING
============================================ */

async function startListening() {

  if (
    !speechSupported.value ||
    !recognition ||
    isLoading.value
  ) {

    return

  }


  voiceError.value = ''


  /*
    Request microphone permission first.
  */

  const permissionGranted =
    await requestMicrophonePermission()


  if (!permissionGranted) {

    return

  }


  try {

    inputMessage.value = ''

    voiceTranscript = ''


    recognition.start()

  } catch (error) {

    console.error(
      'Unable to start speech recognition:',
      error
    )


    isListening.value = false


    voiceError.value =
      'Unable to start voice input. Please try again.'

  }

}


/* ============================================
   STOP LISTENING
============================================ */

function stopListening() {

  if (
    recognition &&
    isListening.value
  ) {

    recognition.stop()

  }

}


/* ============================================
   TOGGLE MICROPHONE
============================================ */

function toggleListening() {

  if (isListening.value) {

    stopListening()

  } else {

    startListening()

  }

}


/* ============================================
   SEND MESSAGE
============================================ */

async function sendMessage() {

  const message =
    inputMessage.value.trim()


  if (
    !message ||
    isLoading.value
  ) {

    return

  }


  /*
    Add user's message.
  */

  messages.value.push({
    sender: 'user',
    text: message
  })


  inputMessage.value = ''

  isLoading.value = true

  voiceError.value = ''


  await scrollToBottom()


  try {

    const response =
      await fetch(
        'http://localhost:3000/api/chat',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({
            message: message
          })
        }
      )


    const data =
      await response.json()


    if (
      !response.ok ||
      !data.success
    ) {

      throw new Error(
        data.message ||
        'Unable to get a response.'
      )

    }


    /*
      Clean the AI response before
      displaying it.
    */

    messages.value.push({
      sender: 'bot',
      text: cleanResponse(data.reply)
    })


  } catch (error) {

    console.error(
      'Chatbot error:',
      error
    )


    messages.value.push({
      sender: 'bot',

      text:
        'Sorry, I’m having trouble connecting to the Rentosphere Assistant right now. Please try again.'
    })


  } finally {

    isLoading.value = false

    await scrollToBottom()

  }

}


/* ============================================
   CLEAN AI RESPONSE
============================================ */

function cleanResponse(text) {

  if (!text) {

    return ''

  }


  return text

    /* Remove Markdown headings */
    .replace(
      /^#{1,6}\s*/gm,
      ''
    )

    /* Remove bold Markdown */
    .replace(
      /\*\*(.*?)\*\*/g,
      '$1'
    )

    /* Remove italic Markdown */
    .replace(
      /\*(.*?)\*/g,
      '$1'
    )

    /* Remove underline Markdown */
    .replace(
      /__(.*?)__/g,
      '$1'
    )

    .replace(
      /_(.*?)_/g,
      '$1'
    )

    /* Remove inline code */
    .replace(
      /`([^`]+)`/g,
      '$1'
    )

    /* Remove Markdown bullets */
    .replace(
      /^\s*[-*+]\s+/gm,
      ''
    )

    /* Remove excessive blank lines */
    .replace(
      /\n{3,}/g,
      '\n\n'
    )

    .trim()

}


/* ============================================
   SCROLL TO BOTTOM
============================================ */

async function scrollToBottom() {

  await new Promise(
    resolve =>
      requestAnimationFrame(resolve)
  )


  if (!messagesContainer.value) {

    return

  }


  messagesContainer.value.scrollTop =
    messagesContainer.value.scrollHeight

}


/* ============================================
   OPEN CHAT
============================================ */

function openChat() {

  isOpen.value = true

  scrollToBottom()

}


/* ============================================
   CLOSE CHAT
============================================ */

function closeChat() {

  if (isListening.value) {

    stopListening()

  }


  isOpen.value = false

}


/* ============================================
   COMPONENT START
============================================ */

onMounted(() => {

  setupSpeechRecognition()

})


/* ============================================
   COMPONENT CLEANUP
============================================ */

onBeforeUnmount(() => {

  if (recognition) {

    recognition.onstart = null

    recognition.onresult = null

    recognition.onerror = null

    recognition.onend = null


    try {

      recognition.stop()

    } catch (error) {

      // Recognition was already stopped.

    }

  }


  if (microphoneStream) {

    microphoneStream
      .getTracks()
      .forEach(track => track.stop())

  }

})

</script>


<style scoped>

/* ============================================
   MAIN WRAPPER
============================================ */

.chatbot-wrapper {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 9999;
}


/* ============================================
   FLOATING BUTTON
============================================ */

.chatbot-button {
  width: 60px;
  height: 60px;

  border: none;
  border-radius: 50%;

  background: #063b2f;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.20);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.chatbot-button:hover {
  transform: translateY(-3px);

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.25);
}


.chatbot-icon {
  font-size: 26px;
}


/* ============================================
   CHAT WINDOW
============================================ */

.chat-window {
  width: 360px;
  height: 520px;

  background: white;

  border-radius: 18px;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  box-shadow:
    0 15px 50px rgba(0, 0, 0, 0.20);

  border: 1px solid #e5e7eb;
}


/* ============================================
   HEADER
============================================ */

.chat-header {
  min-height: 70px;

  padding: 12px 16px;

  background: #063b2f;

  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;
}


.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}


.assistant-avatar {
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: white;

  color: #063b2f;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 19px;
  font-weight: 700;
}


.header-info h3 {
  margin: 0;

  font-size: 14px;
  font-weight: 600;
}


.online-status {
  display: flex;
  align-items: center;

  gap: 5px;

  margin-top: 3px;

  font-size: 11px;

  opacity: 0.9;
}


.online-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #45d483;
}


.close-button {
  width: 32px;
  height: 32px;

  border: none;
  background: transparent;

  color: white;

  font-size: 26px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* ============================================
   MESSAGES
============================================ */

.messages-container {
  flex: 1;

  overflow-y: auto;

  padding: 18px 14px;

  background: #f7f9f8;
}


.message-wrapper {
  display: flex;

  margin-bottom: 10px;
}


.bot-wrapper {
  justify-content: flex-start;
}


.user-wrapper {
  justify-content: flex-end;
}


.message {
  max-width: 80%;

  padding: 10px 13px;

  border-radius: 14px;

  font-size: 14px;

  line-height: 1.5;

  word-wrap: break-word;

  white-space: pre-line;
}


.bot-message {
  background: white;

  color: #26332f;

  border: 1px solid #e7ebe9;

  border-bottom-left-radius: 4px;
}


.user-message {
  background: #063b2f;

  color: white;

  border-bottom-right-radius: 4px;
}


/* ============================================
   TYPING INDICATOR
============================================ */

.typing-message {
  display: flex;

  align-items: center;

  gap: 4px;

  padding: 12px 15px;
}


.typing-message span {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #7a8580;

  animation: typing 1.2s infinite ease-in-out;
}


.typing-message span:nth-child(2) {
  animation-delay: 0.15s;
}


.typing-message span:nth-child(3) {
  animation-delay: 0.3s;
}


@keyframes typing {

  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  30% {
    transform: translateY(-4px);
    opacity: 1;
  }

}


/* ============================================
   LISTENING STATUS
============================================ */

.listening-status {
  display: flex;

  align-items: center;

  gap: 9px;

  width: fit-content;

  margin: 5px 0 10px 2px;

  padding: 8px 12px;

  background: white;

  border: 1px solid #e7ebe9;

  border-radius: 12px;

  color: #063b2f;

  font-size: 12px;

  font-weight: 500;
}


.listening-animation {
  display: flex;

  align-items: center;

  gap: 3px;

  height: 18px;
}


.listening-animation span {
  display: block;

  width: 3px;

  height: 7px;

  border-radius: 3px;

  background: #f5a000;

  animation: voiceWave 0.8s infinite ease-in-out;
}


.listening-animation span:nth-child(1) {
  animation-delay: 0s;
}


.listening-animation span:nth-child(2) {
  animation-delay: 0.15s;
}


.listening-animation span:nth-child(3) {
  animation-delay: 0.3s;
}


.listening-animation span:nth-child(4) {
  animation-delay: 0.45s;
}


@keyframes voiceWave {

  0%,
  100% {
    height: 6px;
  }

  50% {
    height: 17px;
  }

}


/* ============================================
   VOICE ERROR
============================================ */

.voice-error {
  padding: 8px 12px;

  background: #fff5f5;

  color: #b42318;

  border-top: 1px solid #f5d0d0;

  font-size: 11px;

  line-height: 1.4;
}


/* ============================================
   INPUT AREA
============================================ */

.chat-input-area {
  display: flex;

  align-items: center;

  gap: 7px;

  padding: 10px;

  background: white;

  border-top: 1px solid #e5e7eb;
}


.chat-input-area input {
  flex: 1;

  min-width: 0;

  height: 40px;

  padding: 0 12px;

  border: 1px solid #dfe5e2;

  border-radius: 10px;

  outline: none;

  font-family: inherit;

  font-size: 13px;

  color: #26332f;

  transition: border 0.2s ease;
}


.chat-input-area input:focus {
  border-color: #063b2f;
}


.chat-input-area input::placeholder {
  color: #98a29e;
}


.chat-input-area input:disabled {
  background: #f5f6f6;
}


/* ============================================
   MICROPHONE BUTTON
============================================ */

.mic-button {
  position: relative;

  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border: none;

  border-radius: 50%;

  background: #eef3f1;

  color: #063b2f;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.mic-button:hover:not(:disabled) {
  background: #dfeae6;

  transform: scale(1.05);
}


.mic-button:disabled {
  opacity: 0.45;

  cursor: not-allowed;
}


.mic-button.listening {
  background: #f5a000;

  color: white;

  animation: micPulse 1.2s infinite;
}


.mic-icon {
  font-size: 18px;
}


.stop-icon {
  font-size: 13px;
}


@keyframes micPulse {

  0% {
    box-shadow:
      0 0 0 0 rgba(245, 160, 0, 0.5);
  }

  70% {
    box-shadow:
      0 0 0 9px rgba(245, 160, 0, 0);
  }

  100% {
    box-shadow:
      0 0 0 0 rgba(245, 160, 0, 0);
  }

}


/* ============================================
   SEND BUTTON
============================================ */

.send-button {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border: none;

  border-radius: 50%;

  background: #063b2f;

  color: white;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 17px;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.send-button:hover:not(:disabled) {
  background: #085544;

  transform: scale(1.05);
}


.send-button:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}


/* ============================================
   VOICE NOT SUPPORTED
============================================ */

.voice-not-supported {
  padding: 5px 12px 8px;

  text-align: center;

  font-size: 10px;

  color: #8a938f;

  background: white;
}


/* ============================================
   FOOTER
============================================ */

.chat-footer {
  padding: 6px;

  text-align: center;

  background: white;

  border-top: 1px solid #f0f1f1;

  color: #9aa29f;

  font-size: 9px;
}


/* ============================================
   TRANSITION
============================================ */

.chat-slide-enter-active,
.chat-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}


.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;

  transform:
    translateY(15px)
    scale(0.97);
}


/* ============================================
   MOBILE
============================================ */

@media (max-width: 500px) {

  .chatbot-wrapper {
    right: 15px;
    bottom: 15px;
  }


  .chat-window {
    width: calc(100vw - 30px);

    height: 500px;
  }


  .chatbot-button {
    width: 56px;
    height: 56px;
  }

}

</style>