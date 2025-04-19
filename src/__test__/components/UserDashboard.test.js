import { render, screen, fireEvent } from '@testing-library/react';
import UserDashboard from '../../components/UserDashboard';
import { mockUsers } from '../../services/mockUserData'; // Make sure to mock the user data
import '@testing-library/jest-dom/extend-expect'; // Importing jest-dom to use toBeInTheDocument

jest.mock('../../services/mockUserData', () => ({
    mockUsers: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: { street: '123 Main St', city: 'Anytown' } },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', address: { street: '456 Elm St', city: 'Othertown' } }
    ]
}));

describe('boundary', () => {
    test('UserDashboardComponent boundary renders the User Dashboard header', () => {
        render(<UserDashboard />);
        const headerElement = screen.getByText('User Dashboard');
        expect(headerElement).toBeInTheDocument();
    });

    test('UserDashboardComponent boundary renders the UserForm component', () => {
        render(<UserDashboard />);
        const inputElement = screen.getByPlaceholderText('Enter user ID'); // Assuming there is a placeholder text in the UserForm
        expect(inputElement).toBeInTheDocument();
    });

    test('UserDashboardComponent boundary renders the UserCard component with fallback message when no user is found', () => {
        render(<UserDashboard />);
        
        // Find the input field and submit button
        const inputElement = screen.getByPlaceholderText('Enter user ID');
        const submitButton = screen.getByText('Get User'); // Corrected button text

        // Simulate entering an invalid user ID and submitting the form
        fireEvent.change(inputElement, { target: { value: '999' } });
        fireEvent.click(submitButton);

        // Check if the fallback message is rendered
        const fallbackMessage = screen.getByText('No user data available.');
        expect(fallbackMessage).toBeInTheDocument();
    });

    test('UserDashboardComponent boundary renders the UserCard component with user data when a valid user ID is found', () => {
        render(<UserDashboard />);

        // Find the input field and submit button
        const inputElement = screen.getByPlaceholderText('Enter user ID');
        const submitButton = screen.getByText('Get User'); // Corrected button text

        // Simulate entering a valid user ID and submitting the form
        fireEvent.change(inputElement, { target: { value: '1' } });
        fireEvent.click(submitButton);

        // Check if the user data is rendered
        const userName = screen.getByText('John Doe');
        const userEmail = screen.getByText('Email: john.doe@example.com');
        const userAddress = screen.getByText('Address: 123 Main St, Anytown');
        expect(userName).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(userAddress).toBeInTheDocument();
    });
});
