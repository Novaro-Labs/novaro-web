'use client';

import { Icon } from '@iconify/react';
import { useEventListener } from 'ahooks';
import * as _ from 'lodash-es';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../utils/utils';

export default forwardRef(function ModalWrapperUnstyled(
  {
    theme = 'dark',
    wrapClassName = '',
    className = '',
    afterClose = _.noop,
    children,
    disableEscapeKeyDown = false,
    showClose = false,
    clickOutsideTriggerClose = true,
  }: {
    theme?: 'light' | 'dark';
    wrapClassName?: string;
    className?: string;
    afterClose: () => void;
    children?: React.ReactNode;
    disableEscapeKeyDown?: boolean; // ref: https://mui.com/material-ui/api/modal/#props
    showClose?: boolean;
    clickOutsideTriggerClose?: boolean;
  },
  ref: React.Ref<{ close: () => void }>
) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    afterClose();
  };

  // if keyboard === true and this modal is the topmost one, press ESC key to dismiss this modal
  useEventListener('keydown', (e) => {
    if (!disableEscapeKeyDown && e.key === 'Escape') {
      afterClose();
    }
  });

  useImperativeHandle(ref, () => {
    return {
      close: handleClose,
    };
  }, []);

  return (
    <div
      className={cn('fixed left-0 top-0 z-[var(--z-modal)] h-screen w-screen bg-[rgba(0,0,0,.45)]', wrapClassName)}
      onClick={(e) => {
        if (clickOutsideTriggerClose) {
          e.stopPropagation();
          handleClose();
        }
      }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
        <div
          className={cn(
            'mx-auto w-80',
            theme === 'dark' ? 'bg-[#1C2533] text-white' : 'bg-white text-black',
            className
          )}
          ref={dialogRef}
        >
          {showClose ? (
            <div
              className="absolute right-2 top-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl text-white text-opacity-50 transition-all duration-200 hover:text-opacity-100 active:text-opacity-100"
              onClick={() => handleClose()}
            >
              <Icon icon="carbon:close" fontSize={26} />
            </div>
          ) : null}
          {/* modal content */}
          {children}
        </div>
      </div>
    </div>
  );
});
