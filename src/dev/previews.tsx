import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import MUIPalette from '@react-buddy/palette-mui';
import { PaletteTree } from './palette';
import App from '../App';

function ComponentPreviews() {
  return (
    <Previews palette={<PaletteTree />}>
      <MUIPalette />
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/ComponentPreviews">
        <ComponentPreviews />
      </ComponentPreview>
      <ComponentPreview path="/ComponentPreviews">
        <ComponentPreviews />
      </ComponentPreview>
    </Previews>
  );
}

export default ComponentPreviews;
