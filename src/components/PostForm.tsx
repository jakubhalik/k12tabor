'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export default function PostForm({
    action,
}: {
    action: (formData: FormData) => Promise<{ success: boolean } | undefined>;
}) {
    const [formMode, setFormMode] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(Object.fromEntries(formData.entries()));
        const response = await action(formData);
        setDialogOpen(true);
        response.success && setResponseSuccess(true);
    };
    const kid = {
        kidName: 'Jméno',
        kidSurname: 'Příjmení',
        dateOfBirth: 'Datum narození',
        tShirtSize: 'Velikost trika',
        streetAndNumber: 'Ulice a číslo',
        city: 'Město',
        zip: 'PSČ',
        country: 'Země',
    };
    const parent = {
        parentName: 'Jméno',
        parentSurname: 'Příjmení',
        phoneNumber: 'Telefonní číslo',
        email: 'Email',
    };
    return (
        <>
            {!formMode ? (
                <div className="flex justify-center pt-32 pb-[150px]">
                    <button
                        onClick={() => setFormMode(true)}
                        className="px-6 py-3 text-3xl font-medium text-white rounded-md 
                                bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 
                                active:border-white dark:from-sky-500 dark:to-blue-800 dark:hover:from-blue-700 
                                dark:hover:to-blue-700"
                    >
                        Zaregistruj se na tábor
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="pt-20 pb-[150px]">
                    <div className="px-4 py-6 md:px-6 lg:py-12">
                        <div className="grid max-w-3xl gap-2 mx-auto">
                            <h1 className="text-3xl font-bold text-white">
                                Údaje o dítěti
                            </h1>
                            <div className="sm:pl-8">
                                {Object.entries(kid).map(([key, value]) => (
                                    <div className="pt-2" key={key}>
                                        <Label htmlFor={key}>{value} *</Label>
                                        <Input
                                            id={key}
                                            name={key}
                                            type="string"
                                            placeholder={value}
                                        />
                                    </div>
                                ))}
                                <div className="pt-2"></div>
                                <Label htmlFor="moreInfo">
                                    Další informace o dítěti (Alergie, léky,
                                    pravidelné návyky, zdravotní omezení,
                                    omezení ve stravě, atp.)
                                </Label>
                                <Textarea
                                    id="moreInfo"
                                    name="moreInfo"
                                    placeholder="Další informace o dítěti (Alergie, léky,
                                    pravidelné návyky, zdravotní omezení,
                                    omezení ve stravě, atp.)"
                                />
                            </div>
                            <h1 className="text-white text-3xl font-bold pt-14">
                                Údaje o zákonném zástupci
                            </h1>
                            <div className="sm:pl-8">
                                {Object.entries(parent).map(([key, value]) => (
                                    <div className="pt-2" key={key}>
                                        <Label htmlFor={key}>{value} *</Label>
                                        <Input
                                            name={key}
                                            id={key}
                                            type="string"
                                            placeholder={value}
                                        />
                                    </div>
                                ))}
                                <div className="pt-2"></div>
                                <Label htmlFor="note">
                                    Poznámky (prostor pro další dotazy)
                                </Label>
                                <Textarea
                                    id="note"
                                    name="note"
                                    placeholder="Poznámky (prostor pro další dotazy)"
                                />
                            </div>
                            <br />
                            <AlertDialog
                                open={dialogOpen}
                                onOpenChange={setDialogOpen}
                            >
                                <AlertDialogTrigger asChild>
                                    <button className="hidden">Open</button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogTitle>
                                        {responseSuccess
                                            ? 'Přihláška odeslána'
                                            : 'Vyplňte všechna povinná pole!'}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {responseSuccess
                                            ? 'Vaše přihláška byla úspěšně odeslána.'
                                            : 'Vyplňte prosím všechna povinná pole.'}
                                    </AlertDialogDescription>
                                    <AlertDialogAction
                                        onClick={() => setDialogOpen(false)}
                                    >
                                        OK
                                    </AlertDialogAction>
                                </AlertDialogContent>
                            </AlertDialog>

                            <button
                                className="inline-flex items-center justify-center px-6 py-[6px] text-lg font-medium text-white rounded-md
                                bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 
                                active:border-white dark:from-sky-400 dark:to-blue-900 dark:hover:from-blue-900 dark:hover:to-sky-400
                                dark:active:border dark:focus:border"
                            >
                                Poslat přihlášku
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
