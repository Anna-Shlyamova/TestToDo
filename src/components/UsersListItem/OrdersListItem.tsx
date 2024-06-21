import { FC } from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { Order } from "../../App.tsx";
import EditIcon from "../icons/EditIcon.tsx";
import TrashIcon from "../icons/TrashIcon.tsx";
import {Line} from "react-chartjs-2";
import {Chart, registerables} from "chart.js";

Chart.register(...(registerables ?? []));

const ItemContainerMixin: SxProps = {
  height: "100%",
  width: "550px",
  paddingY: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  columnGap: '20px',
};

const TextContainerMixin: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  columnGap: "20px",
};
const ButtonMixin: SxProps = {
  width: "24px",
  cursor: "pointer",
  marginRight: "10px",
};

interface UsersListItemProps {
  order?: Order;
  onDelete?: () => void;
  onEdit?: () => void;
  listItemSx?: SxProps;
}

const OrdersListItem: FC<UsersListItemProps> = ({
  order,
  onDelete,
  onEdit,
  listItemSx,
}) => {
  return (
    <Box key={order?.id} sx={listItemSx ?? ItemContainerMixin}>
      <Box sx={TextContainerMixin}>
        <Typography sx={{width: "70px"}}>{order?.name}</Typography>
        <Typography sx={{width: "70px"}}>{order?.price}</Typography>

      <Box sx={{width: '250px', height: "200px", display: "flex", alignItems:"center", justifyContent:"center"}}>
        <Line
          data={{
          labels: ["1", "2", "3", "4", "5", "6", "7", "8","9", "10", "11", "12"],
          datasets: [
            {
              data: order?.priceHistory ?? [],
              fill: false,
              borderWidth:1,
              backgroundColor: "#FFFFFF",
              borderColor:'#1976D2',
            },
          ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            }
          }}
        />
      </Box>
      </Box>
      <Box>
        <EditIcon sx={ButtonMixin} onClick={onEdit} />
        <TrashIcon sx={ButtonMixin} onClick={onDelete} />
      </Box>
    </Box>
  );
};

export default OrdersListItem;
