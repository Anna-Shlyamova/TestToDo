import { FC } from 'react';
import {Box, SxProps, Typography} from '@mui/material';
import {User} from "../../App.tsx";
import EditIcon from "../icons/EditIcon.tsx";
import TrashIcon from "../icons/TrashIcon.tsx";

const ItemContainerMixin: SxProps = {
  height: '100%',
  width: '200px',
  paddingY: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const TextContainerMixin: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  columnGap: '10px',
}
const ButtonMixin: SxProps = {
  width: '24px',
  cursor: 'pointer',
  marginRight: '10px',
}

interface UsersListItemProps {
  user?: User,
  onDelete?: () => void,
  onEdit?: () => void,
  listItemSx?: SxProps,
}

const UsersListItem: FC<UsersListItemProps> = ({user, onDelete, onEdit, listItemSx}) => {
  return (
    <Box key={user?.id} sx={listItemSx ?? ItemContainerMixin}>
      <Box sx={TextContainerMixin}>
        <Typography>{user?.name}</Typography>
        <Typography>{user?.age}</Typography>
      </Box>
      <Box>
        <EditIcon sx={ButtonMixin} onClick={onEdit}/>
        <TrashIcon sx={ButtonMixin} onClick={onDelete}/>
      </Box>
    </Box>
  );
};

export default UsersListItem;
