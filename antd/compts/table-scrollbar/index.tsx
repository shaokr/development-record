/*
 * @Author: kangrun.shao kangrun.shao@ly.com
 * @Date: 2022-12-09
 * @LastEditors: kangrun.shao kangrun.shao@ly.com
 * @LastEditTime: 2023-01-19
 * @Description: 表格浮动滚动条
 *
 */
import { useDocumentVisibility, useEventListener, useGetState } from 'ahooks';
import { Affix, Table } from 'antd';
import { cloneElement, useRef, useEffect } from 'react';

import styles from './style.module.less';

type TableScrollProps = {
  children: React.ReactNode;
  target?: HTMLElement;
};

const getParentNode = (
  classname: string,
  parentNode: HTMLElement | null | undefined,
): HTMLElement | undefined => {
  if (!parentNode) return undefined;
  if (parentNode.classList.value.includes(classname)) {
    return parentNode;
  }
  return getParentNode(classname, parentNode.parentNode as HTMLElement);
};

export const TableScrollbar = ({ children, target }: TableScrollProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return cloneElement(children as any, { summary: () => <ScrollbarSummary /> });
};

const ScrollbarSummary = () => {
  const refScroll = useRef<HTMLDivElement>();
  const refPScroll = useRef<HTMLDivElement>();
  const documentVisibility = useDocumentVisibility();
  const [show, setShow, getShow] = useGetState<boolean>(false);

  const _target = (document.querySelector('.page') || document.body) as HTMLElement;
  // 持续获取
  useEffect(() => {
    const i = setInterval(() => {
      if (documentVisibility === 'visible' && getShow() && refScroll.current && refPScroll.current) {
        const div = getParentNode('ant-table-content', refScroll.current.parentElement);
        const div2 = getParentNode('ant-table-summary', refScroll.current.parentElement);
        if (refScroll.current.clientWidth != div?.clientWidth) {
          refScroll.current.style.width = `${div?.clientWidth || 0}px`;
        }
        if (refPScroll.current.clientWidth != div2?.clientWidth) {
          refPScroll.current.style.width = `${div2?.clientWidth || 0}px`;
        }
      }
    }, 500);
    return () => clearInterval(i);
  }, [documentVisibility]);
  // 注册原始滚动条事件
  useEventListener(
    'scroll',
    ({ target }) => {
      if (refScroll.current) {
        refScroll.current.scrollLeft = target.scrollLeft;
      }
    },
    { target: () => getParentNode('ant-table-content', refScroll.current?.parentElement) },
  );
  // 注册原始自定义滚动条时间
  useEventListener(
    'scroll',
    ({ target }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const cont = getParentNode('ant-table-content', target);
      if (cont) cont.scrollLeft = target.scrollLeft;
    },
    { target: refScroll },
  );
  return (
    <Table.Summary.Cell colSpan={9999} index={1}>
      <Affix
        offsetBottom={15}
        style={{ opacity: show ? 1 : 0 }}
        onChange={(value) => setShow(!!value)}
        target={() => _target}
      >
        <div ref={refScroll as any} className={styles.scrollbarBox}>
          <div ref={refPScroll as any} style={{ height: 1 }}></div>
        </div>
      </Affix>
    </Table.Summary.Cell>
  );
};
