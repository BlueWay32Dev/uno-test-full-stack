import React from 'react';
import { UserRegistration } from './components/UserRegistration';
import { GameBoard } from './components/GameBoard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User } from './types';

function App() {
  const [user, setUser] = useLocalStorage<User | null>('memory-game-user', null);

  const handleUserRegistered = (newUser: User) => {
    setUser(newUser);
  };

  const handleRestart = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <UserRegistration onUserRegistered={handleUserRegistered} />
      ) : (
        <GameBoard user={user} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
