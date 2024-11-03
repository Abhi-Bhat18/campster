import React from 'react';
import { Plus} from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function PlaceholderButton({ onClick }: Props) {
  return (
    <div
      className="bg-white flex justify-center items-center py-5"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className='bg-secondary text-foreground rounded-full'>
        <Plus className="h-5 w-5"/>
      </div>
    </div>
  );
}
