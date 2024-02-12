'use client';

export default function SubmitButton() {
    return (
        <button
            onClick={() => alert('@Adrese přijata.')}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-md
            bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 
            active:border-white dark:from-blue-600 dark:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-700
            dark:active:border dark:focus:border"
            type="submit"
        >
            Poslat @adresu
        </button>
    );
}
