'use client'

import { Special_Elite } from 'next/font/google'
import { useEffect, useState } from 'react';

const font = Special_Elite({ subsets: ['latin'], weight: '400', })
const letters = "abcdefghijklmnopqrstuvwxyz";
const vowels = "AEIOU";
const labels = [
  'Software Engineer',
  'Full Stack Developer',
  'Engineering Consultant',
  'Multi-potentialite',
  'Photographer',
  'Videographer',
  'Designer',
  'Cartoonist',
]

export default function Intro() {
  const [nameHover, setNameHover] = useState(false);
  const [index, setIndex] = useState(0);
  const [label, setLabel] = useState(labels[index]);
  const [pre, setPre] = useState('a');
  const onMouseEnter = () => setNameHover(true);
  const onMouseLeave = () => setNameHover(false);

  useEffect(() => {
    // jumble function
    let jumbleInterval = null;
    const jumble = event => {
      let iteration = 0;

      clearInterval(jumbleInterval);
      jumbleInterval = setInterval(() => {
        // set new label
        let newIndex = index + 1
        if (newIndex >= labels.length) newIndex = 0
        let newLabel = labels[newIndex]

        // check if it starts with a vowel and update the prefix
        if (vowels.includes(newLabel[0])) setPre('an')
        else setPre('a')

        // set the label
        setLabel(newLabel
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return newLabel[index];
            }

            return letters[Math.floor(Math.random() * 26)]
          })
          .join(""))

        if (iteration >= newLabel.length) {
          clearInterval(jumbleInterval);
        }

        iteration += 1 / 3;
      }, 30);
    }

    // change label index and jumble letters
    const interval = setInterval(() => {
      let newIndex = index + 1
      if (newIndex >= labels.length) newIndex = 0
      setIndex(newIndex)
      jumble()
    }, 7000);

    // clear label change interval
    return () => clearInterval(interval);
  }, [index, label, pre]);

  return (
    <h1 className={font.className + ' intro'}>
      Hi!<br />
      My name is <span className="name" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{nameHover ? <span className="aka">troskater</span> : 'Troy'
      }</span> and I&apos;m {pre} <span className="label">{label}</span>.
    </h1>
  );
}