import { Layout } from "antd";
import { Content} from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { authStore } from "src/shared/store/auth/auth.store";
import { AppRouter } from './providers/Router/ui/Router';
import { Sidebar } from "src/widgets/SideBar";

const App = observer(() => {
  const { isAuth } = authStore;

  if (!isAuth) {
    return <AppRouter />;
  }

  return (
    <div>
      <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: "0 16px", maxHeight: "90vh " }}>
            <AppRouter />
          </Content>
          {/* <Footer style={{ textAlign: "center", height: "10%" }}>Runita</Footer> */}
        </Layout>
      </Layout>
    </div>
  );
});

export default App;
