import "../css/About.css";

const Aboutproject = () => {
  return (
    <div className="about-project-container">
      <h1>Behind the Voice – The Making of Tanishk AI</h1>

      <p>
        This project is more than just a portfolio — it's a deeply personal
        innovation where voice meets intelligence. "Tanishk AI" is a voice-based
        portfolio assistant that simulates a real-time AI conversation, making
        your experience with my work interactive and futuristic.
      </p>

      <h2>👨‍💻 What This Project Is About</h2>
      <p>
        At its core, this project is a React-based portfolio website enhanced
        with a voice-calling AI interface. Users can talk to "Tanishk's AI," ask
        questions about me, my work, or anything defined in my backend JSON
        data, and receive real-time spoken responses. This makes browsing my
        portfolio not only engaging but also immersive and smart.
      </p>

      <h2>🧠 Technologies Behind the Magic</h2>
      <ul>
        <li>
          <strong>ReactJS:</strong> For the frontend user interface with a
          mobile-first design approach.
        </li>
        <li>
          <strong>Recoil:</strong> To manage state across components like the
          sidebar and voice status.
        </li>
        <li>
          <strong>Web Speech API:</strong> Integrated for{" "}
          <em>speech-to-text</em> (voice input) and <em>text-to-speech</em> (AI
          output).
        </li>
        <li>
          <strong>OpenAI API:</strong> The heart of the AI brain — all questions
          are sent to OpenAI's GPT model for smart responses.
        </li>
        <li>
          <strong>Token Management:</strong> Every conversation uses tokens on
          OpenAI's side — this isn’t free. I’ve handled caching, token-efficient
          structuring, and cost optimization throughout.
        </li>
        <li>
          <strong>Node.js + Express:</strong> For the backend API that serves my
          structured JSON portfolio data and handles routing securely.
        </li>
        <li>
          <strong>Lottie & Custom CSS:</strong> For responsive animations and a
          cleaner user experience.
        </li>
      </ul>

      <h2>💥 The Challenges I Overcame</h2>
      <p>
        Building this project was no small feat. I encountered several deep
        challenges:
      </p>
      <ul>
        <li>
          Mastering and synchronizing the Web Speech API with React's rendering
          cycle.
        </li>
        <li>
          Getting OpenAI responses to sound natural and context-aware — while
          also minimizing API token costs.
        </li>
        <li>
          Creating a realistic voice interface with loading animations and a
          call timer.
        </li>
        <li>
          Implementing smart UI/UX with conditional logic for mobile-view frames
          and dynamic routing.
        </li>
        <li>
          Designing sidebar logic to open/close with smooth animations while
          syncing the navigation flow.
        </li>
        <li>
          Writing clean code with reusable components and proper file structure
          while under a tight self-imposed deadline.
        </li>
      </ul>

      <h2>🌐 Why This Project Matters</h2>
      <p>
        As an aspiring developer, I wanted to build something different — not
        just another site, but something that reflects the future. This
        AI-powered portfolio brings emotion, tech, and interaction into one
        canvas. I genuinely want people to feel inspired and curious while
        exploring my work.
      </p>

      <h2>📁 Source Code</h2>
      <p>
        You can explore the entire source code on my GitHub:
        <br />
        <a
          href="https://github.com/kharetanishk/tanishk-calling-ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/kharetanishk/tanishk-calling-ai
        </a>
      </p>

      <h2>📞 Contact</h2>
      <p style={{ marginBottom: "6rem" }}>
        If you’d like to discuss this project or need any insights, feel free to
        contact me at:
        <br />
        <strong>Phone:</strong> 6260440241
      </p>
    </div>
  );
};

export { Aboutproject };
