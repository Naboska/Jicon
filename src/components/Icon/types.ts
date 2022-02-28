import type { ReactNode, SyntheticEvent } from 'react';

import type { TStyledComponentsProps } from 'lib';

export type TIcon = {
  className?: string;
  size?: number;
  children: ReactNode;
  iconStyle?: TStyledComponentsProps;
  onClick?: (e: SyntheticEvent<SVGSVGElement>) => void;
};