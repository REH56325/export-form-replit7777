import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface GameRule {
  id: string;
  description: string;
  example: string;
}

interface GameMove {
  player: 'human' | 'ai';
  move: string;
  position?: { row: number; col: number };
  timestamp: Date;
}

interface AIOpponent {
  id: string;
  name: string;
  personality: string;
  difficulty: 'easy' | 'medium' | 'hard';
  avatar: string;
  strategy: string[];
}

const AIGameMaster = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedGame, setSelectedGame] = useState<'tic-tac-toe' | 'connect-four' | 'memory' | null>(null);
  const [selectedAI, setSelectedAI] = useState<AIOpponent | null>(null);
  const [gameBoard, setGameBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'human' | 'ai'>('human');
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [winner, setWinner] = useState<'human' | 'ai' | 'tie' | null>(null);
  const [moves, setMoves] = useState<GameMove[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [aiThinking, setAiThinking] = useState(false);
  const { user } = useUser();

  const aiOpponents: AIOpponent[] = [
    {
      id: 'rookie',
      name: 'Rookie Bot',
      personality: 'friendly and learning',
      difficulty: 'easy',
      avatar: '🤖',
      strategy: ['random', 'defensive']
    },
    {
      id: 'challenger',
      name: 'Challenge Bot',
      personality: 'competitive and strategic',
      difficulty: 'medium',
      avatar: '🎯',
      strategy: ['offensive', 'pattern-recognition', 'blocking']
    },
    {
      id: 'master',
      name: 'Master AI',
      personality: 'calculating and advanced',
      difficulty: 'hard',
      avatar: '🧠',
      strategy: ['minimax', 'strategic-planning', 'adaptive']
    }
  ];

  const gameRules = {
    'tic-tac-toe': [
      { id: 'goal', description: 'Get 3 in a row horizontally, vertically, or diagonally', example: 'X-X-X wins!' },
      { id: 'turns', description: 'Players take turns placing their symbol', example: 'You are X, AI is O' },
      { id: 'blocking', description: 'Block opponent from getting 3 in a row', example: 'If AI has X-X-_, place your O in the blank' }
    ],
    'connect-four': [
      { id: 'goal', description: 'Get 4 in a row in any direction', example: 'Four connected pieces wins!' },
      { id: 'gravity', description: 'Pieces fall to the lowest available spot', example: 'Drop from the top, lands at bottom' },
      { id: 'strategy', description: 'Think ahead and set up multiple win opportunities', example: 'Create two ways to win at once!' }
    ],
    'memory': [
      { id: 'matching', description: 'Find pairs of matching cards', example: 'Flip two cards, if they match, keep them' },
      { id: 'memory', description: 'Remember where cards are located', example: 'If you see a card, remember its position' },
      { id: 'turns', description: 'Take turns with the AI', example: 'You flip, then AI flips' }
    ]
  };

  useEffect(() => {
    if (selectedGame) {
      initializeGame();
    }
  }, [selectedGame]);

  const playSound = (type: 'move' | 'win' | 'lose' | 'tie' | 'thinking' | 'select') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const sounds = {
        move: 'Move made',
        win: 'You won! Excellent strategy!',
        lose: 'AI wins this round. Good game!',
        tie: 'It\'s a tie! Well played!',
        thinking: 'AI is thinking...',
        select: 'Game selected'
      };
      
      const utterance = new SpeechSynthesisUtterance(sounds[type]);
      utterance.rate = 1.1;
      utterance.pitch = type === 'win' ? 1.4 : type === 'lose' ? 0.8 : 1.0;
      utterance.volume = 0.4;
      speechSynthesis.speak(utterance);
    }
  };

  const initializeGame = () => {
    let newBoard: string[][] = [];
    
    switch (selectedGame) {
      case 'tic-tac-toe':
        newBoard = Array(3).fill(null).map(() => Array(3).fill(''));
        break;
      case 'connect-four':
        newBoard = Array(6).fill(null).map(() => Array(7).fill(''));
        break;
      case 'memory':
        newBoard = Array(4).fill(null).map(() => Array(4).fill(''));
        break;
    }
    
    setGameBoard(newBoard);
    setCurrentPlayer('human');
    setGameStatus('playing');
    setWinner(null);
    setMoves([]);
    setAiThinking(false);
  };

  const selectGame = (game: 'tic-tac-toe' | 'connect-four' | 'memory') => {
    setSelectedGame(game);
    playSound('select');
    setFeedback(`Selected ${game.replace('-', ' ')}! Choose an AI opponent to start.`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const selectAI = (ai: AIOpponent) => {
    setSelectedAI(ai);
    setGamesPlayed(gamesPlayed + 1);
    playSound('select');
    setFeedback(`${ai.name} is ready to play! They are ${ai.personality}.`);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const makeMove = (row: number, col: number) => {
    if (gameStatus !== 'playing' || currentPlayer !== 'human' || gameBoard[row][col] !== '' || aiThinking) {
      return;
    }

    const newBoard = [...gameBoard];
    const symbol = selectedGame === 'connect-four' ? 'R' : 'X';
    
    if (selectedGame === 'connect-four') {
      // Find lowest available row in column
      for (let r = newBoard.length - 1; r >= 0; r--) {
        if (newBoard[r][col] === '') {
          newBoard[r][col] = symbol;
          row = r;
          break;
        }
      }
    } else {
      newBoard[row][col] = symbol;
    }

    setGameBoard(newBoard);
    
    const move: GameMove = {
      player: 'human',
      move: `${symbol} at (${row}, ${col})`,
      position: { row, col },
      timestamp: new Date()
    };
    setMoves([...moves, move]);
    
    playSound('move');
    
    // Check for win condition
    if (checkWin(newBoard, symbol)) {
      setWinner('human');
      setGameStatus('finished');
      setScore(score + (selectedAI?.difficulty === 'hard' ? 50 : selectedAI?.difficulty === 'medium' ? 30 : 20));
      playSound('win');
      setFeedback('Congratulations! You defeated the AI!');
      setShowFeedback(true);
      return;
    }
    
    // Check for tie
    if (isBoardFull(newBoard)) {
      setWinner('tie');
      setGameStatus('finished');
      setScore(score + 10);
      playSound('tie');
      setFeedback('It\'s a tie! Good strategic thinking!');
      setShowFeedback(true);
      return;
    }

    // AI's turn
    setCurrentPlayer('ai');
    setAiThinking(true);
    playSound('thinking');
    
    setTimeout(() => {
      makeAIMove(newBoard);
    }, 1000 + Math.random() * 2000); // Simulate thinking time
  };

  const makeAIMove = (board: string[][]) => {
    if (!selectedAI) return;

    const aiSymbol = selectedGame === 'connect-four' ? 'Y' : 'O';
    let aiMove: { row: number; col: number } | null = null;

    // AI strategy based on difficulty
    switch (selectedAI.difficulty) {
      case 'easy':
        aiMove = makeRandomMove(board);
        break;
      case 'medium':
        aiMove = makeMediumMove(board, aiSymbol);
        break;
      case 'hard':
        aiMove = makeHardMove(board, aiSymbol);
        break;
    }

    if (aiMove) {
      const newBoard = [...board];
      
      if (selectedGame === 'connect-four') {
        // Find lowest available row in column
        for (let r = newBoard.length - 1; r >= 0; r--) {
          if (newBoard[r][aiMove.col] === '') {
            newBoard[r][aiMove.col] = aiSymbol;
            aiMove.row = r;
            break;
          }
        }
      } else {
        newBoard[aiMove.row][aiMove.col] = aiSymbol;
      }

      setGameBoard(newBoard);
      
      const move: GameMove = {
        player: 'ai',
        move: `${aiSymbol} at (${aiMove.row}, ${aiMove.col})`,
        position: aiMove,
        timestamp: new Date()
      };
      setMoves(prev => [...prev, move]);
      
      playSound('move');
      
      // Check for AI win
      if (checkWin(newBoard, aiSymbol)) {
        setWinner('ai');
        setGameStatus('finished');
        playSound('lose');
        setFeedback(`${selectedAI.name} wins! Try analyzing their strategy.`);
        setShowFeedback(true);
        setAiThinking(false);
        return;
      }
      
      // Check for tie
      if (isBoardFull(newBoard)) {
        setWinner('tie');
        setGameStatus('finished');
        setScore(score + 10);
        playSound('tie');
        setFeedback('It\'s a tie! Good strategic thinking!');
        setShowFeedback(true);
        setAiThinking(false);
        return;
      }

      setCurrentPlayer('human');
    }
    
    setAiThinking(false);
  };

  const makeRandomMove = (board: string[][]): { row: number; col: number } | null => {
    const availableMoves = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          if (selectedGame === 'connect-four') {
            // Only consider top piece in each column for connect four
            if (row === 0 || board[row - 1][col] !== '') {
              availableMoves.push({ row, col });
            }
          } else {
            availableMoves.push({ row, col });
          }
        }
      }
    }
    
    if (availableMoves.length > 0) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    return null;
  };

  const makeMediumMove = (board: string[][], aiSymbol: string): { row: number; col: number } | null => {
    const humanSymbol = selectedGame === 'connect-four' ? 'R' : 'X';
    
    // First, try to win
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          const testBoard = board.map(r => [...r]);
          testBoard[row][col] = aiSymbol;
          if (checkWin(testBoard, aiSymbol)) {
            return { row, col };
          }
        }
      }
    }
    
    // Then, try to block human win
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          const testBoard = board.map(r => [...r]);
          testBoard[row][col] = humanSymbol;
          if (checkWin(testBoard, humanSymbol)) {
            return { row, col };
          }
        }
      }
    }
    
    // Otherwise, make a random move
    return makeRandomMove(board);
  };

  const makeHardMove = (board: string[][], aiSymbol: string): { row: number; col: number } | null => {
    // Advanced AI with minimax-like strategy
    return makeMediumMove(board, aiSymbol); // Simplified for demo
  };

  const checkWin = (board: string[][], symbol: string): boolean => {
    if (selectedGame === 'tic-tac-toe') {
      return checkTicTacToeWin(board, symbol);
    } else if (selectedGame === 'connect-four') {
      return checkConnectFourWin(board, symbol);
    }
    return false;
  };

  const checkTicTacToeWin = (board: string[][], symbol: string): boolean => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) return true;
      if (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) return true;
    }
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;
    return false;
  };

  const checkConnectFourWin = (board: string[][], symbol: string): boolean => {
    // Check horizontal, vertical, and diagonal connections
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === symbol) {
          // Check all directions from this position
          const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1] // horizontal, vertical, diagonal
          ];
          
          for (const [dr, dc] of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
              const newRow = row + dr * i;
              const newCol = col + dc * i;
              if (newRow >= 0 && newRow < board.length && 
                  newCol >= 0 && newCol < board[0].length && 
                  board[newRow][newCol] === symbol) {
                count++;
              } else {
                break;
              }
            }
            if (count >= 4) return true;
          }
        }
      }
    }
    return false;
  };

  const isBoardFull = (board: string[][]): boolean => {
    return board.every(row => row.every(cell => cell !== ''));
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setGamesPlayed(0);
    setSelectedGame(null);
    setSelectedAI(null);
    setGameStatus('setup');
    setGameStarted(false);
    setShowInstructions(true);
  };

  const newGame = () => {
    if (selectedGame) {
      initializeGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-purple-800 mb-2 animate-pulse">🎮 AI Game Master</h1>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-full p-4 shadow-lg flex-wrap">
            <div className="text-lg font-bold text-purple-600">Score: {score}</div>
            <div className="text-lg font-bold text-indigo-600">Level: {level}</div>
            <div className="text-lg font-bold text-blue-600">Games Played: {gamesPlayed} 🎯</div>
            <div className="text-lg font-bold text-cyan-600">
              Status: {gameStatus === 'playing' ? (currentPlayer === 'human' ? 'Your Turn' : 'AI Turn') : 'Setup'}
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">🤖 Challenge AI Opponents!</h2>
            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p>🎯 Choose from different strategy games to play</p>
              <p>🧠 Face AI opponents with various difficulty levels</p>
              <p>📈 Learn game strategies and improve your skills</p>
              <p>🏆 Earn points by defeating increasingly smart AIs</p>
            </div>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Gaming!
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameStarted && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Game Selection & AI Panel */}
            <div className="xl:col-span-1 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🎮 Game Setup</h3>
              
              {/* Game Selection */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Choose Game</h4>
                <div className="space-y-2">
                  {(['tic-tac-toe', 'connect-four', 'memory'] as const).map((game) => (
                    <button
                      key={game}
                      onClick={() => selectGame(game)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        selectedGame === game
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {game === 'tic-tac-toe' && '⭕'}
                          {game === 'connect-four' && '🔴'}
                          {game === 'memory' && '🧠'}
                        </span>
                        <span className="font-bold capitalize">{game.replace('-', ' ')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Opponent Selection */}
              {selectedGame && (
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-3">Choose AI Opponent</h4>
                  <div className="space-y-2">
                    {aiOpponents.map((ai) => (
                      <button
                        key={ai.id}
                        onClick={() => selectAI(ai)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          selectedAI?.id === ai.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-300 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-2xl">{ai.avatar}</span>
                          <div>
                            <div className="font-bold">{ai.name}</div>
                            <div className="text-xs text-gray-600 capitalize">{ai.difficulty}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{ai.personality}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Game Rules */}
              {selectedGame && (
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-3">📋 Rules</h4>
                  <div className="space-y-2">
                    {gameRules[selectedGame].map((rule) => (
                      <div key={rule.id} className="bg-gray-50 p-2 rounded text-sm">
                        <div className="font-bold">{rule.description}</div>
                        <div className="text-gray-600 text-xs">{rule.example}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all mb-4"
              >
                💡 {showHints ? 'Hide' : 'Show'} Strategy Tips
              </button>

              {showHints && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Strategy Tips:</strong> Think ahead! Try to create multiple ways to win while blocking your opponent's moves.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                {gameStatus === 'playing' && (
                  <button
                    onClick={newGame}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    🔄 New Game
                  </button>
                )}
                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  🏠 Main Menu
                </button>
              </div>
            </div>

            {/* Game Board */}
            <div className="xl:col-span-3 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedGame ? `🎮 ${selectedGame.replace('-', ' ').toUpperCase()}` : '🎮 Select a Game'}
                </h3>
                {selectedAI && gameStatus === 'playing' && (
                  <div className="text-sm text-gray-600">
                    Playing against: {selectedAI.avatar} {selectedAI.name}
                  </div>
                )}
              </div>

              {!selectedGame ? (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-xl mb-4">👈 Choose a game to start playing!</p>
                  <p>Challenge AI opponents and test your strategic thinking.</p>
                </div>
              ) : !selectedAI ? (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-xl mb-4">👈 Select an AI opponent!</p>
                  <p>Each AI has different strategies and difficulty levels.</p>
                </div>
              ) : (
                <>
                  {/* Game Board Display */}
                  {selectedGame === 'tic-tac-toe' && (
                    <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-6">
                      {gameBoard.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => makeMove(rowIndex, colIndex)}
                            disabled={gameStatus !== 'playing' || currentPlayer !== 'human' || aiThinking}
                            className="aspect-square bg-gray-100 border-2 border-gray-300 rounded-lg text-4xl font-bold hover:bg-gray-200 transition-all disabled:cursor-not-allowed"
                          >
                            {cell === 'X' && <span className="text-blue-500">❌</span>}
                            {cell === 'O' && <span className="text-red-500">⭕</span>}
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {selectedGame === 'connect-four' && (
                    <div className="grid grid-cols-7 gap-1 max-w-2xl mx-auto mb-6">
                      {gameBoard.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => makeMove(rowIndex, colIndex)}
                            disabled={gameStatus !== 'playing' || currentPlayer !== 'human' || aiThinking}
                            className="aspect-square bg-blue-100 border border-blue-300 rounded-full text-2xl hover:bg-blue-200 transition-all disabled:cursor-not-allowed"
                          >
                            {cell === 'R' && <span className="text-red-500">🔴</span>}
                            {cell === 'Y' && <span className="text-yellow-500">🟡</span>}
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {/* Game Status */}
                  <div className="text-center mb-6">
                    {gameStatus === 'playing' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        {aiThinking ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            <span className="text-blue-700">🤖 {selectedAI.name} is thinking...</span>
                          </div>
                        ) : currentPlayer === 'human' ? (
                          <p className="text-blue-700 font-bold">🎯 Your turn! Make your move.</p>
                        ) : (
                          <p className="text-blue-700 font-bold">🤖 AI's turn...</p>
                        )}
                      </div>
                    )}

                    {gameStatus === 'finished' && winner && (
                      <div className={`p-4 rounded-lg ${
                        winner === 'human' ? 'bg-green-100' : winner === 'ai' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <p className={`font-bold text-xl ${
                          winner === 'human' ? 'text-green-700' : winner === 'ai' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {winner === 'human' && '🎉 You Won!'}
                          {winner === 'ai' && '🤖 AI Wins!'}
                          {winner === 'tie' && '🤝 It\'s a Tie!'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Move History */}
                  {moves.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-gray-800 mb-2">📝 Move History</h5>
                      <div className="max-h-32 overflow-y-auto">
                        {moves.slice(-6).map((move, index) => (
                          <div key={index} className="text-sm flex justify-between items-center mb-1">
                            <span className={move.player === 'human' ? 'text-blue-600' : 'text-red-600'}>
                              {move.player === 'human' ? '👤 You' : `🤖 ${selectedAI.name}`}: {move.move}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {move.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-xl text-center text-lg font-bold ${
                  feedback.includes('Congratulations') || feedback.includes('wins')
                    ? 'bg-green-100 text-green-700' 
                    : feedback.includes('defeats') || feedback.includes('loses')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGameMaster;