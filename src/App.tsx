import "./App.css";
import {Box, List, ListItem, Typography} from "@mui/material";
import OrdersListItem from "./components/UsersListItem/OrdersListItem.tsx";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddOrUpdateOrderModal from "./components/modals/AddOrUpdateOrderModal.tsx";

export type Order = {
  id: string;
  name: string;
  price: number;
  priceHistory: Array<number>;
};

const url = "http://192.168.32.181:8082/structr/rest/OrdersType";

const fetchOrders = async () => {
  try {
    const data = await fetch(url);
    const dataJson = await data.json();
    console.log(dataJson.result);
    return dataJson.result;
  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = (id: string) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
  });
};

const updateOrder = (id: string, body: any) => {
  return fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

const createOrder = (body: any) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

function App() {
  const [context, setContext] = useState<{
    mode: "add" | "update" | null;
    node?: Order;
  }>({ mode: null });

  const [orders, setOrders] = useState<Array<Order>>([]);

  async function getOrders() {
    const loadedOrders = await fetchOrders();
    if (loadedOrders) {
      setOrders(loadedOrders);
    }
  }
  useEffect(() => {
    getOrders().then();
  }, []);

  const handleModalClose = () => {
    setContext({ mode: null });
  };

  const randomPriceHistory = () =>{
      return Array.from({length: 10}, () => Math.floor(Math.random() * 100));
  }
  return (
    <>
      <Typography>Orders List</Typography>
      <List sx={{display:"flex", flexDirection: 'row', justifyContent: "flex-start", paddingRight: "230px"}}>
        <ListItem sx={{padding:0}}>Name</ListItem>
        <ListItem sx={{padding:0}}>Price</ListItem>
        <ListItem sx={{padding:0}}>PriceHistory</ListItem>
      </List>
      <Box>
        {orders.map((order, i) => (
          <OrdersListItem
            key={order.name + i}
            order={order}
            onDelete={() => {
              deleteOrder(order.id).then(() => getOrders());
            }}
            onEdit={() => {
              setContext({ mode: "update", node: order });
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          setContext({ mode: "add" });
        }}
      >
        Add order
      </Button>
      {context.mode && (
        <AddOrUpdateOrderModal
          open={true}
          context={context}
          onClose={handleModalClose}
          onSubmit={(values) => {
            const newVal = {
              name: values.name,
              price: Number(values.price),
              priceHistory: randomPriceHistory(),
            };

            if (context.mode === "add") {
              createOrder(newVal)
                .then(() => getOrders())
                .finally(() => handleModalClose());
            } else if (context.mode === "update") {
              updateOrder(values.id, newVal)
                .then(() => getOrders())
                .finally(() => handleModalClose());
            }
          }}
        />
      )}
    </>
  );
}

export default App;
