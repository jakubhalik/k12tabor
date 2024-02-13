'use client';

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState, FormEvent } from 'react';

export default function EmailForm({
    action,
}: {
    action: (formData: FormData) => Promise<{ success: boolean } | undefined>;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData.entries()));
        const response = await action(formData);
        setDialogOpen(true);
        response?.success && setResponseSuccess(true);
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto pt-16"
        >
            <input
                className="flex-1 px-4 py-1 text:md sm:text-lg text-gray-900 bg-white rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Přihlaš se k novinkám o táboru"
                name="email"
                type="email"
            />
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogTrigger asChild>
                    <button className="hidden">Open</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>
                        {responseSuccess
                            ? '@Adresa přijata.'
                            : 'Nepřijato, zkuste to prosím znovu.'}
                    </AlertDialogTitle>
                    <AlertDialogAction onClick={() => setDialogOpen(false)}>
                        OK
                    </AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
            <button
                className="inline-flex items-center justify-center px-6 py-1 text-lg font-medium text-white rounded-md
            bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 
            active:border-white dark:from-blue-600 dark:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-700
            dark:active:border dark:focus:border"
                type="submit"
            >
                Poslat @adresu
            </button>
        </form>
    );
}
