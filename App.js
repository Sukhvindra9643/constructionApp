// import "expo-router/entry";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </SafeAreaProvider>
  );
}
