import React, { Fragment } from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DropEvent, FileRejection } from 'react-dropzone';

import color from '../styles/color';
import Text from '../components/Text';
import Grid, { IGrid } from '../components/Grid';
import GridCell from '../components/GridCell';
import Droparea from '../components/Droparea';
import Editor from '../components/Editor';
import Tutorial from '../components/Tutorial';
import Link from '../components/Link';

interface IPlayground {
  svg: string;
  jsx: string;
  onChange(value: string): void;
  onDrop?(acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent): void;
  name: string;
}

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
    justify-content: flex-end; 

`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  color: ${color.lightGrey};
  background: ${color.grey};
  transition: 150ms ease-in-out;
  border-radius: 2px;
  &:active {
    background: ${color.charade};
  }
`;

function Playground({ svg, jsx, onChange, onDrop }: IPlayground) {
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Grid columns="1fr 1fr" gap={2} fullHeight>
      <GridCell fullHeight>
        <Droparea onDrop={onDrop}>
          {({ onClick }) => (
            <Fragment>
              {svg ? null : <Tutorial onClick={onClick} />}
              <Editor value={svg} mode="xml" onChange={onChange} />
            </Fragment>
          )}
        </Droparea>
      </GridCell>
      <GridCell fullHeight>
        {jsx && (
          <ButtonContainer>
            <CopyToClipboard text={jsx}>
              <Button>
                <Text size="normal" display="monospace">
                  Copy
                </Text>
              </Button>
            </CopyToClipboard>
            <Button onClick={() => downloadFile('icon.tsx', jsx)}>
              <Text size="normal" display="monospace">
                Download
              </Text>
            </Button>
            <Link href="/">
              <Button>
                <Text size="normal" display="monospace">
                  Continue
                </Text>
              </Button>
            </Link>
            
          </ButtonContainer>
        )}
        <Editor value={jsx} mode="jsx" isReadOnly />
      </GridCell>
    </Grid>
  );
}

export default Playground;
