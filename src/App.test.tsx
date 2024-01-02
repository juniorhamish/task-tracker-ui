import App from "./App.tsx";
import {render, screen} from "@testing-library/react";

describe('App', () => {
    it('Render', () => {
        render(<App/>);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
