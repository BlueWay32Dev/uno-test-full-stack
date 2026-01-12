const RUN_REGEX = /^[0-9]+-[0-9Kk]$/;

export class RunValidator {
  static validate(run: string): boolean {
    if (!run || typeof run !== 'string') {
      return false;
    }
    return RUN_REGEX.test(run);
  }

  static normalize(run: string): string {
    return run.trim().toUpperCase();
  }
}

export class NameValidator {
  private static readonly MIN_LENGTH = 2;
  private static readonly MAX_LENGTH = 100;

  static validate(name: string): boolean {
    if (!name || typeof name !== 'string') {
      return false;
    }

    const trimmedName = name.trim();
    return trimmedName.length >= this.MIN_LENGTH && trimmedName.length <= this.MAX_LENGTH;
  }

  static normalize(name: string): string {
    return name.trim();
  }
}

export class GameDataValidator {
  static validateNumbers(value: number): boolean {
    return typeof value === 'number' && value >= 0 && !isNaN(value);
  }

  static validatePairs(pairs: number): boolean {
    return this.validateNumbers(pairs) && pairs > 0 && pairs <= 20 && Number.isInteger(pairs);
  }
}
