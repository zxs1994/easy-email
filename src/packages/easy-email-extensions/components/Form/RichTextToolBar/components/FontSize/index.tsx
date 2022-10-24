import React, { useCallback, useEffect } from 'react';

import { Menu, Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import styleText from '../../styles/ToolsPopover.css?inline';

const list = [
  {
    value: '12px',
    label: '12px',
  },
  {
    value: '14px',
    label: '14px',
  },
  {
    value: '16px',
    label: '16px',
  },
  {
    value: '18px',
    label: '18px',
  },
  {
    value: '24px',
    label: '24px',
  },
  {
    value: '32px',
    label: '32px',
  },
  {
    value: '48px',
    label: '48px',
  },
];

export interface FontSizeProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontSize(props: FontSizeProps) {
  const { execCommand } = props;
  const [visible, setVisible] = React.useState(false);
  const onChange = useCallback((val: string) => {
    // console.log('fontSize', val);
    // const selectionObj = window.getSelection();
    // const selectedText = selectionObj.toString();
    // const rangeObj = selectionObj.getRangeAt(0);
    // const docFragment = rangeObj.cloneContents();
    // const tempDiv = document.createElement("div");
    // tempDiv.appendChild(docFragment);
    // const selectedHtml = tempDiv.innerHTML;
    // console.log(selectionObj, selectedText, rangeObj, docFragment, selectedHtml);

    // insertHTML
    // execCommand('insertHTML', `<span style="font-size: ${val}">${selectedText}<span>`);
    // execCommand('fontSize', val);
    setVisible(false);
  }, [execCommand]);

  const onVisibleChange = useCallback((v: boolean) => {
    setVisible(v);
  }, []);

  return (
    <Popover
      trigger='click'
      color='#fff'
      position='left'
      className='easy-email-extensions-Tools-Popover'
      popupVisible={visible}
      onVisibleChange={onVisibleChange}
      content={(
        <>
          <style>{styleText}</style>
          <div
            style={{
              maxWidth: 150,
              maxHeight: 350,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <Menu
              onClickMenuItem={onChange}
              selectedKeys={[]}
              style={{ border: 'none', padding: 0 }}
            >
              {list.map((item) => (
                <Menu.Item
                  style={{ lineHeight: '30px', height: 30 }}
                  key={item.value}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </>

      )}
      getPopupContainer={props.getPopupContainer}
    >
      <ToolItem
        title='Font size'
        icon={<IconFont iconName='icon-font-color' />}
      />
    </Popover>
  );

}
