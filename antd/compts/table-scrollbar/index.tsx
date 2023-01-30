/*
 * @Author: kangrun.shao kangrun.shao@ly.com
 * @Date: 2022-12-09
 * @LastEditors: kangrun.shao kangrun.shao@ly.com
 * @LastEditTime: 2023-01-30
 * @Description: 表格浮动滚动条
 *
 */
import { useCreation, useEventListener, useInViewport, useSize } from 'ahooks';
import { Affix } from 'antd';
import _ from 'lodash';
import { cloneElement, useRef, useState, useEffect } from 'react';

import styles from './style.module.less';

type TableScrollProps = {
  children: React.ReactNode;
  /**
   * y轴的滚动条
   */
  target?: HTMLElement;
};

const getParentNodeScroll = (parentNode: HTMLElement | null | undefined): HTMLElement | undefined => {
  if (!parentNode) return undefined;
  if (parentNode.scrollHeight - parentNode.clientHeight > 50) {
    return parentNode;
  }
  return getParentNodeScroll(parentNode.parentNode as HTMLElement);
};

export const TableScrollbar = ({ children, target }: TableScrollProps) => {
  const summary: any = _.get(children, 'props.summary');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return cloneElement(children as any, {
    summary: (...args) => (
      <>
        {summary?.(...args)}
        <ScrollbarSummary target={target} />
      </>
    ),
  });
};
type ScrollbarSummaryProps = {
  target?: HTMLElement;
};
const ScrollbarSummary = ({ target }: ScrollbarSummaryProps) => {
  const refScrollBox = useRef<HTMLDivElement>();
  const refScroll = useRef<HTMLDivElement>();
  // 控制滚动条的显示
  const [show, setShow] = useState<boolean>(false);
  // 获取表格和表格包裹框
  const { table, tableBox } = useCreation(() => {
    const getParentTable = (parentNode: HTMLElement | null | undefined): HTMLElement | undefined => {
      if (!parentNode) return undefined;
      if (parentNode.nodeName === 'TABLE') {
        return parentNode;
      }
      return getParentTable(parentNode.parentNode as HTMLElement);
    };
    const table = getParentTable(refScrollBox?.current?.parentElement);
    return {
      table,
      tableBox: table?.parentElement,
    };
  }, [refScrollBox.current]);
  // 表格是否显示
  const [inViewport] = useInViewport(table?.querySelector('tbody'));
  // 监听左右滚动框的大小变化
  const size = useSize(tableBox);
  // 获取上下滚动事件的滚动条
  const _target = useCreation(() => {
    if (target) return target;
    return getParentNodeScroll(table) || document.body;
  }, [target, table, size]);

  useEffect(() => {
    if (show && refScrollBox.current && refScroll.current) {
      if (refScrollBox.current.clientWidth != tableBox?.clientWidth) {
        refScrollBox.current.style.width = `${tableBox?.clientWidth || 0}px`;
      }
      if (refScroll.current.clientWidth != table?.clientWidth) {
        refScroll.current.style.width = `${table?.clientWidth || 0}px`;
      }
    }
  }, [size, show]);

  // 注册原始滚动条事件
  useEventListener(
    'scroll',
    ({ target }) => {
      if (refScrollBox.current) {
        refScrollBox.current.scrollLeft = target.scrollLeft;
      }
    },
    { target: () => tableBox },
  );
  // 注册原始自定义滚动条时间
  useEventListener(
    'scroll',
    ({ target }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (tableBox) tableBox.scrollLeft = target.scrollLeft;
    },
    { target: refScrollBox },
  );
  return (
    <div className={styles.scrollbarMain}>
      <Affix
        offsetBottom={inViewport ? 13 : 0}
        style={{ opacity: show ? 1 : 0 }}
        onChange={(value) => setShow(!!value)}
        target={() => _target}
      >
        <div ref={refScrollBox as any} className={styles.scrollbarBox}>
          <div ref={refScroll as any} style={{ height: 1 }}></div>
        </div>
      </Affix>
    </div>
  );
};
