'use client'

import Image from "next/image";
import { useRef } from "react";

export default function Img(props) {
  const dialog = useRef(false)
  const dialog2 = useRef(false)

  return (
    <div className={'img ' + (props.src2 ? 'img-flex-2 ' : '') + (props.showDialog ? 'has-dialog ' : '') + (props.className ?? '')}>
      {props.src ? (<span style={{
        backgroundImage: "url('/img/" + props.src + "')"
      }} onClick={() => {
        props.showDialog ? dialog.current.showModal() : ''
      }}>{
          props.showDialog ? (
            <dialog ref={dialog} onClick={(e) => {
              e.stopPropagation()
              dialog.current.close()
            }}><Image
                src={'/img/' + props.src}
                width={960}
                height={0}
                sizes="60rem"
                style={{ width: '100%', height: 'auto' }}
                alt=""
              /></dialog>
          ) : ''
        }</span>) : ''}
      {props.src2 ? (<span style={{
        backgroundImage: "url('/img/" + props.src2 + "')"
      }} onClick={() => {
        props.showDialog ? dialog2.current.showModal() : ''
      }}>{
          props.showDialog ? (
            <dialog ref={dialog2} onClick={(e) => {
              e.stopPropagation()
              dialog2.current.close()
            }}><Image
                src={'/img/' + props.src2}
                width={960}
                height={0}
                sizes="60rem"
                style={{ width: '100%', height: 'auto' }}
                alt=""
              /></dialog>
          ) : ''
        }</span>
      ) : ''}
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}