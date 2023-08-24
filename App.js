// import "expo-router/entry";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import {AlertNotificationRoot} from "react-native-alert-notification";

export default function App() {
  return (
    <AlertNotificationRoot>
      <SafeAreaProvider>
        <Provider store={store}>
          <StripeProvider publishableKey="pk_live_51NLMxgSJjJDa87Tyz8jGs1NUXLJqibftHd1k5rIUocMH688R9Ah5ovjlkMAIak2SR8M4JCKJo34e5lVDKcRljZkj00UbuiCpd1">
            <Main />
          </StripeProvider>
        </Provider>
      </SafeAreaProvider>
    </AlertNotificationRoot>
  );
}
