"use client";

import * as React from "react";
import * as z from "zod";
import { generate } from "generate-password";
import { passwordStrength } from "check-password-strength";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import StrengthIndicator from "@/components/strength-indicator";
import { cn } from "@/lib/utils";

const PASSWORD_STRENGTHS = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];

const schema = z.object({
  length: z.number().min(8).max(20),
  lowercase: z.boolean(),
  uppercase: z.boolean(),
  numbers: z.boolean(),
  symbols: z.boolean(),
  isCopied: z.boolean(),
  generatedPassword: z.string(),
  strength: z.union([z.number().min(0).max(4), z.null()]),
});

type AppState = z.infer<typeof schema>;
type Action =
  | { type: "lowercase" }
  | { type: "uppercase" }
  | { type: "numbers" }
  | { type: "symbols" }
  | { type: "set-length"; payload: number }
  | { type: "set-strength"; payload: number }
  | { type: "set-generated-password"; payload: string }
  | { type: "set-is-copied" };

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "lowercase":
      return { ...state, lowercase: !state.lowercase };
    case "uppercase":
      return { ...state, uppercase: !state.uppercase };
    case "numbers":
      return { ...state, numbers: !state.numbers };
    case "symbols":
      return { ...state, symbols: !state.symbols };
    case "set-length":
      return { ...state, length: action.payload };
    case "set-strength":
      return { ...state, strength: action.payload };
    case "set-generated-password":
      return { ...state, generatedPassword: action.payload };
    case "set-is-copied":
      return { ...state, isCopied: true };
    default:
      throw new Error("Invalid action type");
  }
}

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, {
    length: 8,
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
    isCopied: false,
    generatedPassword: "P4$5W0rD!",
    strength: null,
  });
  const passwordRef = React.useRef<HTMLParagraphElement>(null);

  const isPlaceholder = state.generatedPassword === "P4$5W0rD!";
  const disableButton = !state.lowercase && !state.uppercase;

  function handleCopy() {
    if (!isPlaceholder && passwordRef.current) {
      navigator.clipboard.writeText(passwordRef.current.innerText);
      dispatch({ type: "set-is-copied" });
    }
  }

  function handleSliderChange(value: number[]) {
    dispatch({ type: "set-length", payload: value[0] });
  }

  function handleCheckboxChange(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.getAttribute("id");
    dispatch({
      type: id as "lowercase" | "uppercase" | "numbers" | "symbols",
    });
  }

  function handleSubmit() {
    const { length, lowercase, uppercase, numbers, symbols } = state;
    const generatedPassword = generate({
      length,
      lowercase,
      uppercase,
      numbers,
      symbols,
    });
    dispatch({ type: "set-generated-password", payload: generatedPassword });
    const strength = passwordStrength(generatedPassword).id;
    dispatch({ type: "set-strength", payload: strength });
  }

  return (
    <main className="min-h-screen mx-auto max-w-[1440px]">
      <div className="py-16 px-4 md:px-[7.125rem] md:pt-[8.313rem] md:pb-[12.25rem] lg:px-[28.125rem]">
        <h1 className="text-gray text-center mb-4 md:mb-[1.938rem] md:text-2xl">
          Password Generator
        </h1>

        <div className="flex p-4 items-center justify-between bg-dark-gray mb-4 md:py-[1.188rem] md:px-8 md:mb-6 lg:h-[80px]">
          <div className="max-w-[60%] md:max-w-[75%]">
            <p
              className={cn(
                "text-gray text-2xl md:text-[2rem]",
                !isPlaceholder &&
                  "text-light-gray text-ellipsis whitespace-nowrap overflow-hidden"
              )}
              ref={passwordRef}
            >
              {state.generatedPassword}
            </p>
          </div>
          <div className="flex items-center">
            {state.isCopied && (
              <p className="text-[1.125rem] text-lime mr-4">Copied!</p>
            )}
            <button onClick={handleCopy} className="group" aria-label="Copy">
              <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
                  fill="#A4FFAF"
                  className="group-hover:fill-light-gray group-focus:fill-light-gray transition-colors outline-lime"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-dark-gray p-4 md:pt-8 md:px-8 md:pb-8">
          <div className="flex items-center justify-between mb-[1.125rem] md:mb-[1.688rem]">
            <p className="text-light-gray md:text-[1.125rem]">
              Character Length
            </p>
            <div className="text-2xl text-lime md:text-[2rem]">
              {state.length}
            </div>
          </div>

          <div>
            <Slider
              onValueChange={handleSliderChange}
              min={8}
              max={20}
              step={1}
              aria-label="Character Length"
            />
          </div>

          <div className="mt-[2.625rem] mb-8">
            <div className="flex items-center mb-4 md:mb-[1.188rem]">
              <Checkbox
                id="uppercase"
                aria-label="uppercase"
                name="uppercase"
                onClick={handleCheckboxChange}
              />
              <Label
                htmlFor="uppercase"
                className="ml-[1.25rem] text-light-gray md:text-[1.125rem] md:ml-6"
              >
                Include Uppercase Letters
              </Label>
            </div>

            <div className="flex items-center mb-4 md:mb-[1.188rem]">
              <Checkbox
                id="lowercase"
                aria-label="lowercase"
                name="lowercase"
                onClick={handleCheckboxChange}
              />
              <Label
                htmlFor="lowercase"
                className="ml-[1.25rem] text-light-gray md:text-[1.125rem] md:ml-6"
              >
                Include Lowercase Letters
              </Label>
            </div>

            <div className="flex items-center mb-4 md:mb-[1.188rem]">
              <Checkbox
                id="numbers"
                aria-label="numbers"
                name="numbers"
                onClick={handleCheckboxChange}
              />
              <Label
                htmlFor="numbers"
                className="ml-[1.25rem] text-light-gray md:text-[1.125rem] md:ml-6"
              >
                Include Numbers
              </Label>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="symbols"
                aria-label="symbols"
                name="symbols"
                onClick={handleCheckboxChange}
              />
              <Label
                htmlFor="symbols"
                className="ml-[1.25rem] text-light-gray md:text-[1.125rem] md:ml-6"
              >
                Include Symbols
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-[0.875rem] md:pl-8 md:pr-[1.313rem] md:pb-[1.313rem] md:pt-[1.438rem] uppercase bg-slate mb-4 md:mb-8">
            <p className="text-gray md:text-[1.125rem]">Strength</p>
            <div className="flex items-center justify-between">
              {typeof state.strength === "number" && (
                <p className="text-light-gray text-[1.125rem] mr-4 md:text-2xl">
                  {PASSWORD_STRENGTHS[state.strength]}
                </p>
              )}
              <div className="flex items-center gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <StrengthIndicator
                    key={index}
                    index={index}
                    strength={state.strength}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              disabled={disableButton}
              onClick={handleSubmit}
              aria-label="Generate"
              className="flex items-center text-[1.125rem] group w-full py-[1.25rem] justify-center transition-colors text-base uppercase bg-lime border-2 border-lime hover:bg-dark-gray hover:text-lime focus:bg-dark-gray focus:text-lime focus:outline-none disabled:bg-dark-gray disabled:text-lime disabled:cursor-not-allowed"
            >
              Generate
              <svg
                className="ml-6 block"
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={cn(
                    "group-hover:fill-lime group-focus:fill-lime transition-colors",
                    disableButton && "fill-lime"
                  )}
                  fill="#24232C"
                  d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
