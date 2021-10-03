export type IconTypes =
  | 'arrow-right-to-bracket'
  | 'x-mark'
  | 'check-regular'
  | 'ellipsis-regular'
  | 'envelope-solid'
  | 'lock-alt-solid'
  | 'user-solid';

export type Modifiers = 'default' | 'hover' | 'focus' | 'disabled';

export type IconBoxIcons = {
  [key in IconTypes]: {
    [key: string]: {
      width: number;
      height: number;
      paths: {
        d: string;
      }[];
    };
  };
};
