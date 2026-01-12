export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateRun = (run: string): ValidationResult => {
  const runRegex = /^[0-9]+-[0-9Kk]$/;

  if (!run) {
    return {
      isValid: false,
      error: 'El RUT es requerido',
    };
  }

  if (!runRegex.test(run)) {
    return {
      isValid: false,
      error: 'El RUT debe tener el formato XXXXXXXX-X (EJ. 12345678-9)',
    };
  }

  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name || !name.trim()) {
    return {
      isValid: false,
      error: 'El nombre es requerido',
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      error: 'El nombre debe tener al menos 2 caracteres',
    };
  }

  return { isValid: true };
};

export interface UserFormData {
  name: string;
  run: string;
}

export const validateUserForm = (data: UserFormData): ValidationResult => {
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  const runValidation = validateRun(data.run);
  if (!runValidation.isValid) {
    return runValidation;
  }

  return { isValid: true };
};
