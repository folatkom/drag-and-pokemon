import { ReactElement, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 250;

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get("screen");

interface DragableCardProps {
  children: ReactElement;
  onLeftBorder: () => void;
}

function DragableCard({ children, onLeftBorder }: DragableCardProps) {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const [transX, setTransX] = useState(0);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = (width - CARD_WIDTH) / 2;
      const maxTranslateY = (height - CARD_HEIGHT) / 2 - 25;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );

      setTransX(translationX.value);

      if (
        -maxTranslateX === translationX.value &&
        transX !== translationX.value
      ) {
        onLeftBorder();
      }
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[animatedStyles, styles.wrapper]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

export default DragableCard;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    elevation: 2,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: "#ccc",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
