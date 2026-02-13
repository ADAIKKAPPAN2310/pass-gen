# Pass Gen

A modern, fast, and secure password generator that runs entirely in your browser.

## Features

- **Customizable Length**: Generate passwords from 6 to 32 characters.
- **Character Options**: Toggle Uppercase, Lowercase, Numbers, and Symbols.
- **Instant Strength Meter**: Real-time visual feedback on password strength (Weak to Very Strong).
- **One-Click Copy**: Easily copy generated passwords to your clipboard.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Modern UI**: Features a sleek dark mode with glassmorphism effects.

## Usage

This is a static web application requiring no build process or dependencies.

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. Use the slider to set your desired length.
4. Toggle character types to customize complexity.
5. Click **Generate Password** (or adjust any setting) to create a new password.
6. Click the copy icon to save it to your clipboard.

## Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties (variables), Flexbox/Grid layout, and Glassmorphism styling.
- **JavaScript (ES6+)**: logic for generation, randomization, and DOM manipulation.

## Project Structure

- `index.html`: Main application structure and layout.
- `styles.css`: All styling, including animations and responsive design rules.
- `script.js`: Core logic for password generation algorithm and UI interactions.

## Privacy

All password generation happens locally in your browser using JavaScript's `Math.random()`. No data is sent to any server.
