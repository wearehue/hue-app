import { FixedSizeList as List } from "react-window";

function Row({ data, index }) {
  const item = data[index];
  return (
    // Access the items array using the "data" prop:

    <div style={{ color: "white" }}>{item.id}</div>
  );
}

function Test({ itemData }) {
  return (
    <List
      height={600}
      itemCount={itemData.length}
      itemData={itemData}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  );
}
function Window() {
  return <Test itemData={[1, 2, 3]} height={150} width="100%" />;
}
