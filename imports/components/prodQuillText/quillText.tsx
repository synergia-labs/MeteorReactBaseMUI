import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Typography, TypographyProps } from "@mui/material";
import Quill from "quill";

const quillUpdate = (
	ref: HTMLElement | null,
	quill: React.RefObject<Quill | null>,
	edit: boolean,
	onChange: (content: string) => void
) => {
	if (!ref) {
		return;
	}

	if (edit) {
		if (!quill.current) {
			quill.current = new Quill(ref);
			quill.current.on("text-change", () => {
				const html = quill.current?.root.innerHTML;
				if (html) {
					onChange(html);
				}
			});
		} else {
			quill.current.enable(true);
		}
	} else if (quill.current) {
		quill.current.disable();
	}
};

export interface IQuillTextHandle {
	setContent: (content: string) => void;
}

interface IQuillText extends Omit<TypographyProps, "onChange"> {
	edit: boolean;
	onChange?: (content: string) => void;
}

const QuillText = forwardRef<IQuillTextHandle, IQuillText>(({ edit, onChange, ...typographyProps }, ref) => {
	const quillRef = useRef<Quill | null>(null);
	const contentRef = useRef<HTMLElement | null>(null);

	useImperativeHandle(ref, () => ({
		setContent: (content: string) => {
			if (quillRef.current) {
				quillRef.current.clipboard.dangerouslyPasteHTML(content);
			} else if (contentRef.current) {
				contentRef.current.innerHTML = content;
			}
		}
	}));

	useEffect(() => {
		quillUpdate(contentRef.current, quillRef, edit, onChange ?? (() => {}));
	}, [edit]);

	return <Typography ref={contentRef} {...typographyProps} />;
});

export default QuillText;
