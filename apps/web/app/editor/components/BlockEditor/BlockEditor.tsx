//@ts-nocheck
'use client';
// import '@/styles/editorSettings.css';
// import "/styles/global.css";
import { Editor, EditorContent, PureEditorContent } from '@tiptap/react';
import { useMemo, useRef } from 'react';
import { LinkMenu } from '../menus';

import '@/editor/styles/index.css';
import { EditorContext } from '@/editor/context/EditorContext';
import ImageBlockMenu from '@/editor/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@/editor/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/editor/extensions/Table/menus';
import { TextMenu } from '../menus/TextMenu';
import { ContentItemMenu } from '../menus/ContentItemMenu';
import { TableOfContents } from '../TableOfContents';

interface BlockEditorProps {
  editor: Editor | null;
  mode: 'write' | 'view';
  hasHeading?: boolean;
}
const BlockEditor = ({ editor, mode, hasHeading }: BlockEditorProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);
  // useEffect(() => {
  //   editor?.commands.focus('start');
  // }, [editor]);

  const providerValue = useMemo(() => {
    return {};
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContext.Provider value={providerValue}>
        <div className={`min-h-full`} ref={menuContainerRef}>
          <div className='relative flex flex-1 flex-col overflow-hidden'>
            <EditorContent
              editor={editor}
              ref={editorRef}
              className='flex-1 overflow-visible'
            />
            {mode == 'write' && <ContentItemMenu editor={editor} />}
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
            <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
          </div>
        </div>
        {((mode == 'view' && hasHeading) || mode == 'write') && (
          <div className='maxWidth-1200:hidden fixed right-5 top-[200px]'>
            <TableOfContents editor={editor} />
          </div>
        )}
      </EditorContext.Provider>
    </>
  );
};

export default BlockEditor;
