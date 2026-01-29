import { useState } from 'react';
import {
  User,
  Shield,
  Settings,
  LogOut,
} from 'lucide-react';
import * as React from 'react';

import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DropdownSelect } from '../../components/ui/DropdownSelect';

import { useSettings } from '../../contexts/SettingsContext';
import { useTranslate } from '../../hooks/useTranslate';

export const Profile = () => {
  const { language, theme, setLanguage, setTheme } = useSettings();
  const t = useTranslate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = () => {
    setError(null);
    setSuccess(null);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in both fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // 🔴 Backend not wired yet (this is intentional)
    setSuccess('Password updated (demo)');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* ================= HEADER ================= */}
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-white">
          {t('profileSettings')}
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Manage your account, security and preferences
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">

        {/* ================= SIDEBAR ================= */}
        <aside className="sticky top-24 h-fit space-y-1">
          <SidebarItem icon={<User />} label="Account" active />
          <SidebarItem icon={<Shield />} label="Security" />
          <SidebarItem icon={<Settings />} label="Preferences" />
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="space-y-12">

          {/* ================= ACCOUNT ================= */}
          <Section
            icon={<User />}
            title="Account"
            description="Basic information linked to your account"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Input label="Full name" defaultValue="Admin User" />
              <Input label="Email address" defaultValue="admin@example.com" />
              <Input label="Role" disabled defaultValue="Administrator" />
              <Input label="Member since" disabled defaultValue="January 2026" />
            </div>

            <SectionActions>
              <Button>Save changes</Button>
            </SectionActions>
          </Section>

          {/* ================= SECURITY ================= */}
          <Section
            icon={<Shield />}
            title="Security"
            description="Change your password"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                type="password"
                label="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                label="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-500">{success}</p>
            )}

            <SectionActions>
              <Button onClick={handlePasswordChange}>
                Update password
              </Button>
            </SectionActions>
          </Section>

          {/* ================= PREFERENCES ================= */}
          <Section
            icon={<Settings />}
            title={t('preferences')}
            description="Customize how the application behaves"
          >
            <div className="grid gap-6 sm:grid-cols-2">

              <DropdownSelect
                label={t('language')}
                value={language}
                options={[
                  { label: 'English', value: 'en' },
                  { label: 'Deutsch', value: 'de' },
                ]}
                onChange={(val) => setLanguage(val as any)}
              />

              <DropdownSelect
                label={t('theme')}
                value={theme}
                options={[
                  { label: 'Dark', value: 'dark' },
                  { label: 'Light', value: 'light' },
                ]}
                onChange={(val) => setTheme(val as any)}
              />

            </div>

            <SectionActions>
              <Button variant="outline">
                {t('savePreferences')}
              </Button>
            </SectionActions>
          </Section>

          {/* ================= DANGER ZONE ================= */}
          <Card className="border border-red-500/30 bg-red-500/5">
            <CardHeader className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-red-500" />
              <CardTitle className="text-red-500">
                Danger zone
              </CardTitle>
            </CardHeader>

            <CardBody className="flex justify-end">
<Button variant="danger">
  Logout everywhere
</Button>
            </CardBody>
          </Card>

        </main>
      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

const SidebarItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <button
    className={`
      flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm transition
      ${active
        ? 'bg-white/10 text-white'
        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
      }
    `}
  >
    <span className="h-4 w-4">{icon}</span>
    {label}
  </button>
);

const Section = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex items-start gap-3">
      <div className="mt-1 h-5 w-5 text-neutral-300">{icon}</div>
      <div>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </CardHeader>

    <CardBody className="space-y-6">
      {children}
    </CardBody>
  </Card>
);

const SectionActions = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between border-t border-white/10 pt-6">
    {children}
  </div>
);
