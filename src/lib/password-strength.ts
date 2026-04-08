export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export function calculatePasswordStrength(password: string): StrengthLevel {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;
  return score as StrengthLevel;
}

export const STRENGTH_LABELS: Record<StrengthLevel, string> = {
  0: "Too weak",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

export const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  0: "bg-gray-300",
  1: "bg-red-500",
  2: "bg-yellow-500",
  3: "bg-blue-500",
  4: "bg-green-500",
};
