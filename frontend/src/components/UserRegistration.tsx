import React, { useState } from "react";
import { User } from "../types";
import { useUserRegistration } from "../hooks/useUserRegistration";
import { Button, Input, ErrorMessage, Logo } from "./ui";
import { UI_TEXT, FORM_LABELS } from "../constants/messages";

interface UserRegistrationProps {
  onUserRegistered: (user: User) => void;
}

export const UserRegistration: React.FC<UserRegistrationProps> = ({
  onUserRegistered,
}) => {
  const [name, setName] = useState("");
  const [run, setRun] = useState("");
  const { loading, error, register } = useUserRegistration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ name, run }, onUserRegistered);
  };

  const infoIcon = (
    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center gradient-uno p-4">
      <Logo />

      <div className="card-game w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-uno mb-3">
            {UI_TEXT.WELCOME_TITLE}
          </h1>
          <p className="text-gray-600 text-lg">{UI_TEXT.WELCOME_SUBTITLE}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={FORM_LABELS.FULL_NAME}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={FORM_LABELS.NAME_PLACEHOLDER}
            disabled={loading}
          />

          <Input
            label={FORM_LABELS.RUN}
            type="text"
            value={run}
            onChange={(e) => setRun(e.target.value)}
            placeholder={FORM_LABELS.RUN_PLACEHOLDER}
            helperText={FORM_LABELS.RUN_FORMAT}
            icon={infoIcon}
            disabled={loading}
          />

          {error && <ErrorMessage message={error} />}

          <Button type="submit" variant="primary" loading={loading}>
            {UI_TEXT.START_GAME}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            {UI_TEXT.POWERED_BY}{" "}
            <span className="font-semibold text-uno-purple">
              Nicolás Antonio Roa Prado
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
