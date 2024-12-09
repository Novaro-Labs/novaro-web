import React, { useRef } from "react";

const InvitationCodeInput = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...value];
      newCode[index] = value;
      onChange(newCode);
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text");
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      onChange(newCode);
      inputsRef.current[5].focus();
    }
  };

  return (
    <div onPaste={handlePaste} className="flex items-center gap-3">
      {value.map((digit, index) => (
        <input
          className="w-16 h-16 text-center rounded-2xl bg-white text-blue-500 text-3xl font-bold"
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el!)}
        />
      ))}
    </div>
  );
};

export default InvitationCodeInput;
