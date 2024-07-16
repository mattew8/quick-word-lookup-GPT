import ReactDOM from 'react-dom/client';
import SearchWord from '@/pages/search-word/SearchWord';

async function initialize() {
  const rootElement = document.getElementById('root');
  if (rootElement === null) return;

  const root = ReactDOM.createRoot(rootElement);
  root.render(<SearchWord />);
}

initialize();
