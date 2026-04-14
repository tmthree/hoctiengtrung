"use client";

// Debounced search input that updates URL searchParams after 300ms idle.
// Uses URL as source of truth — renders a fresh input when searchParams change
// externally (back/forward) via React key reset, avoiding setState-in-effect.
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
}

// Inner component receives a stable initialValue — key reset on parent handles sync.
function SearchInputInner({
  placeholder,
  initialValue,
}: {
  placeholder: string;
  initialValue: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Local DOM-ref-backed value; we control Input via defaultValue + ref
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(next: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) {
        params.set("search", next);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    }, 300);
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    handleChange("");
  }

  // Derive display value from ref (uncontrolled) for the clear button visibility.
  // We read the live DOM value via onChange event; use a local state only for UI.
  return (
    <SearchInputControlled
      placeholder={placeholder}
      initialValue={initialValue}
      onChange={handleChange}
      onClear={handleClear}
      inputRef={inputRef}
    />
  );
}

// Controlled sub-component that tracks value purely for the clear button.
import { useState } from "react";

function SearchInputControlled({
  placeholder,
  initialValue,
  onChange,
  onClear,
  inputRef,
}: {
  placeholder: string;
  initialValue: string;
  onChange: (v: string) => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {value && (
        <button
          onClick={() => {
            setValue("");
            onClear();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function SearchInput({ placeholder = "Tìm kiếm..." }: SearchInputProps) {
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("search") ?? "";

  // key reset causes full remount of inner component when URL changes externally
  // (e.g. browser back/forward), syncing the input without setState-in-effect.
  return (
    <SearchInputInner
      key={initialValue}
      placeholder={placeholder}
      initialValue={initialValue}
    />
  );
}
