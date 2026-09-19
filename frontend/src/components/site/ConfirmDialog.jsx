import { useEffect, useState, useCallback } from "react";

/**
 * Accessible confirm dialog. Usage:
 *   const { confirm, Dialog } = useConfirm();
 *   await confirm({ title, message, confirmLabel });
 *   return (...); {Dialog}
 */
export function useConfirm() {
    const [state, setState] = useState({ open: false, resolve: null, opts: {} });

    const confirm = useCallback((opts = {}) => {
        return new Promise((resolve) => setState({ open: true, resolve, opts }));
    }, []);

    const close = (result) => {
        state.resolve && state.resolve(result);
        setState({ open: false, resolve: null, opts: {} });
    };

    useEffect(() => {
        if (!state.open) return;
        const onKey = (e) => {
            if (e.key === "Escape") close(false);
            if (e.key === "Enter") close(true);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.open]);

    const {
        title = "Are you sure?",
        message = "This action cannot be undone.",
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        destructive = true,
    } = state.opts;

    const Dialog = state.open ? (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            data-testid="confirm-dialog"
            className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center p-6"
            onClick={() => close(false)}
        >
            <div
                className="bg-white border border-[#e5e0d8] w-full max-w-md p-8 shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="eyebrow">Confirm</p>
                <h3 id="confirm-title" className="font-serif text-2xl mt-2">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#3b3532]">{message}</p>
                <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                        onClick={() => close(false)}
                        className="btn-outline"
                        data-testid="confirm-cancel"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => close(true)}
                        className={destructive ? "btn-primary" : "btn-primary"}
                        data-testid="confirm-ok"
                        autoFocus
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    ) : null;

    return { confirm, Dialog };
}
