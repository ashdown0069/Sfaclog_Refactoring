import { useEffect } from 'react';
import { Editor, useEditor } from '@tiptap/react';
import ExtensionKit from '../extensions/extension-kit';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = (logContent: any, mode: 'write' | 'view') => {
  const editor = useEditor(
    {
      content: logContent ? logContent : null,
      editable: mode === 'write' ? true : mode === 'view' ? false : true,
      autofocus: true,
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-[400px]',
        },
      },
    },
    [],
  );

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };
  useEffect(() => {
    window.editor = editor;
  }, []);

  return { editor, characterCount };
};
