import React, { useState } from 'react';
import TranslationApi from './api/TranslationApi';

function App() {
  const [url, setUrl] = useState('');
  const [translatedSubtitles, setTranslatedSubtitles] = useState('');

  const handleTranslate = async () => {
    try {
      const subtitles = await TranslationApi.getTranslatedSubtitles(url);
      setTranslatedSubtitles(subtitles);
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ url }
        onChange={ e => setUrl(e.target.value) }
        placeholder="Enter media URL"
      />
      <button onClick={ handleTranslate }>Translate</button>
      <textarea value={ translatedSubtitles } readOnly />
    </div>
  );
}

export default App;
