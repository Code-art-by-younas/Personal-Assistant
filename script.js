// Your personal information
const CREATOR_INFO = {
    name: "Muhammad Younas",
    birth_date: "28-02-2005",
    birth_place: "Kabirwala",
    current_city: "Bahawalpur",
    education: "BS Software Engineering (IUB)",
    profession: "Student, Aspiring Software Engineer, Python Developer, Web Developer & Freelancer",
    email: "your_email@example.com"
};

const SOCIAL_MEDIA = {
    facebook: "https://www.facebook.com/share/1XQiHE8mCY/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/myounas6760?igsh=YnNpOGlza2F4MWZ4&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/muhammad-younas-kareem-9ab017324",
    youtube: "https://youtube.com/@codeartbyyounas?si=HqZ9dR2RbBWz8PEC"
};

const INTERESTS = {
    hobbies: ["Programming", "Graphic Designing", "Reading Books", "Creating Websites", "Freelancing"],
    favorite_movies: ["Interstellar", "Inception"],
    favorite_books: ["Clean Code", "The Pragmatic Programmer"],
    favorite_music: ["Instrumental", "Lo-fi Beats"]
};

const ABOUT_ME = `I am Muhammad Younas, a BS Software Engineering student at Islamia University of Bahawalpur (IUB). 
I am passionate about programming, web development, and Python. My goal is to become a skilled 
software engineer and start earning through freelancing by 2025.`;

// Chatbot functionality
function calculateAge(birthDate) {
    const birth = new Date(birthDate.split('-').reverse().join('-'));
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();
    
    if (userInput.includes("hi") || userInput.includes("hello") || userInput.includes("salam")) {
        return "Hello! How can I help you today?";
    }
    else if (userInput.includes("who made you") || userInput.includes("who created you")) {
        return `I was created by ${CREATOR_INFO.name} as a personal assistant.`;
    }
    else if (userInput.includes("age") || userInput.includes("umar")) {
        const age = calculateAge(CREATOR_INFO.birth_date);
        return `My creator is ${age} years old.`;
    }
    else if (userInput.includes("social media") || userInput.includes("links")) {
        let links = [];
        for (const [platform, url] of Object.entries(SOCIAL_MEDIA)) {
            links.push(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`);
        }
        return `Social media links:\n${links.join('\n')}`;
    }
    else if (userInput.includes("hobbies") || userInput.includes("shauq")) {
        return `My hobbies include: ${INTERESTS.hobbies.join(', ')}`;
    }
    else if (userInput.includes("about") || userInput.includes("tell me about")) {
        return ABOUT_ME;
    }
    else if (userInput.includes("education") || userInput.includes("qualification")) {
        return `Education: ${CREATOR_INFO.education}`;
    }
    else if (userInput.includes("profession") || userInput.includes("kaam")) {
        return `Profession: ${CREATOR_INFO.profession}`;
    }
    else if (userInput.includes("bye") || userInput.includes("goodbye")) {
        return "Goodbye! Have a great day!";
    }
    else {
        return "I didn't understand that. Could you please rephrase your question?";
    }
}

// Chat interface functions
function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    addMessage(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typingIndicator';
    typingIndicator.className = 'bot-message typing';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('chatBox').appendChild(typingIndicator);
    
    // Simulate bot thinking
    setTimeout(() => {
        document.getElementById('typingIndicator').remove();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000);
}

function quickQuestion(question) {
    document.getElementById('userInput').value = question;
    sendMessage();
}

// Send message on Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});