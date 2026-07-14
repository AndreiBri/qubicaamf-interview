const Spinner = () => {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16">
      <span
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100"
        aria-hidden="true"
      />
      <span className="text-sm text-gray-500 dark:text-gray-400">Caricamento prodotti…</span>
    </div>
  );
};

export default Spinner;
