import { useState, useEffect, useMemo } from "react"

export interface Beverage {
  name: string;
  weight: number;
  logo: string;
  level: number;
}

function useFetchData<T>(url: string): {
  data: T[] | null;
  done: boolean;
} {
  const [data, setData] = useState<T[] | null>(null);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetch(url).then(res => res.json()).then((d: T[]) => {
      setData(d);
      setDone(true);
    });
  }, [url]);

  return {
    data, 
    done
  };
}

function CustomHookComponent() {
  const {data, done} = useFetchData<Beverage>("");

  // computed like in Vue
  const portlandTaps = useMemo(() => (data|| []).filter(bev => bev.logo == "portland"), [data]); 

  return <div>
    {portlandTaps.length && <img src={portlandTaps![0].logo} alt="Beverage Image"/>}
  </div>;
}