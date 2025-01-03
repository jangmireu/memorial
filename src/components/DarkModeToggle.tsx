interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      className="bg-black text-white px-4 py-2 text-sm rounded shadow-lg"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
