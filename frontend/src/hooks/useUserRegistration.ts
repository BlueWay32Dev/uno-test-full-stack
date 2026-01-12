import { useState } from 'react';
import { apiService } from '../services/api.service';
import { User } from '../types';
import { validateUserForm, UserFormData } from '../utils/validators';
import { ERROR_MESSAGES } from '../constants/messages';

export const useUserRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const register = async (
    formData: UserFormData,
    onSuccess: (user: User) => void
  ): Promise<void> => {
    setError('');

    const validation = validateUserForm(formData);
    if (!validation.isValid) {
      setError(validation.error!);
      return;
    }

    setLoading(true);

    try {
      try {
        const existingUser = await apiService.getUserByRun(formData.run);
        onSuccess(existingUser);
        return;
      } catch (err: any) {
        if (err.response?.status === 404) {
          const user = await apiService.createUser({
            name: formData.name.trim(),
            run: formData.run,
          });
          onSuccess(user);
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      handleRegistrationError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationError = (err: any): void => {
    if (err.response?.status === 409) {
      setError(ERROR_MESSAGES.RUN_ALREADY_REGISTERED);
    } else if (err.response?.status >= 500) {
      setError(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      setError(ERROR_MESSAGES.USER_REGISTRATION_FAILED);
    }
  };

  const clearError = (): void => {
    setError('');
  };

  return {
    loading,
    error,
    register,
    clearError,
  };
};
