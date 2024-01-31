"use client";

export default function SubmitButton() {
  return (
    <button
      onClick={() => alert("@Adresa přijata.")}
      className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      type="submit"
    >
      Poslat @adresu
    </button>
  );
}
