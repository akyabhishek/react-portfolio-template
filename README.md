# Abhishek Kumar Yadav (AKY) - Portfolio

Welcome to the personal portfolio of Abhishek Kumar Yadav (AKY). This website showcases my projects, skills, and experience in software development. You can explore my work and learn more about my professional background.

![Portfolio Preview](public/assets/portfolio-thumb.png)

## Live Demo

Check out the live demo of the portfolio at [https://akyabhishek.vercel.app/](https://akyabhishek.vercel.app/).

## Technologies and Libraries Used

This portfolio is built using modern web technologies and libraries to provide a responsive and interactive user experience. Here are some of the key technologies and libraries used:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **NextUI**: A React UI library for building modern web applications.
- **React Router**: A library for routing in React applications.
- **Recharts**: A charting library for React.
- **Three.js**: A JavaScript library for creating 3D graphics in the browser.
- **Three Globe**: A library for creating interactive globes with Three.js.
- **Axios**: A promise-based HTTP client for making API requests.
- **Framer Motion**: A library for animations in React.
- **Lucide React**: A library of icons for React.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: A code formatter for maintaining consistent code style.

## Getting Started

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
