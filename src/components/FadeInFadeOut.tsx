import React, { useState, useEffect } from 'react';
import '../special-css/fadeOnHide.css'

type Props = {
  hidden: boolean,
  children: React.ReactNode
}

const FadeInFadeOut = ({ hidden, children }: Props) => {
  const [isFirst, setIsFirst] = useState(true)
  const [isFading, setIsFading] = useState(false);
  const [animation, setAnimation] = useState(hidden ? "fadeOut" : "fadeIn");

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false)
      return
    }

    setAnimation(hidden ? "fadeOut" : "fadeIn")
    setIsFading(true) 
  }, [hidden]);

  if (hidden && !isFading) {
    return null;
  }

  return (
    <div style={{animation: `${animation} 0.5s ease-in-out forwards`}} onAnimationEnd={() => setIsFading(false)}>
      {children}
    </div>
  );
}

export default FadeInFadeOut