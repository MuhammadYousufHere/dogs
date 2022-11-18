import Loader from "../components/Loader";
import { Suspense } from "react";

/**
 * HOC to wrap a component in a Suspense component.
 */

export default function withSuspense<P>(Component: React.ComponentType & any) {
  return function WithSuspense(props: P) {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
