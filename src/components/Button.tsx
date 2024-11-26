import { useRef } from "react";
import { Pressable, StyleSheet, Text, Animated } from "react-native";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Button({ title, onClick }: ButtonProps) {
  const moveAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const moveButton = () => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: { x: -10, y: -10 },
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: { x: 0, y: 0 },
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onClick();
  };

  return (
    <AnimatedPressable
      style={{
        transform: [{ translateX: moveAnim.x }, { translateY: moveAnim.y }],
        ...styles.button,
      }}
      onPress={moveButton}
    >
      <Text style={styles.title}>{title}</Text>
    </AnimatedPressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#32a8a4",
    borderRadius: 5,
    borderColor: "black",
    justifyContent: "center",
    borderWidth: 1,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
