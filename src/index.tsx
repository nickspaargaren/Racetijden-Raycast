import { ActionPanel, List, Action } from "@raycast/api";
import { useFetch } from "@raycast/utils";

type Circuit = {
  name: string;
  flag: string;
  times: {
    time: string;
    gamertag: string;
  }[];
};

type circuitData = {
  success?: boolean;
  isLoading?: boolean;
  data: {
    success: boolean;
    data: {
      circuits: Circuit[];
    };
  };
};

export default function Command() {
  const {
    isLoading,
    data,
  }: circuitData = useFetch("https://f1.racetijden.nl/api/circuits");

  if (!data?.success) {
    return
  }

  return (
    <List isLoading={isLoading}>
      {data?.data?.circuits.map((item, index) => (
        <List.Item
          key={index}
          icon={`https://f1.racetijden.nl/_next/image?url=%2Fimages%2Fflags%2F${item.flag}.png&w=64&q=75`}
          title={item.name}
          subtitle={item.times.length ? item.times[0].time : ""}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={`https://f1.racetijden.nl/circuits/${item.name.replaceAll(" ", "%20")}`} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
