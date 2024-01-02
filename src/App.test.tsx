import App from "./App.tsx";
import {render, screen} from "@testing-library/react";

describe('App', () => {
    it('Render', () => {
        render(<App/>);

        userEvent.click(screen.getByRole('button'));

        expect(screen.getByRole('button')).toHaveText('One');
    });
});
