import React from 'react';
import { Card, LayoutOne, Text } from 'upkit';

export default function NotFound() {
  return (
    <LayoutOne>
      <Card color="white">
        <div className="text-center align-middle">
          <Text as="h3">Page Not Found</Text>
        </div>
      </Card>
    </LayoutOne>
  );
}
