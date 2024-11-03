import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
type Props = {
  buttonElement: HTMLElement | null;
  onClick: () => void;
};

export default function DividerButton({ buttonElement, onClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function listener({ clientX, clientY }: MouseEvent) {
      if (!buttonElement) {
        return;
      }
      const rect = buttonElement.getBoundingClientRect();
      const rectY = rect.y;
      const bottomX = rect.x;
      const topX = bottomX + rect.width;

      if (Math.abs(clientY - rectY) < 20) {
        if (bottomX < clientX && clientX < topX) {
          setVisible(true);
          return;
        }
      }
      setVisible(false);
    }
    window.addEventListener('mousemove', listener);
    return () => {
      window.removeEventListener('mousemove', listener);
    };
  }, [buttonElement, setVisible]);

  return (
    <div className={`${visible ? 'block' : 'hidden'}`}>
      <div
        className='absolute bg-secondary z-50 left-[50%] top-[-20px] rounded-full p-2'
        onClick={(ev) => {
          ev.stopPropagation();
          onClick();
        }}
      >
        <Plus className='h-4 w-4 text-primary'/>
      </div>
    </div>
  );
}
