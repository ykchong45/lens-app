import { useState } from 'react';
import Confetti from 'react-confetti';
import React, { useRef, useEffect } from 'react'

function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX + window.pageXOffset, y: e.clientY + window.pageYOffset });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return position;
}

export const EmojiFountain = () => {
  const { x: mouseX, y: mouseY } = useMouse()
  const activeProps = mouseX ? {
    confettiSource: {
      w: 0,
      h: 0,
      x: mouseX,
      y: mouseY,
    },
  } : {
    run: false,
  }
  return (
    <>
      <Confetti
        style={{ pointerEvents: 'none' }}
        numberOfPieces={100}
        initialVelocityX={2}
        initialVelocityY={5}
        // ref={ref}
        gravity={0.5}
        {...activeProps}
      />
    </>
  )
}