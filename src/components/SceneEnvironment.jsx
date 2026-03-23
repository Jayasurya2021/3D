import { Environment, ContactShadows } from '@react-three/drei';

export const SceneEnvironment = ({ environment }) => {
  return (
    <>
      <Environment preset={environment} />
    </>
  );
};
