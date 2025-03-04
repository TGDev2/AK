// tests/pages/auth/Login.test.jsx
import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from '../../../src/pages/auth/Login';

describe('Login Page', () => {
  it('renders the login form fields', () => {
    render(<Login />);

    // toBeInTheDocument() vient de jest-dom/matchers
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
  });
});
