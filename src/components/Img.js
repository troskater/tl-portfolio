'use client'

import Image from "next/image";
import { useDialog } from '@/components/DialogProvider';

export default function Img(props) {
  const { showDialog } = useDialog()

  const open = (src) => {
    if (props.showDialog) showDialog(
      <>
        <Image
          src={'/img/' + src}
          width={960}
          height={0}
          sizes="60rem"
          style={{ width: '100%', height: 'auto' }}
          alt=""
        />
        <div className="content">
          {props.children}
        </div>
      </>
    )
  }

  // with a dialog the image acts as a button, so keyboard users can open it too
  const buttonProps = (src) => props.showDialog ? {
    role: 'button',
    tabIndex: 0,
    'aria-label': 'View larger',
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open(src)
      }
    }
  } : {}

  return (
    <div className={'img ' + (props.src2 ? 'img-flex-2 ' : '') + (props.showDialog ? 'has-dialog ' : '') + (props.className ?? '')}>
      {[props.src, props.src2].filter(Boolean).map((src) => (
        <span key={src} onClick={() => open(src)} {...buttonProps(src)}>
          <Image
            src={'/img/' + src}
            fill
            sizes="60rem"
            style={{
              objectFit: props.fit ?? 'cover',
            }}
            alt=""
            priority={props.priority ?? false}
          />
        </span>
      ))}
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}
