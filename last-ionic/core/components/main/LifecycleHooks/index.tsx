import React from "react";

// interfaces/LifecycleHooks.ts
export interface LifecycleHooks {
  onLoad?: (callback: () => void) => void;
  afterMount?: (callback: () => void) => void;
  beforeUpdate?: (prevProps: any, prevState: any, callback: () => void) => void;
  afterUpdate?: (prevProps: any, prevState: any, callback: () => void) => void;
  beforeDismount?: (callback: () => void) => void;
  onError?: (error: Error) => void;
}

// Higher-order component to inject lifecycle hooks
export const withLifecycleHooks = <P extends LifecycleHooks>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof LifecycleHooks> & LifecycleHooks) => {
    // Mock implementation for demonstration
    const lifecycleHooks: LifecycleHooks = {
      onLoad: (callback) => callback(),
      afterMount: (callback) => callback(),
      beforeUpdate: (prevProps, prevState, callback) => callback(),
      afterUpdate: (prevProps, prevState, callback) => callback(),
      beforeDismount: (callback) => callback(),
      onError: (error) => console.error(error),
    };

    return <Component {...(props as P)} {...lifecycleHooks} />;
  };
};
