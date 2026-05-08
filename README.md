# 🏓 Pong Game

A classic Pong game built with **HTML5**, **CSS3**, and **vanilla JavaScript**. Play against an intelligent AI opponent in this retro arcade-style game with smooth controls, realistic ball physics, and a neon aesthetic.

## 🎮 Features

### Player Controls
- **Mouse Control**: Move your mouse vertically to control the left paddle
- **Keyboard Control**: Use **Arrow Keys (↑/↓)** as an alternative control method
- **Pause/Resume**: Press **SPACEBAR** to start or pause the game at any time

### Game Mechanics
- **Smart AI Opponent**: Computer-controlled right paddle with responsive AI that tracks and responds to the ball
- **Ball Physics**: 
  - Bounces off top and bottom walls with realistic collision detection
  - Ball spin based on where you hit it on your paddle (higher impact = more spin)
  - Ball speed caps to prevent runaway gameplay
  - Ball resets to center with random direction after each score
  
- **Collision Detection**:
  - Accurate paddle-to-ball collision
  - Wall collision with boundary detection
  - Paddle boundary clamping to prevent off-screen movement

- **Scoring System**:
  - Real-time scoreboard display
  - Score increments when opponent misses the ball
  - Ball resets automatically after scoring

### Visual Design
- **Retro Arcade Aesthetic**: Neon green glow effects on black background
- **Canvas-Based Graphics**: Smooth 60 FPS animations
- **Glowing Elements**: All game objects and text have neon glow effects
- **Center Divider**: Dashed line running down the middle of the court
- **Pulsing Title**: Animated title with breathing glow effect
- **Pause Display**: On-screen message when the game is paused

## 📁 File Structure

```
pong-game/
├── index.html      # Main HTML file with canvas and scoreboard
├── style.css       # Styling and animations
├── game.js         # Game logic and physics engine
└── README.md       # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/HiiWinter/pong-game.git
   cd pong-game
   ```

2. **Open the game**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   - Then navigate to `http://localhost:8000` in your browser

## 🎯 How to Play

1. **Start the Game**: Press **SPACEBAR** when you see "PRESS SPACE TO START"
2. **Control Your Paddle**: 
   - Move your mouse up and down, OR
   - Use the **Up (↑) and Down (↓) arrow keys**
3. **Hit the Ball**: Position your paddle to bounce the ball back to the opponent
4. **Score Points**: When the computer misses the ball, you score a point
5. **Pause/Resume**: Press **SPACEBAR** at any time to pause or resume

### Winning Strategy
- Hit the ball in the **upper part of your paddle** for upward spin
- Hit the ball in the **lower part of your paddle** for downward spin
- Use the spin to predict where the ball will go
- Keep your paddle centered to be ready for quick reactions

## 🎨 Game Components

### HTML (index.html)
- Canvas element (800x400 pixels) for game rendering
- Scoreboard displaying player and computer scores
- Control instructions for new players
- Linked CSS and JavaScript files

### CSS (style.css)
- Retro arcade color scheme (neon green #00ff00 on black)
- Responsive layout with centered game board
- Glowing text and shadow effects
- Animated pulsing title with `@keyframes`
- Canvas styling with glow border effect
- Mobile-friendly responsive design

### JavaScript (game.js)
**Game Objects**:
- `player`: Left paddle (player-controlled)
- `computer`: Right paddle (AI-controlled)
- `ball`: Game ball with physics
- Game state variables: `gameRunning`, `playerScore`, `computerScore`

**Key Functions**:
- `updatePlayerPaddle()`: Updates player paddle position (mouse + keyboard)
- `updateComputerPaddle()`: AI logic for computer paddle movement
- `updateBall()`: Ball physics, collision detection, and scoring
- `resetBall()`: Resets ball to center with random direction
- `draw()`: Renders all game elements
- `gameLoop()`: Main animation loop using `requestAnimationFrame`

## ⚙️ Game Configuration

You can customize the game by modifying these values in `game.js`:

```javascript
const paddleWidth = 12;        // Paddle width in pixels
const paddleHeight = 100;      // Paddle height in pixels
const ballSize = 8;            // Ball radius in pixels

player.speed = 6;              // Player paddle speed
computer.speed = 4;            // Computer AI speed
ball.speed = 5;                // Initial ball speed

const maxSpeed = 8;            // Maximum ball speed cap
```

## 🧠 AI Difficulty

The computer AI difficulty can be adjusted by changing `computer.speed` in `game.js`:
- **Easier**: Set `computer.speed = 2` or `3`
- **Medium**: Set `computer.speed = 4` (default)
- **Hard**: Set `computer.speed = 5` or `6`

## 📊 Physics & Collision

### Ball Physics
- Ball moves with constant velocity (dx, dy)
- Direction reverses on wall collision
- Paddles impart spin based on hit location:
  - Center of paddle: Minimal spin
  - Top of paddle: Upward spin
  - Bottom of paddle: Downward spin

### Collision Detection
- **Paddle Collision**: Checks bounding box overlap between ball and paddle
- **Wall Collision**: Checks if ball exceeds canvas boundaries
- **Scoring**: Detects when ball passes either paddle

### Speed Management
- Ball speed increases through paddle hits due to spin
- `maxSpeed` variable caps maximum speed to prevent unfair gameplay
- Ball resets with controlled initial speed after scoring

## 🎮 Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Most modern browsers with HTML5 Canvas support

## 🛠️ Development

### Technologies Used
- **HTML5**: Canvas API for graphics rendering
- **CSS3**: Flexbox, gradients, animations, box-shadows
- **Vanilla JavaScript**: No frameworks or libraries required

### Code Structure
- Modular object-based design (player, computer, ball)
- Separation of concerns: update, draw, and input handling
- Efficient game loop using `requestAnimationFrame`
- Clean, commented code for easy understanding and modification

## 🔧 Troubleshooting

### Game runs slowly
- Close other browser tabs or applications
- Use a modern, updated browser
- Check console for errors (F12 → Console)

### Paddle not responding to mouse
- Ensure the mouse is over the canvas element
- Try using arrow keys instead

### Ball not bouncing correctly
- Check that canvas size matches the expected 800x400
- Verify `paddleHeight` and paddle positions in `game.js`

### Score not updating
- Press SPACEBAR to ensure the game is running
- Check browser console for JavaScript errors

## 📝 Future Enhancements

Possible improvements and features to add:
- [ ] Sound effects (paddle hits, wall bounces, scoring)
- [ ] Power-ups (speed boost, paddle size increase)
- [ ] Difficulty levels selection
- [ ] Score history and high scores
- [ ] Mobile touch controls
- [ ] Multiplayer (two players) mode
- [ ] Theme/color customization
- [ ] Ball trail effect
- [ ] Sound volume control
- [ ] Replay functionality

## 📄 License

This project is open source and available under the **MIT License**. Feel free to use, modify, and distribute this code.

## 👨‍💻 Author

Created by **HiiWinter**

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and OS information

## 📧 Support

For questions or support, please open an issue on the GitHub repository.

---

**Enjoy the game! 🏓**

Press SPACEBAR to start and may the best player win!
