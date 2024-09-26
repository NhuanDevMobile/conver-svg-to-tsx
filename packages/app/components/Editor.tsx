import React, { memo } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/mode/xml';
import '../styles/editor';

interface IEditor {
  mode: string;
  value: string;
  debounceChangePeriod?: number;
  isReadOnly?: boolean;
  onChange(value: string): void;
}

function Editor({ value, mode, isReadOnly, debounceChangePeriod, onChange }: IEditor) {
  return (
    <AceEditor
      mode={mode}
      value={value}
      theme="svg2jsx"
      readOnly={isReadOnly}
      showPrintMargin={false}
      debounceChangePeriod={debounceChangePeriod}
      editorProps={{ $blockScrolling: Infinity }}
      setOptions={{ showFoldWidgets: false }}
      onChange={onChange}
    />
  );
}

Editor.defaultProps = {
  isReadOnly: false,
  debounceChangePeriod: 300,
  onChange: undefined,
};

export default memo(Editor);
