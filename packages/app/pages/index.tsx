import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import useConfig from '../hooks/useConfig';
import useEditor from '../hooks/useEditor';
import useTransformer from '../hooks/useTransformer';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import NavBar from '../containers/NavBar';
import SettingsBar from '../containers/SettingsBar';

const Playground = dynamic(() => import('../containers/Playground'), {
  ssr: false,
  loading: Loader,
});

function HomePage() {
  const { config, setQuote, setType, setMemo, setIDs } = useConfig();
  const { editor, setSvg, setFile } = useEditor();
  const { transformer, transform, clear } = useTransformer();
  const [name, setName] = useState('');

  useEffect(() => {
    if (editor.svg) {
      transform(editor.svg, config, name); // Gọi transform với name
    } else {
      clear();
    }
  }, [config.jsxSingleQuote, config.type, config.cleanupIDs, config.memo, editor.svg, name]); // Thêm name vào danh sách phụ thuộc

  return (
    <Layout>
      <NavBar variant={transformer.variant} />

      <SettingsBar
        type={config.type}
        jsxSingleQuote={config.jsxSingleQuote}
        memo={config.memo}
        cleanupIDs={config.cleanupIDs}
        variant={transformer.variant}
        onChangeType={setType}
        onChangeQuote={setQuote}
        onChangeIDs={setIDs}
        onChangeMemo={setMemo}
      />
  <input 
    type="text" 
    value={name} 
    onChange={(e) => setName(e.target.value)} 
    placeholder="Enter your name"
    style={{
      width: 'auto',
      height: '40px',
      padding: '10px',
      margin: '0',
      fontSize: '16px'
    }}
  />


      <Playground svg={editor.svg} jsx={transformer.jsx} onDrop={setFile} onChange={setSvg} name={name} />
    </Layout>
  );
}

export default HomePage;
