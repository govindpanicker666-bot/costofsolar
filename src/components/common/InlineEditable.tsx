import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Pencil, Check, X, Sparkles } from 'lucide-react';

interface InlineEditContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  overrides: Record<string, string>;
  setOverride: (id: string, value: string) => void;
  resetOverrides: () => void;
}

const InlineEditContext = createContext<InlineEditContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
  overrides: {},
  setOverride: () => {},
  resetOverrides: () => {},
});

export const InlineEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('solar_cms_admin_auth_v2') === 'true';
  });

  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('solar_inline_overrides_v1');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem('solar_cms_admin_auth_v2') === 'true');
      try {
        const stored = localStorage.getItem('solar_inline_overrides_v1');
        if (stored) setOverrides(JSON.parse(stored));
      } catch {}
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setOverride = (id: string, value: string) => {
    setOverrides((prev) => {
      const updated = { ...prev, [id]: value };
      try {
        localStorage.setItem('solar_inline_overrides_v1', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving inline override:', err);
      }
      return updated;
    });
  };

  const resetOverrides = () => {
    setOverrides({});
    localStorage.removeItem('solar_inline_overrides_v1');
  };

  return (
    <InlineEditContext.Provider value={{ isAdmin, setIsAdmin, overrides, setOverride, resetOverrides }}>
      {children}
    </InlineEditContext.Provider>
  );
};

export const useInlineEdit = () => useContext(InlineEditContext);

export interface InlineEditableProps {
  id: string;
  defaultText: string | number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'strong' | 'b' | 'em' | 'td' | 'th' | 'li';
  className?: string;
  multiline?: boolean;
  type?: 'text' | 'number';
  onSave?: (newVal: string) => void;
  children?: React.ReactNode;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  id,
  defaultText,
  as: Component = 'span',
  className = '',
  multiline = false,
  onSave,
  children,
}) => {
  const { isAdmin, overrides, setOverride } = useInlineEdit();
  const [isOpen, setIsOpen] = useState(false);
  const rawValue = overrides[id] !== undefined ? overrides[id] : String(defaultText ?? '');
  const [tempValue, setTempValue] = useState(rawValue);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(overrides[id] !== undefined ? overrides[id] : String(defaultText ?? ''));
  }, [id, overrides, defaultText]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
          inputRef.current.select();
        }
      }, 50);

      const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleSave = () => {
    setOverride(id, tempValue);
    if (onSave) onSave(tempValue);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempValue(rawValue);
    setIsOpen(false);
  };

  // If user is not admin, render pure unadorned element with zero overhead
  if (!isAdmin) {
    return (
      <Component className={className}>
        {children !== undefined ? (overrides[id] !== undefined ? overrides[id] : children) : rawValue}
      </Component>
    );
  }

  // Admin view: with hover pencil badge & inline popover
  return (
    <Component className={`relative group inline-block ${className}`}>
      <span>{children !== undefined ? (overrides[id] !== undefined ? overrides[id] : children) : rawValue}</span>

      {/* Hover pencil button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setTempValue(rawValue);
          setIsOpen(true);
        }}
        title={`Edit inline: "${rawValue.slice(0, 30)}..."`}
        className="opacity-0 group-hover:opacity-100 absolute -top-2.5 -right-3 z-30 p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all scale-90 hover:scale-110 cursor-pointer"
        aria-label="Edit text"
      >
        <Pencil className="w-2.5 h-2.5" />
      </button>

      {/* Floating Popover Editor */}
      {isOpen && (
        <div
          ref={popoverRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 top-full mt-2 left-0 min-w-[280px] max-w-sm sm:max-w-md bg-white rounded-xl shadow-2xl border border-slate-300 p-3 text-slate-900 animate-in fade-in zoom-in-95 duration-150 text-left font-normal"
          style={{ width: 'max-content', maxWidth: '380px' }}
        >
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1 text-blue-600">
              <Sparkles className="w-3 h-3" /> Inline Editor
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{id}</span>
          </div>

          <div className="mb-3">
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                rows={3}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-y text-slate-900"
                placeholder="Enter text..."
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                }}
                className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-900"
                placeholder="Enter text..."
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" /> Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3 h-3" /> Save Changes
            </button>
          </div>
        </div>
      )}
    </Component>
  );
};
