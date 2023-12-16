'use client'

import { Special_Elite } from 'next/font/google'
import { useEffect, useState } from 'react';

const font = Special_Elite({ subsets: ['latin'], weight: '400', })
const letters = "abcdefghijklmnopqrstuvwxyz";
const labels = [
  'Software Engineer',
  'Full Stack Developer',
  'Consultant',
  'Creative',
  'Multipotentialite',
  'Photographer',
  'Designer',
  'Cartoonist',
  'Videographer',
]

export default function Intro() {
  const [nameHover, setNameHover] = useState(false);
  const [label, setLabel] = useState(0);
  const [labelVal, setLabelVal] = useState(labels[label]);
  const onMouseEnter = () => setNameHover(true);
  const onMouseLeave = () => setNameHover(false);

  useEffect(() => {
    // jumble letters
    let jumbleInterval = null;
    const jumble = event => {
      let iteration = 0;

      clearInterval(jumbleInterval);
      jumbleInterval = setInterval(() => {
        let newLabel = label + 1
        if (newLabel >= labels.length) newLabel = 0
        setLabelVal(labels[newLabel]
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return labels[newLabel][index];
            }

            return letters[Math.floor(Math.random() * 26)]
          })
          .join(""))

        if (iteration >= labels[newLabel].length) {
          clearInterval(jumbleInterval);
        }

        iteration += 1 / 3;
      }, 30);
    }

    // change label
    const interval = setInterval(() => {
      let newLabel = label + 1
      if (newLabel >= labels.length) newLabel = 0
      setLabel(newLabel)
      jumble()
    }, 7000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [label, labelVal, letters, labels]);

  return (
    <h1 className={font.className + ' intro'}>
      Hi!<br />
      My name is <span className="name" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{nameHover ? <span className="aka">troskater</span> : 'Troy'
      }</span> and I&apos;m a <span className="label">{labelVal}</span>.
    </h1>
  );
}