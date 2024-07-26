import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import SearchWordPage from '@/pages/search-word/ui/SearchWordPage';

async function initialize() {
  const rootElement = document.getElementById('root');
  if (rootElement === null) return;

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Theme>
      <SearchWordPage />
    </Theme>,
  );
}

initialize();
