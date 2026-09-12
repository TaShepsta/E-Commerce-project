<template>
  <div class="chatbot-container">

    <!-- Chat Window -->
    <transition name="chat">
      <div
        v-if="isOpen"
        class="chat-window"
      >

        <!-- Header -->
        <div class="chat-header">
          <div class="assistant-info">
            <div class="assistant-icon">
              🚚
            </div>

            <div>
              <h3>Rentosphere Assistant</h3>
              <span>Online</span>
            </div>
          </div>

          <button
            class="close-button"
            @click="toggleChat"
            aria-label="Close chatbot"
          >
            ×
          </button>
        </div>

        <!-- Messages -->
        <div
          ref="messagesContainer"
          class="chat-messages"
        >

          <!-- Welcome message -->
          <div class="message-row bot-row">
            <div class="message bot-message">
              Hi! 👋 I'm the Rentosphere Assistant.
              How can I help you with Rentosphere today?
            </div>
          </div>

          <!-- Conversation -->
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'message-row',
              message.sender === 'user'
                ? 'user-row'
                : 'bot-row'
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

          <!-- Typing indicator -->
          <div
            v-if="isLoading"
            class="message-row bot-row"
          >
            <div class="message bot-message typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </div>

        <!-- Input -->
        <form
          class="chat-input-area"
          @submit.prevent="sendMessage"
        >
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Ask about Rentosphere..."
            :disabled="isLoading"
            autocomplete="off"
          />

          <button
            type="submit"
            :disabled="!inputMessage.trim() || isLoading"
            aria-label="Send message"
          >
            ➤
          </button>
        </form>

      </div>
    </transition>

    <!-- Floating Button -->
    <button
      class="chat-button"
      @click="toggleChat"
      :aria-label="isOpen ? 'Close chat' : 'Open chat'"
    >
      <span v-if="!isOpen">💬</span>
      <span v-else>×</span>
    </button>

  </div>
</template>

<script setup>
import {
  ref,
  nextTick
} from 'vue'

const isOpen = ref(false)

const inputMessage = ref('')

const isLoading = ref(false)

const messages = ref([])

const messagesContainer = ref(null)


// -------------------------------------
// OPEN / CLOSE CHAT
// -------------------------------------

function toggleChat() {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    scrollToBottom()
  }
}


// -------------------------------------
// SEND MESSAGE
// -------------------------------------

async function sendMessage() {

  const message = inputMessage.value.trim()

  if (!message || isLoading.value) {
    return
  }

  // Add user's message
  messages.value.push({
    sender: 'user',
    text: message
  })

  // Clear input
  inputMessage.value = ''

  // Show loading
  isLoading.value = true

  await scrollToBottom()

  try {

    const response = await fetch(
      'http://localhost:3000/api/chat',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          message: message
        })
      }
    )

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
        'Unable to get a response.'
      )
    }

    function cleanResponse(text) {
  if (!text) {
    return ''
  }

  return text
    // Remove Markdown headings
    .replace(/^#{1,6}\s*/gm, '')

    // Remove bold / italic Markdown
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')

    // Remove inline code formatting
    .replace(/`([^`]+)`/g, '$1')

    // Remove Markdown bullet points
    .replace(/^\s*[-*+]\s+/gm, '')

    // Clean excessive blank lines
    .replace(/\n{3,}/g, '\n\n')

    // Remove unnecessary spaces
    .trim()
}

    // Add AI response
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
      text: 'Sorry, I’m having trouble connecting to the Rentosphere Assistant right now. Please try again.'
    })

  } finally {

    isLoading.value = false

    await scrollToBottom()
  }
}


// -------------------------------------
// AUTO SCROLL
// -------------------------------------

async function scrollToBottom() {

  await nextTick()

  if (messagesContainer.value) {

    messagesContainer.value.scrollTop =
      messagesContainer.value.scrollHeight
  }
}
</script>


<style scoped>

/* =====================================
   CONTAINER
===================================== */

.chatbot-container {
  position: fixed;
  right: 25px;
  bottom: 25px;

  z-index: 9999;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =====================================
   FLOATING BUTTON
===================================== */

.chat-button {
  width: 62px;
  height: 62px;

  border: none;
  border-radius: 50%;

  background: #111827;
  color: white;

  font-size: 28px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.chat-button:hover {
  transform: scale(1.08);

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.28);
}


/* =====================================
   CHAT WINDOW
===================================== */

.chat-window {
  position: absolute;

  right: 0;
  bottom: 78px;

  width: 360px;
  height: 520px;

  background: white;

  border-radius: 18px;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  box-shadow:
    0 15px 45px rgba(0, 0, 0, 0.2);

  border: 1px solid #e5e7eb;
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
/* =====================================
   HEADER
===================================== */

.chat-header {
  background: #111827;
  color: white;

  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.assistant-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.assistant-icon {
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
}

.assistant-info h3 {
  margin: 0;

  font-size: 15px;
  font-weight: 600;
}

.assistant-info span {
  display: block;

  margin-top: 3px;

  font-size: 12px;

  opacity: 0.75;
}

.close-button {
  border: none;

  background: transparent;

  color: white;

  font-size: 28px;

  cursor: pointer;

  line-height: 1;
}


/* =====================================
   MESSAGES
===================================== */

.chat-messages {
  flex: 1;

  padding: 16px;

  overflow-y: auto;

  background: #f9fafb;
}

.message-row {
  display: flex;

  margin-bottom: 12px;
}

.bot-row {
  justify-content: flex-start;
}

.user-row {
  justify-content: flex-end;
}

.message {
  max-width: 80%;

  padding: 10px 13px;

  border-radius: 14px;

  font-size: 14px;

  line-height: 1.5;

  word-wrap: break-word;
}

.bot-message {
  background: white;

  color: #1f2937;

  border: 1px solid #e5e7eb;

  border-bottom-left-radius: 4px;
}

.user-message {
  background: #111827;

  color: white;

  border-bottom-right-radius: 4px;
}


/* =====================================
   TYPING INDICATOR
===================================== */

.typing {
  display: flex;

  gap: 4px;

  padding: 13px 15px;
}

.typing span {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #6b7280;

  animation: typing 1.4s infinite ease-in-out;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {

  0%,
  60%,
  100% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-5px);
  }
}


/* =====================================
   INPUT
===================================== */

.chat-input-area {
  display: flex;

  align-items: center;

  padding: 10px;

  background: white;

  border-top: 1px solid #e5e7eb;

  gap: 8px;
}

.chat-input-area input {
  flex: 1;

  min-width: 0;

  border: 1px solid #d1d5db;

  border-radius: 22px;

  padding: 10px 14px;

  font-size: 14px;

  outline: none;
}

.chat-input-area input:focus {
  border-color: #111827;
}

.chat-input-area input:disabled {
  background: #f3f4f6;
}

.chat-input-area button {
  width: 40px;
  height: 40px;

  border: none;

  border-radius: 50%;

  background: #111827;

  color: white;

  cursor: pointer;

  font-size: 17px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-input-area button:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}


/* =====================================
   ANIMATION
===================================== */

.chat-enter-active,
.chat-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;

  transform:
    translateY(15px)
    scale(0.95);
}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 600px) {

  .chatbot-container {
    right: 15px;
    bottom: 15px;
  }

  .chat-window {
    position: fixed;

    right: 15px;
    bottom: 85px;

    width: calc(100vw - 30px);

    height: min(520px, 70vh);
  }

  .chat-button {
    width: 58px;
    height: 58px;

    font-size: 25px;
  }
}

</style>