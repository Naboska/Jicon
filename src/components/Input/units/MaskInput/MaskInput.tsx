import { MutableRefObject, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useIMask } from 'react-imask';
import { equals } from 'ramda';

import { dispatchEvent, mergeRefs } from 'lib';

import { StyledInput } from '../../styled';

import type { IMaskInput } from './types';
import { StyledMaskInput } from './styled';

export const MaskInput = memo(({ maskOptions, inputRef, ...rest }: IMaskInput) => {
  const ref = useRef<HTMLInputElement>();
  const [opts] = useState(maskOptions);
  const { value: inputValue } = rest;

  const updateInput = useCallback((value: string) => {
    dispatchEvent({ event: 'input', element: ref.current, property: 'value', args: value });
  }, []);

  const { ref: innerRef, maskRef } = useIMask(opts, { onAccept: updateInput });

  useEffect(() => {
    maskRef.current.value = inputValue.toString();
    maskRef.current.updateValue();
  }, [inputValue, maskRef]);

  return (
    <>
      <StyledInput ref={innerRef as MutableRefObject<HTMLInputElement>} />
      <StyledMaskInput ref={mergeRefs(inputRef, ref)} {...rest} />
    </>
  );
}, equals);

MaskInput.displayName = 'MaskInput';