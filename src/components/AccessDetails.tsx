import { StyleSheet, Text, View } from "react-native";

function AccessDetails({ name }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.price}>
        <Text style={styles.text}>$127 a month</Text>
      </View>
      <Text style={[styles.text, styles.title]}>{name}</Text>
      <Text style={styles.text}>
        {`This give you access to all Basic Access & 
Access to:
+ ALL recorded & live classes (both Fundamental & Advanced)
+ ALL eBooks & Digital Materials
+ ALL Live Event (in Person/Streaming, excluding conferences)`}
      </Text>
    </View>
  );
}

export default AccessDetails;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    gap: 10,
  },
  price: {
    backgroundColor: "white",
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: 800,
  },
});
