import { Button } from "@/components/ui/button";
import peoplesStore from "@/store/peoplesStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const HomePage = observer(() => {
  const { getPeople } = peoplesStore;

  const buttonHandler = () => {
    getPeople();
  };

  return (
    <div className="home__container">
      <Button onClick={buttonHandler}>Запросить данные</Button>
    </div>
  );
});

export default HomePage;
