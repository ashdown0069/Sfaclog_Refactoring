import { Group } from './types';

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: '제목1',
        iconName: 'Heading1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        name: 'heading2',
        label: '제목2',
        iconName: 'Heading2',
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        name: 'heading3',
        label: '제목3',
        iconName: 'Heading3',
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        name: 'bulletList',
        label: '글머리 기호 목록',
        iconName: 'List',
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        name: 'numberedList',
        label: '번호 매겨진 목록',
        iconName: 'ListOrdered',
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        name: 'taskList',
        label: '할 일 목록',
        iconName: 'ListTodo',
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run();
        },
      },
      {
        name: 'blockquote',
        label: '인용',
        iconName: 'Quote',
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run();
        },
      },
      {
        name: 'codeBlock',
        label: '코드 블록',
        iconName: 'SquareCode',
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock({ language: 'plaintext' }).run();
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'table',
        label: '테이블',
        iconName: 'Table',
        description: 'Insert a table',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run();
        },
      },
      {
        name: 'image',
        label: '이미지',
        iconName: 'Image',
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run();
        },
      },
      // {
      //   name: 'columns',
      //   label: '2열로 나누기',
      //   iconName: 'Columns',
      //   description: 'Add two column content',
      //   aliases: ['cols'],
      //   shouldBeHidden: editor => editor.isActive('columns'),
      //   action: editor => {
      //     editor
      //       .chain()
      //       .focus()
      //       .setColumns()
      //       .focus(editor.state.selection.head - 1)
      //       .run();
      //   },
      // },
      {
        name: 'horizontalRule',
        label: '구분선',
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
      {
        name: 'toc',
        label: '목차',
        iconName: 'Book',
        aliases: ['outline'],
        description: 'Insert a table of contents',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTableOfContents().run();
        },
      },
    ],
  },
];

export default GROUPS;
