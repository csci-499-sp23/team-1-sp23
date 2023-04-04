import TestView from "../views/TestView"
import React, { useEffect } from 'react';

export default function testContainer() {
  useEffect(() => {
    document.title = 'Hello World';
  }, []);

  return <TestView />;
}