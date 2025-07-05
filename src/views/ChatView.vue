<template>
  <div class="max-w-xl mx-auto mt-10 p-4 border rounded shadow bg-white">
    <h2 class="text-2xl font-bold mb-4">WebSocket Chat</h2>
    <div class="h-64 overflow-y-auto border p-2 mb-4 bg-gray-50" ref="chatBox">
      <div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
        <span class="font-semibold text-blue-700">{{ msg.user }}:</span>
        <span>{{ msg.text }}</span>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="flex gap-2">
      <input v-model="input" class="flex-1 border rounded p-2" placeholder="Type a message..." />
      <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ChatView',
  data() {
    return {
      ws: null,
      input: '',
      messages: [],
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Guest',
    };
  },
  mounted() {
    this.ws = new WebSocket('ws://localhost:3000');
    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.messages.push(msg);
        console.log('Received message:', msg);
      } catch (e) {
        // Optionally handle non-JSON messages or ignore
        console.warn('Received non-JSON message:', event.data);
      }
      this.$nextTick(() => {
        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
      });
    };
  },
  methods: {
    sendMessage() {
      if (!this.input.trim()) return;
      const msg = { user: this.user, text: this.input };
      this.ws.send(JSON.stringify(msg));
      this.input = '';
    },
  },
  beforeUnmount() {
    if (this.ws) this.ws.close();
  },
};
</script>

<style scoped>
/* Optional: style for chat box */
</style>
