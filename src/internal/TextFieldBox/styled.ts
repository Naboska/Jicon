import styled, { DefaultTheme, css } from 'styled-components';
import type { U } from 'ts-toolbelt';

import { TStyledComponentsProps, getComponentStyle, normalizeMixin } from 'lib';

import { FieldMessage } from '../FieldMessage';

type TField = {
  theme: DefaultTheme;
  validate: U.Nullable<boolean>;
  isFocused: boolean;
  isDisabled: boolean;
};

export const StyledTextFieldBox = styled.div<{ boxStyle?: TStyledComponentsProps }>`
  ${normalizeMixin};

  width: 100%;
  padding-bottom: 24px;

  ${({ theme, boxStyle }) => getComponentStyle(boxStyle, { theme })}
`;

const fieldMixin = ({ theme, isFocused, isDisabled, validate }: TField) => {
  if (isDisabled)
    return css`
      background-color: ${({ theme }) => theme.palette.grey_100};
      border-color: ${theme.palette.grey_100};
      color: ${theme.palette.grey_400};
      pointer-events: none;

      input {
        ::-webkit-input-placeholder {
          color: ${theme.palette.grey_400};
        }
      }
    `;

  if (isFocused)
    return css`
      cursor: text;
      background-color: ${({ theme }) => theme.palette.white};
      border-color: ${theme.palette.primary_700};
      color: ${theme.palette.grey_900};
    `;

  const hoverMixin = css`
    cursor: text;

    &:hover {
      background-color: ${({ theme }) => theme.palette.white};
      border-color: ${theme.palette.primary_100};
    }
  `;

  if (validate === false)
    return css`
      background-color: ${({ theme }) => theme.palette.white};
      border-color: ${theme.palette.error};
      color: ${theme.palette.grey_900};

      ${hoverMixin}
    `;

  if (validate === true)
    return css`
      background-color: ${({ theme }) => theme.palette.white};
      border-color: ${theme.palette.success};
      color: ${theme.palette.grey_900};

      ${hoverMixin}
    `;

  return css`
    background-color: ${({ theme }) => theme.palette.grey_200};
    border-color: ${theme.palette.grey_200};
    color: ${theme.palette.grey_900};

    input {
      ::-webkit-input-placeholder {
        color: ${theme.palette.grey_700};
      }
    }

    ${hoverMixin}
  `;
};

export const StyledField = styled.div<TField>`
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 4px solid transparent;
  overflow: hidden;
  transition-property: background-color, border-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;

  ${fieldMixin};
`;

export const StyledLeftSlot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

export const StyledValidateMessage = styled(FieldMessage)<{ validate: boolean }>`
  color: ${({ theme, validate }) => (validate ? theme.palette.success : theme.palette.error)};
`;