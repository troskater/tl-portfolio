'use client'

import { Special_Elite } from 'next/font/google'
import { useEffect, useState } from 'react'

const font = Special_Elite({ subsets: ['latin'], weight: '400', })
const letters = "abcdefghijklmnopqrstuvwxyz"
const vowels = "AEIOU"
const titles = [
  {
    'label': 'Software Engineer',
    'desc': 'Crafting digital solutions',
  },
  {
    'label': 'Full Stack Developer',
    'desc': 'Uniting front and back-end',
  },
  {
    'label': 'Engineering Consultant',
    'desc': 'Optimizing technical strategies',
  },
  {
    'label': 'Multi-potentialite',
    'desc': 'Thriving on diverse interests',
  },
  {
    'label': 'Photographer',
    'desc': 'Capturing moments',
  },
  {
    'label': 'Videographer',
    'desc': 'Bringing stories to life',
  },
  {
    'label': 'Designer',
    'desc': 'Shaping experiences',
  },
  {
    'label': 'Cartoonist',
    'desc': 'Creating playful illustrations',
  }
]

export default function Intro() {
  const [index, setIndex] = useState(0)
  const [label, setLabel] = useState(titles[index].label)
  const [desc, setDesc] = useState(titles[index].desc)
  const [pre, setPre] = useState('a')

  useEffect(() => {
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true

    // jumble function
    let jumbleInterval = null
    const jumble = () => {
      let iteration = 0

      clearInterval(jumbleInterval)
      jumbleInterval = setInterval(() => {
        // set new label
        let newIndex = index + 1
        if (newIndex >= titles.length) newIndex = 0
        let newLabel = titles[newIndex].label

        // check if it starts with a vowel and update the prefix
        if (vowels.includes(newLabel[0])) setPre('an')
        else setPre('a')

        // set the label
        setLabel(newLabel
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return newLabel[index]
            }

            return letters[Math.floor(Math.random() * 26)]
          })
          .join(""))

        if (iteration >= newLabel.length) {
          clearInterval(jumbleInterval)
        }

        iteration += 1 / 3
      }, 30)
    }

    // change label index and jumble letters
    const interval = setInterval(() => {
      let newIndex = index + 1
      if (newIndex >= titles.length) newIndex = 0
      let newDesc = titles[newIndex].desc
      setIndex(newIndex)
      setDesc(newDesc)

      // jumble 
      if (!!isReduced) { // skip jumble for reduced motion users
        let newLabel = titles[newIndex].label
        setLabel(newLabel)
      } else jumble()
    }, 7000)

    // clear label change interval
    return () => clearInterval(interval)
  }, [index, label, pre])

  return (
    <h1 className={font.className + ' intro'}>
      <span className="name" title="aka troskater">Troy L.</span><br />{desc} as {pre}<br /><span className="label">{label}</span>
    </h1>
  )
}