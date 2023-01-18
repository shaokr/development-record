/*
 * @Author: kangrun.shao kangrun.shao@ly.com
 * @Date: 2022-10-31
 * @LastEditors: kangrun.shao kangrun.shao@ly.com
 * @LastEditTime: 2023-01-10
 * @Description: 光标修正组件
 * 用于输入组件对内容进行了修改
 */
import _ from 'lodash';
import React, { cloneElement, ReactNode } from 'react';
type InputSelection = {
  start: number;
  end: number;
  value: string;
  prevValue: string;
};
type CursorCorrectionProps = {
  onCorrection?(inputSelection: InputSelection): Partial<InputSelection>;
  children: ReactNode;
};
/** 光标矫正 */
export class CursorCorrection extends React.Component<CursorCorrectionProps> {
  inputSelection: InputSelection | null;
  target: HTMLInputElement;
  componentDidUpdate() {
    const { inputSelection } = this;
    if (inputSelection?.start && inputSelection.end) {
      const { target } = this;
      const onCorrection = _.get(this.props, 'onCorrection');
      if (onCorrection) _.assign(inputSelection, onCorrection(inputSelection));
      target.selectionStart = inputSelection.start;
      target.selectionEnd = inputSelection.end;
      this.inputSelection = _.assign(this.inputSelection, {
        start: null,
        end: null,
      });
    }
  }

  handleChange = (e) => {
    const childrenOnChange = _.get(this.props, 'children.props.onChange') as any;
    void childrenOnChange?.(e);
    const onChange = _.get(this.props, 'onChange') as any;
    onChange?.(e);

    this.target = e.target;
    this.inputSelection = {
      start: e.target.selectionStart as number,
      end: e.target.selectionEnd as number,
      value: e.target.value || '',
      prevValue: this.inputSelection?.value || '',
    };
  };

  render() {
    const { children, ...props } = this.props;
    if (!children) return null;
    const childrenProps = _.get(children, 'props') as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return cloneElement(children as any, {
      ...props,
      ...childrenProps,
      onChange: this.handleChange,
    });
  }
}
