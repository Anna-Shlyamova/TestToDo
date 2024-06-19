import { FC } from 'react';
import { Button, type ButtonProps } from '@mui/material';

/**
 * Кнопка.
 *
 * @param sx стили.
 * @param props
 */

const StandartButton: FC<ButtonProps> = ({ sx, ...props }) => {
  return <Button sx={sx} {...props} />;
};

export default StandartButton;
