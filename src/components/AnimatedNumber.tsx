import AnimatedNumber, { AnimatedNumberProps } from 'react-awesome-animated-number';
import 'react-awesome-animated-number/dist/index.css';

export default function AppAnimatedNumber({
  value,
  ...restProps
}: Omit<AnimatedNumberProps, 'value'> & { value: number | string }) {
  // @ts-expect-error
  return <AnimatedNumber value={value} {...restProps} />;
}
