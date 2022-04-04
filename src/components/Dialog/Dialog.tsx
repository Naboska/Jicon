import { clamp } from 'ramda';

import { Portal } from 'components/Portal';
import { combineClassNames } from 'lib';

import type { TDialog } from './types';
import { useDialogVisible } from './hooks';
import { DIALOG_CN } from './constants';
import { DialogContent, DialogOverlay } from './units';

export const Dialog = ({
  name,
  className,
  isOpen,
  onClose,
  variant = 'modal',
  zIndex = 20,
  withOverlay = true,
  children,
  ...rest
}: TDialog) => {
  const isVisible = useDialogVisible(name, isOpen);

  const layoutIndex = clamp(2, Number.MAX_SAFE_INTEGER, zIndex);
  const handleClose: TDialog['onClose'] = isVisible && onClose ? event => onClose(event) : undefined;

  return (
    <Portal name="dialogs">
      <DialogContent
        className={combineClassNames(className, DIALOG_CN)}
        isOpen={isVisible}
        zIndex={layoutIndex}
        onClose={handleClose}
        {...{ variant }}
        {...rest}
      >
        {children}
      </DialogContent>
      {withOverlay && <DialogOverlay isOpen={isVisible} zIndex={layoutIndex - 1} onClose={handleClose} />}
    </Portal>
  );
};