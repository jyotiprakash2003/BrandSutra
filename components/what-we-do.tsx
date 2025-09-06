"use client";

import React from 'react';
import { gsap } from 'gsap';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: 'expo' };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0).to(
      marqueeInnerRef.current,
      { y: edge === 'top' ? '101%' : '-101%' },
      0
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span>{text}</span>
        <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div className="menu__item" ref={itemRef}>
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" aria-hidden="true" ref={marqueeInnerRef}>
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WhatWeDo() {
    const menuItems = [
        {
            link: "#",
            text: "Website Design & development",
            image: "/retail-rebrand-monochrome.png",
        },
        {
            link: "#",
            text: "Apparel Design",
            image: "/product-design-ui-ux-monochrome.png",
        },
        {
            link: "#",
            text: "Brand marketing & analytics",
            image: "/dtc-growth-monochrome.png",
        },
        {
            link: "#",
            text: "Social Media Management",
            image: "/social-media-bokeh.png",
        },
    ];

    return (
        <div className="flex flex-col h-full w-full">
            <h2 className="text-center text-white font-extrabold uppercase tracking-wide text-balance text-4xl md:text-6xl lg:text-7xl mb-8 md:mb-12">
                WHAT WE DO
            </h2>
            <div className="flex-grow relative">
                <FlowingMenu items={menuItems} />
            </div>
        </div>
    );
}
