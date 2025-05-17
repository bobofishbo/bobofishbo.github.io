document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;
  
    const msgBox = document.getElementById("chat-messages");
    msgBox.style.display = "block"; // ensure visible
  
    // appendMessage("You", message);
    input.value = "";
  
    // Add typing indicator
    const thinking = document.createElement("div");
    thinking.className = "typing-indicator";
    thinking.id = "thinking-indicator";
    thinking.innerHTML = "<span></span><span></span><span></span>";
    msgBox.appendChild(thinking);
    msgBox.scrollTop = msgBox.scrollHeight;
  
    try {
      const res = await fetch("https://bobofishbo-github-io.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      const data = await res.json();
  
      // Remove thinking indicator
      thinking.remove();
  
      appendMessage("BoGPT", data.reply);
    } catch (err) {
      thinking.remove();
      appendMessage("Error", "Something went wrong!");
    }
  }
  
function appendMessage(sender, text) {
  // Show the chatbot box only for GPT or Error messages
  if (sender === "BoGPT" || sender === "Error") {
    document.getElementById("chatbot-container").style.display = "flex";
  }

  const msgBox = document.getElementById("chat-messages");
  msgBox.innerHTML = ""; // clear previous messages
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msgBox.appendChild(msg);
  msgBox.scrollTop = msgBox.scrollHeight;
}


// Show default message immediately after the page loads
window.addEventListener("DOMContentLoaded", () => {
    const msgBox = document.getElementById("chat-messages");
    msgBox.style.display = "block"; 
    msgBox.innerHTML = "<strong>BoGPT:</strong> Hi I am BoGPT, digital replica of Bo! Ask me anything, and don't forget to connect with me at https://www.linkedin.com/in/bo-xie-918761291/!!";
    document.getElementById("chatbot-container").style.display = "flex";
  });