import { useEffect, useRef } from "react";

interface FormInputProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function FormInput({
  handleSubmit,
  handleInputChange,
  value,
}: FormInputProps) {
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city"></label>
      <input
        value={value}
        ref={inputRef}
        className="p-3 border bg-gray-200 w-full text-3xl text-center focus:outline-none focus:border-black"
        name="city"
        placeholder="city name"
        onChange={handleInputChange}
      />
      <button className="bg-gray-200 border-1 border-gray-800 px-2 my-1 hover:bg-gray-400 shadow-sm justify-end">
        Search
      </button>
    </form>
  );
}
