import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../../components/UserForm';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    test('UserFormComponent boundary renders the input field with placeholder text', () => {
        render(<UserForm onSubmit={() => { }} />);
        const inputElement = screen.getByPlaceholderText('Enter user ID');
        expect(inputElement).toBeInTheDocument();
    });

    test('UserFormComponent boundary renders the submit button with correct text', () => {
        render(<UserForm onSubmit={() => { }} />);
        const buttonElement = screen.getByText('Get User');
        expect(buttonElement).toBeInTheDocument();
    });

    test('UserFormComponent boundary updates input value on change', () => {
        render(<UserForm onSubmit={() => { }} />);
        const inputElement = screen.getByPlaceholderText('Enter user ID');
        fireEvent.change(inputElement, { target: { value: '123' } });
        expect(inputElement.value).toBe('123');
    });

    test('UserFormComponent boundary calls onSubmit with user ID when form is submitted', () => {
        const mockOnSubmit = jest.fn();
        render(<UserForm onSubmit={mockOnSubmit} />);

        // Find the input field and submit button
        const inputElement = screen.getByPlaceholderText('Enter user ID');
        const submitButton = screen.getByText('Get User');

        // Simulate entering a user ID and submitting the form
        fireEvent.change(inputElement, { target: { value: '123' } });
        fireEvent.click(submitButton);

        // Check if onSubmit was called with the correct user ID
        expect(mockOnSubmit).toHaveBeenCalledWith('123');
    });

    test('UserFormComponent boundary resets input value after form submission', () => {
        render(<UserForm onSubmit={() => { }} />);

        // Find the input field and submit button
        const inputElement = screen.getByPlaceholderText('Enter user ID');
        const submitButton = screen.getByText('Get User');

        // Simulate entering a user ID and submitting the form
        fireEvent.change(inputElement, { target: { value: '123' } });
        fireEvent.click(submitButton);

        // Check if the input value is reset
        expect(inputElement.value).toBe('');
    });
});
