import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect'; // Importing jest-dom to use toBeInTheDocument

describe('boundary', () => {
    test('AppComponent boundary renders the UserDashboard component', () => {
        render(<App />);
        const userDashboardElement = screen.getByText('User Dashboard');
        expect(userDashboardElement).toBeInTheDocument();
    });
});
