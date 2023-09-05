import { Layout } from "antd";
import { Content} from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { authStore } from "src/shared/store/auth/auth.store";
import { AppRouter } from './providers/Router/ui/Router';

const App = observer(() => {
  const { isAuth } = authStore;

  if (!isAuth) {
    return <AppRouter />;
  }

  return (
    <div>
      inner page
    </div>
  );
});

export default App;
