import { useState } from 'react';
import { HomePage } from './HomePage';
import { Editor } from './Editor';

function App() {
  const [view, setView] = useState<'home' | 'editor'>('home');
  return view === 'home' ? <HomePage onStart={() => setView('editor')} /> : <Editor onBack={() => setView('home')} />;
}

export default App;
