import { render, screen } from '@testing-library/react';
import UserCard from '../../components/UserCard';
import '@testing-library/jest-dom/extend-expect'; // Importing jest-dom to use toBeInTheDocument

describe('boundary', () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: {
            street: '123 Main St',
            city: 'Anytown'
        }
    };

    test('UserCardComponent boundary renders fallback message when user is null', () => {
        render(<UserCard user={null} error={null} />);
        const fallbackMessage = screen.getByText('No user data available.');
        expect(fallbackMessage).toBeInTheDocument();
    });

    test('UserCardComponent boundary renders error message when error is present', () => {
        render(<UserCard user={user} error="Error loading user data" />);
        const errorMessage = screen.getByText('Error loading user data');
        expect(errorMessage).toBeInTheDocument();
    });

    test('UserCardComponent boundary renders user data when no error is present', () => {
        render(<UserCard user={user} error={null} />);
        const userName = screen.getByText('John Doe');
        const userEmail = screen.getByText('Email: john.doe@example.com');
        const userAddress = screen.getByText('Address: 123 Main St, Anytown');
        expect(userName).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(userAddress).toBeInTheDocument();
    });
});
