import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback } from 'react';
import * as PopoverMenu from '@/editor/components/ui/PopoverMenu';

import { Toolbar } from '@/editor/components/ui/Toolbar';
import { isColumnGripSelected } from './utils';
import { Icon } from '@/editor/components/ui/Icon';
import { MenuProps, ShouldShowProps } from '@/editor/components/menus/types';

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor],
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey='tableColumnMenu'
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: 'flip', enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Toolbar.Wrapper isVertical>
          <PopoverMenu.Item
            iconComponent={<Icon name='ArrowLeftToLine' />}
            close={false}
            label='뒤에 열 추가'
            onClick={onAddColumnBefore}
          />
          <PopoverMenu.Item
            iconComponent={<Icon name='ArrowRightToLine' />}
            close={false}
            label='앞에 열 추가'
            onClick={onAddColumnAfter}
          />
          <PopoverMenu.Item
            icon='Trash'
            close={false}
            label='열 삭제'
            onClick={onDeleteColumn}
          />
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  },
);

TableColumnMenu.displayName = 'TableColumnMenu';

export default TableColumnMenu;
