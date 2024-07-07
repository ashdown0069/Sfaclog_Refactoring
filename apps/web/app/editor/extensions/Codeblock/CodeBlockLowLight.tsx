//@ts-nocheck
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import React from 'react';

interface CodeBlockLowLightProps extends NodeViewProps {
  node: {
    attrs: {
      language: string;
    };
  } & NodeViewProps['node'];
}
export default function CodeBlockLowLight({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
  editor,
}: CodeBlockLowLightProps) {
  return (
    <NodeViewWrapper className='relative'>
      <select
        disabled={!editor.isEditable}
        className='text-B2M14 absolute right-1 top-1 px-2 py-1 cursor-pointer rounded-md bg-white border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={event => updateAttributes({ language: event.target.value })}
      >
        {extension.options.lowlight.listLanguages().map((lang, index) => (
          <option key={index} value={lang} className='text-text-primary'>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as='code' />
      </pre>
    </NodeViewWrapper>
  );
}
