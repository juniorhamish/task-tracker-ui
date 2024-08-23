import { Category, Component, Variant, Palette } from '@react-buddy/ide-toolbox';
import MUIPalette from '@react-buddy/palette-mui';

export function ExampleLoaderComponent() {
  return <>Loading...</>;
}

export function PaletteTree() {
  return (
    <Palette>
      <MUIPalette />
      <Category name="App">
        <Component name="Loader">
          <Variant>
            <ExampleLoaderComponent />
          </Variant>
        </Component>
      </Category>
    </Palette>
  );
}
