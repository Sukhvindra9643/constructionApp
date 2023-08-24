// import { View } from 'react-native'
// import React from 'react'
// import { ActivityIndicator } from 'react-native-paper'

// const Loader = () => {
//     return (
//         <View
//             style={{
//                 backgroundColor: "#fff",
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//             <ActivityIndicator animating={true} size={100} color="#900" />
//         </View>
//     )
// }

// export default Loader

import React from 'react';
import { StyleSheet} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: props.loading };
  }


  render() {
    const { visible } = this.state;
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
      </AnimatedLoader>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});
