import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load Google fonts directly in main file
const loadFonts = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap';
  document.head.appendChild(link);

  // Add title
  const title = document.createElement('title');
  title.textContent = 'EduFun Games - Educational Games for Kids PreK-6';
  document.head.appendChild(title);

  // Add description meta
  const meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = 'Educational games for PreK through 6th grade. Make learning fun with math, reading, science and more interactive games!';
  document.head.appendChild(meta);

  // Add favicon link
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮</text></svg>';
  document.head.appendChild(favicon);

  // Add fontawesome cdn
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css';
  document.head.appendChild(fontAwesome);
};

loadFonts();

createRoot(document.getElementById("root")!).render(<App />);
