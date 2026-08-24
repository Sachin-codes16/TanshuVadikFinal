import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { RefreshCw } from 'lucide-react';

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid ambiguity
const CODE_LENGTH = 6;

const generateCode = () =>
  Array.from({ length: CODE_LENGTH }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join('');

export interface CaptchaHandle {
  /** Returns true if the current input matches the code. Regenerates the code on failure. */
  validate: () => boolean;
  /** Regenerates the code and clears the input, without flagging an error. */
  reset: () => void;
}

const LETTER_COLORS = ['#2C2623', '#8F533C', '#4A5D3A'];

export const SimpleCaptcha = forwardRef<CaptchaHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const [code, setCode] = useState(generateCode);
    const [input, setInput] = useState('');
    const [showError, setShowError] = useState(false);

    const regenerate = () => {
      setCode(generateCode());
      setInput('');
      setShowError(false);
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        const ok = input.trim().toUpperCase() === code;
        if (!ok) {
          setShowError(true);
          regenerate();
        }
        return ok;
      },
      reset: regenerate,
    }));

    const letters = useMemo(
      () =>
        code.split('').map((char, i) => ({
          char,
          rotate: Math.round((Math.random() - 0.5) * 30),
          translateY: Math.round((Math.random() - 0.5) * 10),
          color: LETTER_COLORS[(i + code.charCodeAt(i)) % LETTER_COLORS.length],
        })),
      [code]
    );

    const noiseLines = useMemo(
      () =>
        Array.from({ length: 3 }, () => ({
          top: `${10 + Math.random() * 80}%`,
          rotate: Math.round((Math.random() - 0.5) * 40),
        })),
      [code]
    );

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label className="font-sans text-sm text-[#2C2623]">
          Verification Code <span className="text-[#C0392B]">*</span>
        </label>
        <div className="flex items-stretch gap-3">
          <div className="relative flex-1 max-w-[180px] h-12 select-none overflow-hidden border border-[#D8CFC4] bg-[#F4EFEA] flex items-center justify-center">
            {noiseLines.map((line, i) => (
              <span
                key={i}
                className="absolute left-0 w-full h-px bg-[#B8AC9E]/70"
                style={{ top: line.top, transform: `rotate(${line.rotate}deg)` }}
              />
            ))}
            <div className="relative flex">
              {letters.map((l, i) => (
                <span
                  key={i}
                  className="font-serif text-lg font-bold tracking-wide"
                  style={{
                    color: l.color,
                    transform: `rotate(${l.rotate}deg) translateY(${l.translateY}px)`,
                    display: 'inline-block',
                  }}
                >
                  {l.char}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={regenerate}
            aria-label="Refresh captcha code"
            className="w-12 h-12 flex items-center justify-center border border-[#D8CFC4] bg-white text-[#615751] hover:text-[#8F533C] hover:border-[#8F533C] transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw size={16} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (showError) setShowError(false);
            }}
            placeholder="Enter code"
            autoComplete="off"
            className="flex-1 min-w-0 border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
          />
        </div>
        {showError && (
          <p className="font-sans text-xs text-[#C0392B]">
            Incorrect code. Please try the new code shown above.
          </p>
        )}
      </div>
    );
  }
);

SimpleCaptcha.displayName = 'SimpleCaptcha';
