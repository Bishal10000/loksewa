import { useState } from 'react';

export default function Test() {
  const [count] = useState(0);
  return <div>Test works! Count: {count}</div>;
}
