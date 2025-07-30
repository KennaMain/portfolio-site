import React, { useState, useEffect } from 'react';
import '../special-css/fadeOnHide.css'

type Props = {
  hidden: boolean,
  children: React.ReactNode,
  onAnimationEnd?: () => void,
  onFadeOutAnimationEnd?: () => void,
  onFadeInAnimationEnd?: () => void,
  fadeTime?: string
}

const FadeInFadeOut = ({ hidden, children, onAnimationEnd, onFadeOutAnimationEnd, onFadeInAnimationEnd, fadeTime }: Props) => {
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

  const handleAnimationEnd = () => {
    setIsFading(false)
    if (onAnimationEnd) onAnimationEnd()
    if (onFadeInAnimationEnd  && animation === "fadeIn" ) onFadeInAnimationEnd ()
    if (onFadeOutAnimationEnd && animation === "fadeOut") onFadeOutAnimationEnd()
  }

  return (
    <div style={{animation: `${animation} ${fadeTime ?? "0.5s"} ease-in-out forwards`}} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  );
}

export default FadeInFadeOut